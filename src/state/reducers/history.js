import types from '../types';

function history(state = [], action) {
  switch(action.type) {
    case types.gameReadied: {
      return [{
        type: 'game_start',
      }];
    }
  }
  return state;
}
export default history;