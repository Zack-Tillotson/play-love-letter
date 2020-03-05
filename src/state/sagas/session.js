import { call, put, select, fork, takeEvery, takeLatest } from 'redux-saga/effects'

import types from '../types';
import actions from '../actions';
import selector from '../selector';
import {INGAME} from '../constants'
import gameSagas from './game'

function* handleGameInitialization(data) {
  return yield gameSagas.implGameInit(data)
}

function* handleCardPlayed(data) {
  return yield gameSagas.implCardPlay(data)
}

export function* popQSaga() {
  const {eventQueue} = (yield select(selector));
  if(!eventQueue.length) {
    console.warn('No event in event queue');
    return;
  }

  const nextEvent = eventQueue[0];
  yield put(actions.eventHandleStart(nextEvent));

  switch(nextEvent.eventType) {
    case 'game_started': {
      yield handleGameInitialization(nextEvent.data)
      break;
    }

    case 'card_played': {
      yield handleCardPlayed(nextEvent.data)
      break;
    }


    default:
      console.warn('Event not handled', nextEvent);
  }
  yield put(actions.eventHandleEnd(nextEvent));
}

function* popQIfReady() {
  const state = (yield select(selector));
  const {eventQueue, game: {inTransition}} = state;
  if(!inTransition && eventQueue.length) {
    yield fork(popQSaga)
  }
}

function* initListener() {
  yield takeEvery('*', popQIfReady)
}

export default [initListener]