import types from '../types';

const initialState = {
  roundNum: 1,
  deck: [],
  activePlayer: -1,
  statusMessage: 'Please wait, setting up',
  isRoundOver: false,
}

function round(state = initialState, action) {
  switch(action.type) {
    case types.gameReadied: {
      return initialState;
    }

    case types.roundReadied: {
      const {deck, nextPlayer} = action.payload;
      
      return {
        ...state,
        roundNum: state.roundNum + 1,
        isRoundOver: false,
        statusMessage: 'New round, here we go!',
        deck,
        activePlayer: nextPlayer,
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

    case types.playerPlaysCard: {
      const {player, value, targetPlayer, targetCard, statusMessage} = action.payload;
      return {
        ...state,
        statusMessage,
      }
    }

    case types.roundEffect: {
      const {newCard, statusMessage, roundWinner} = action.payload;
      let newState = state;

      if(statusMessage) {
        newState = {
          ...newState,
          statusMessage,
        }
      }

      if(newCard) {
        newState = {
          ...newState,
          deck: state.deck.slice(1),
        }
      }

      if(roundWinner) {
        newState = {
          ...newState,
          isRoundOver: true,
        }
      }

      return newState;
    }

    default:
  }
  return state;
}
export default round;