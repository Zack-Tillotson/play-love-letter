import {PREGAME, INGAME} from '../constants';
import types from '../types';

const initialState = {
  state: PREGAME, // [pregame | ingame | postgame] events are taken from queue during ingame
}

function game(state = initialState, action) {
  switch(action.type) {
    case types.gameReadied: {
      return {
        ...initialState,
        state: INGAME,
      }
    }
  }
  return state;
}
export default game;