import {PREGAME, INGAME} from '../constants';
import types from '../types';

const initialState = {
  state: PREGAME, // [pregame | ingame | postgame] events are taken from queue during ingame
  inTransition: false,
}

function game(state = initialState, action) {
  switch(action.type) {
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