import { call, put, select, fork, takeEvery, takeLatest } from 'redux-saga/effects'

import database from '../database'

import types from '../types'
import actions from '../actions'
import selector from '../selector'
import {PREGAME, INGAME} from '../constants'
import gameSagas from './game'

import store from '../../store'; // xxx 

function* handleMount() {

  const meta = yield database.get('meta')
  const uid = (yield call(database.getAuth)).getUid()
  const savedName = localStorage.getItem('preferredName')

  if(!meta || !meta.host) {
    yield call(database.set, 'meta', {host: uid, state: PREGAME, lobby: [{uid, name: savedName || 'Host'}]})
  } else {
    const isInLobby = meta.lobby.find(player => player.uid === uid)
    if(!isInLobby) yield call(database.set, 'meta', {lobby: [...meta.lobby, {uid, name: savedName || 'Player'}]})
  }

  yield database.watch('meta', data => store.dispatch(actions.dataReceived('meta', data, {uid}))) // current game host
}

function* handleClick({payload: {id, value}}) {

  switch(id) {

    case 'selfName': {
      const uid = (yield call(database.getAuth)).getUid()
      const {lobby} = (yield select()).game
      const newLobby = lobby.map(player => player.uid !== uid ? player : {...player, name: value})
      yield call(database.set, 'meta', {lobby: newLobby})
      localStorage.setItem('preferredName', value)
    }

    case 'removeLobbyPlayer': {
      const {lobby, host} = (yield select()).game
      const newLobby = lobby.filter(player => player.uid !== value)
      const firstNonHost = lobby.find(player => player.uid !== host)

      const newHost = host !== value ? host : (firstNonHost || {}).uid

      yield call(database.set, 'meta', {host: newHost, lobby: newLobby})
    }
  }
}

function* initListener() {
  yield takeEvery(types.interactionMount, handleMount)
  yield takeEvery(types.interactionClick, handleClick)
}

export default [initListener]