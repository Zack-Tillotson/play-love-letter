import {SYNCING, PREGAME, INGAME} from '../constants';
import types from '../types';

const initialState = {
  host: null,
  isHosting: false,
  state: SYNCING, // [syncing | pregame | ingame | postgame] events are taken from queue during ingame
  lobby: [], // {id, name}
  inTransition: false,
}

function game(state = initialState, action) {
  switch(action.type) {
    case types.dataReceived: {
      const {path, data} = action.payload;

      switch(path) {
        case 'meta': {
          if(!data) return initialState

          const {state: gameState, host, lobby} = data;
          const {id} = action.meta;
          
          return {
            ...state,
            state: gameState,
            host,
            isHosting: id === host,
            lobby,
          }
        }
      }
    }
    break;
    case types.gameReadied: {
      return {
        ...state,
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