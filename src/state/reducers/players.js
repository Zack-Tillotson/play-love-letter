import types from '../types';

const initialState = {
  id: 0,
  name: 'Player',
  status: 'active',
  score: 0,
  playedCards: [],
  hand: [],
  protected: false, // Can't be targetted
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
          protected: false,
        }
      })
    }

    case types.roundEffect: {
      const {playerEliminated, playerProtected, player: playingPlayer, targetPlayer, newCard, value, roundWinner} = action.payload;

      let newState = state;
      if(playerEliminated) {
        newState = newState.map(player => {
          if(player === playerEliminated) {
            return {
              ...player,
              playedCards: [...player.playedCards, ...player.hand],
              status: 'eliminated',
              hand: [],
            }
          }
          return player;
        })
      }

      if(playerProtected) {
        newState = newState.map(player => {
          if(player === playerProtected) {
            return {
              ...player,
              protected: true,
            }
          }
          return player;
        }) 
      }

      if(newCard) {
        newState = newState.map(player => {
          if(player === targetPlayer) {
            return {
              ...player,
              playedCards: [...player.playedCards, ...player.hand],
              hand: [newCard],
            }
          }
          return player;
        }) 
      }

      if(value === 6) {
        newState = newState.map(player => {
          if(player === targetPlayer) {
            return {
              ...player,
              hand: playingPlayer.hand,
            }
          }
          if(player === playingPlayer) {
            return {
              ...player,
              hand: targetPlayer.hand,
            }
          }
          return player;
        }) 
      }

      if(roundWinner) {
        newState = newState.map(player => {
          if(player === roundWinner) {
            return {
              ...player,
              score: player.score + 1,
            }
          }
          return player;
        })
      }

      return newState;
    }

    default:
  }
  return state;
}
export default players;