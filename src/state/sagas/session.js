import { call, put, select, fork, takeEvery, takeLatest } from 'redux-saga/effects'

import database from '../database'

import types from '../types'
import actions from '../actions'
import selector from '../selector'
import {PREGAME, INGAME} from '../constants'
import gameSagas from './game'

import store from '../../store'; // xxx 

const DEFAULT_GAME_ID = 'id'

function* handleMount() {
  const {id} = (yield select()).game
  const path = `game/${id}`

  const meta = yield database.get(id, 'meta')

  if(!meta || !meta.host) {
    const uid = (yield call(database.getAuth)).getUid()
    yield call(database.set, id, 'meta', {host: uid, status: PREGAME})
  }

  yield database.watch(id, 'meta', data => store.dispatch(actions.dataReceived(path, data))) // xxx
}

function* handleGameData() {
  const {id, host} = (yield select()).game
  
  if(!host) {
    const uid = (yield call(database.getAuth)).getUid()
    yield call(database.put, id, 'meta', {host: uid, status: PREGAME})
  }
}

function* initListener() {
  yield takeEvery(types.interactionMount, handleMount)
  yield takeEvery(types.dataReceived, handleGameData)
}

export default [initListener]