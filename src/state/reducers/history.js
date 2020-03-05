import types from '../types';

function history(state = [], action) {
  switch(action.type) {
    case types.gameReadied: {
      return [{
        type: 'game_start',
      }];
    }

    case types.roundReadied: {
      return [{
        type: 'round_ready',
        data: action.payload
      }];
    }

    case types.playerPlaysCard: {
      return [{
        type: 'player_plays_card',
        data: action.payload
      }];
    }

    default:
  }
  return state;
}
export default history;