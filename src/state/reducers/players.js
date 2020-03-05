import types from '../types';

const initialState = {
  id: 0,
  name: 'Player',
  status: 'active',
  score: 0,
  playedCards: [],
  hand: [],
}

function players(state = [], action) {
  switch(action.type) {
    case types.gameReadied: {
      const {players} = action.payload;
      return players.map(dataPlayer => ({
        ...initialState,
        ...dataPlayer,
      }));
    }

    case types.cardDrawn: {
      const {playerId, value} = action.payload
      return state.map(player => {
        if(player.id !== playerId) {
          return player
        }

        return {
          ...player,
          hand: [...player.hand, value],
        }
      })
    }

    case types.playerPlaysCard: {
      const {player, value, target} = action.payload
      return state.map(statePlayer => {
        if(statePlayer.id !== player.id) {
          return statePlayer
        }

        const otherCard = statePlayer.hand[0] === value ? statePlayer.hand[1] : statePlayer.hand[0]

        return {
          ...statePlayer,
          hand: [otherCard],
          playedCards: [...statePlayer.playedCards, value],
        }
      })
    }

    default:
  }
  return state;
}
export default players;