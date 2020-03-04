import types from '../types';

const initialState = {
  roundNum: 1,
  deck: [],
  activePlayer: -1,
  statusMessage: 'Please wait, setting up',
}

function round(state = initialState, action) {
  switch(action.type) {
    case types.gameReadied: {
      const {deck} = action.payload;

      return {
        ...initialState,
        deck,
      };
    }

    case types.roundReadied: {
      const {roundNum, activePlayer} = action.payload
      return {
        ...state,
        roundNum,
        statusMessage: 'New round, here we go!'
      }
    }

    case types.cardDrawn: {
      return {
        ...state,
        deck: state.deck.slice(1),
      }
    }

    case types.playerReadied: {
      const {player} = action.payload;
      return {
        ...state,
        activePlayer: player.id,
        statusMessage: `It's ${player.name}'s turn`,
      }
    }
  }
  return state;
}
export default round;