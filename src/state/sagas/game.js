import { call, put, select, delay, takeEvery, takeLatest } from 'redux-saga/effects'

import types from '../types';
import actions from '../actions'
import selector from '../selector'

function withTransitionEndedMeta(action) {
  return {...action, meta: {...(action.meta || {}), inTransition: false}}
}

const duration = 750

// A game is initialized with players when all players are ready. The
// result should be the game is set up and the first round starts
function* implGameInit({players, deck, startPlayer}) {
  yield put(actions.gameReadied(players, deck, startPlayer))
  yield delay(duration)

  // draw a card for each player
  for(let i = 0 ; i < players.length; i++) {

    const nextCard = (yield select(selector)).round.deck[0]
    const player = players[i]

    yield put(actions.transitionCardDrawn(player.id, duration))
    yield delay(duration)
    yield put(actions.cardDrawn(player.id, nextCard))
  }

  yield handleRoundInitialization({roundNum: 1, activePlayer: startPlayer})
}

function* handleRoundInitialization({roundNum, activePlayer}) {
  yield delay(duration)
  yield put(actions.roundReadied(1, activePlayer))

  yield handlePlayerInitialization({playerId: activePlayer})
}

function* handlePlayerInitialization({playerId}) {
  yield delay(duration)
  yield put(actions.transitionCardDrawn(playerId, duration))
  yield delay(duration)

  const nextCard = (yield select(selector)).round.deck[0]
  yield put(actions.cardDrawn(playerId, nextCard))

  const player = (yield select(selector)).players.find(player => player.id === playerId)
  yield put(withTransitionEndedMeta(actions.playerReadied(player)))
}

function* monitorCardPlays() {
  yield takeEvery(action => action.type === types.transitionCardTarget && action.payload.eventType === 'active-card-drag-end', handleCardPlay);
  yield takeEvery(action => action.type === types.interactionClick && action.payload.id === 'rank-1-select-card-value', handleCardPlay);
}

function* handleCardPlay() {
  const {sourceId, isTargettingPlayers, targetPlayer, cardValue, targetCardValue} = (yield select(selector)).cardAction;
  const {round: {activePlayer}, self, game: {state}} = (yield select(selector));

  const hasRank1TargetCardWhenNeeded = cardValue !== 1 || !!targetCardValue;

  if(!hasRank1TargetCardWhenNeeded) {
    yield put(actions.interactionClick('rank-1-select'));
    return;
  }

  if(isTargettingPlayers && state === 'ingame' && activePlayer === self.id) {
    yield put(actions.interactionClick('cardPlay', {playerId: activePlayer, cardValue, targetPlayer, targetCardValue}));
  }

  yield put(actions.transitionCardTarget('active-card-drag-reset'));  
}

function* implCardPlay({playerId, value, target, targetCard}) {
  const player = (yield select(selector)).players.find(p => p.id === playerId)
  const targetPlayer = (yield select(selector)).players.find(p => p.id === target)

  let playCardMessage = `${player.name} plays ${value}`;
  switch(value) {
    case 1: {
      playCardMessage += ` and guesses ${targetPlayer.name} is a ${targetCard}`;
    }
    break;
    case 2: {
      playCardMessage += ` and looks at ${targetPlayer.name}'s hand`;
    }
    break;
    case 3: {
      playCardMessage += `. ${player.name} and ${targetPlayer.name} compare hand cards.`;
    }
    break;
    case 4: {
    }
    break;
    case 5: {
      playCardMessage += ` and makes ${player === targetPlayer ? 'themselves' : targetPlayer.name} draw a new card.`;
    }
    break;
    case 6: {
      playCardMessage += ` and swaps hands with ${targetPlayer.name}`;
    }
    break;
    case 7: {
    }
    break;
    case 8: {
    }
    break;

  }

  yield put(actions.playerPlaysCard({player, value, targetPlayer, targetCard, statusMessage: playCardMessage}))
  yield delay(duration)
  yield handleCardEffect({playerId, value, target, targetCard});
}

function* handleCardEffect({playerId, value, target, targetCard}) {
  const player = (yield select(selector)).players.find(p => p.id === playerId)
  const targetPlayer = (yield select(selector)).players.find(p => p.id === target)

  switch(value) {
    case 1: {
      const isCorrectGuess = targetPlayer.hand.includes(targetCard);
      const cardEffectMessage = `${player.name} guessed ${isCorrectGuess ? 'correctly' : 'wrong'}${isCorrectGuess ? ` ${targetPlayer.name} is eliminated!` : ''}`
      yield put(actions.roundEffect({player, targetPlayer, value, isCorrectGuess, playerEliminated: isCorrectGuess ? player : null, statusMessage: cardEffectMessage}))
    }
    break
    case 2: {
      const cardEffectMessage = `${player.name} can look at ${targetPlayer.name}'s hand card`
      yield put(actions.roundEffect({player, targetPlayer, value, cardEffectMessage}))
    }
    break
    case 3: {
      const isTargetOut = player.hand[0] > targetPlayer.hand[0];
      const arePlayersEqual = player.hand[0] === targetPlayer.hand[0];
      
      let playerEliminated = null;
      let cardEffectMessage = `${player.name} and ${targetPlayer.name} have the same hand card, so noone is eliminated`;
      
      if(!arePlayersEqual) {
        playerEliminated = isTargetOut ? targetPlayer : player;
        const playerNotEliminated = isTargetOut ? player : targetPlayer;
        cardEffectMessage = `${playerNotEliminated.name} has a higher card, ${playerEliminated.name} is eliminated`
      }
      
      yield put(actions.roundEffect({player, targetPlayer, value, playerEliminated, statusMessage: cardEffectMessage}))
    }
    break
    case 4: {
      const cardEffectMessage = `${player.name} can't be targetted until their next round`;
      yield put(actions.roundEffect({player, targetPlayer, value, playerProtected: player, statusMessage: cardEffectMessage})) 
    }
    break;
    case 5: {
      const playerEliminated = targetPlayer.hand[0] === 8 ? targetPlayer : null;
      const newCard = !!playerEliminated ? 0 : (yield select(selector)).round.deck[0];

      let cardEffectMessage = `${targetPlayer.name} discards a ${targetPlayer.hand[0]} and draws a new card`
      if(playerEliminated) {
        cardEffectMessage = `${targetPlayer.name} discards a ${targetPlayer.hand[0]} and is eliminated`
      }
      yield put(actions.roundEffect({player, targetPlayer, value, newCard, playerEliminated, statusMessage: cardEffectMessage}))  
    }
    break
    case 6: {
      yield put(actions.roundEffect({player, targetPlayer, value}))
    }
    break
    case 7: {
      yield put(actions.roundEffect({player, targetPlayer, value}))  
    }
    break
    case 8: {
      const cardEffectMessage = `${player.name} is eliminated`
      yield put(actions.roundEffect({player, targetPlayer, value, playerEliminated: player, statusMessage: cardEffectMessage}))
    }
    break;
  }

  yield delay(duration)
  yield handleTurnEnd()
}

function* handleTurnEnd() {
  const {players, round} = yield select(selector);

  const roundIsOver = players.filter(player => player.status === 'active').length <= 1 || round.deck.length <= 1;

  if(roundIsOver) {

  } else {    

    const currentPlayerIndex = players.findIndex(player => player.id === round.activePlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;

    yield handlePlayerInitialization({playerId: players[nextPlayerIndex].id});
  }
  // Is round over?
  // If yes
    // Award win point
    // Is game over?
    // If yes
      // Display win screen
    // else
      // initialize next round
  // else
    // Make next player active

}

export default {
  implGameInit, // Take event and apply to local game state
  implCardPlay,

  monitorCardPlays, // Wait for local game event and translate to game interaction
}