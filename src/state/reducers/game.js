import {SYNCING, PREGAME, INGAME} from '../constants';
import types from '../types';

const initialState = {
  host: null,
  isHosting: false,
  state: SYNCING, // [syncing | pregame | ingame | postgame] events are taken from queue during ingame
  inTransition: false,
}

function game(state = initialState, action) {
  switch(action.type) {
    case types.dataReceived: {
      const {path, data} = action.payload;

      if(path !== 'meta') return state
      if(!data) return initialState

      const {state: gameState, host} = data;
      const {uid} = action.meta;
      return {
        ...state,
        state: gameState,
        host,
        isHosting: uid === host,
      }
    }
    case types.gameReadied: {
      return {
        ...initialState,
        state: INGAME,
      }
    }
    case types.eventHandleStart: {
      return {
        ...state,
        inTransition: true,
      }
    }

    case types.eventHandleEnd: {
      return {
        ...state,
        inTransition: false,
      }
    }

    default:
  }
  return state;
}
export default game;