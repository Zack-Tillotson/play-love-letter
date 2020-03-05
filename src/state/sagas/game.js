import { call, put, select, delay, takeEvery, takeLatest } from 'redux-saga/effects'

import types from '../types';
import actions from '../actions'
import selector from '../selector'

function withTransitionEndedMeta(action) {
  return {...action, meta: {...(action.meta || {}), inTransition: false}}
}

const duration = 50

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

function* implCardPlay({playerId, value, target}) {
  const player = (yield select(selector)).players.find(p => p.id === playerId)
  yield put(actions.playerPlaysCard({player, value}))
  yield delay(duration)

}

export default {
  implGameInit,
  implCardPlay,
}