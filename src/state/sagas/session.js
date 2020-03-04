import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import types from '../types';
import actions from '../actions';
import {selectEventQueue} from '../selector';

// A game is initialized with players when all players are ready. The
// result should be the game is set up and the first round starts
function* handleGameInitialization({data: {players, deck, startPlayer}}) {
  yield put(actions.gameReadied(players, deck, startPlayer));
  return true;
}

export function* popQSaga() {
  const eventQueue = yield select(selectEventQueue);
  if(!eventQueue.length) {
    console.log('No event in event queue');
    return;
  }

  const nextEvent = eventQueue[0];

  switch(nextEvent.eventType) {
    case 'game_started':
      if(yield handleGameInitialization(nextEvent)) {
        return yield put(actions.eventHandled(nextEvent));
      } else {
        console.warn('Unable to handle event', nextEvent);
      }
      break;
    default:
  }

  console.warn('Event not handled', nextEvent);
}

// function* initListener() {
//   yield takeEvery(action => {
//     action.type === types.eventReceived, types.gameReadied, handleGameInitialization);
// }

export default []