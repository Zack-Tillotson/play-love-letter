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

  if(!meta || !meta.host) {
    yield call(database.set, 'meta', {host: uid, state: PREGAME})
  }

  yield database.watch('meta', data => store.dispatch(actions.dataReceived('meta', data, {uid}))) // current game host
  yield database.watch('names', data => store.dispatch(actions.dataReceived('names', data, {uid}))) // all names
  yield database.watch('players', data => store.dispatch(actions.dataReceived('players', data, {uid}))) // current game names
}

function* handleClick({payload: {id, value}}) {

  switch(id) {

    case 'selfName': {
      const uid = (yield call(database.getAuth)).getUid()
      yield call(database.set, 'names', {[uid]: value})

      const players = (yield select()).players
      if(!players.includes(uid)) yield call(database.set, 'players', [...players, uid])
    }
  }
}

function* initListener() {
  yield takeEvery(types.interactionMount, handleMount)
  yield takeEvery(types.interactionClick, handleClick)
}

export default [initListener]