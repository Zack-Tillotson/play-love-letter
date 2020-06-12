import types from '../types';

function history(state = [], action) {
  switch(action.type) {
    case types.gameReadied: {
      return [...state, {
        type: 'game_start',
      }];
    }

    case types.roundReadied: {
      return [...state, {
        type: 'round_ready',
        data: action.payload
      }];
    }

    case types.playerPlaysCard: {
      return [...state, {
        type: 'player_plays_card',
        data: action.payload
      }];
    }

    case types.roundEffect: {
      return [...state, {
        type: 'player_card_effect',
        data: action.payload
      }];
    }

    default:
  }
  return state;
}
export default history;