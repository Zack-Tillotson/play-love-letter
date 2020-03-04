import types from '../types';

const initialState = {
  id: 0,
  name: 'Player',
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
  }
  return state;
}
export default players;