import { call, put, select, delay, takeEvery, takeLatest } from 'redux-saga/effects'

import types from '../types';
import actions from '../actions'
import selector from '../selector'

const duration = 750

// A game is initialized with players when all players are ready. The
// result should be the game is set up and the first round starts
function* handleGameInitialization({payload: {players, activePlayer}}) {
  // draw a card for each player
  for(let i = 0 ; i < players.length; i++) {

    const nextCard = (yield select(selector)).round.deck[0]
    const player = players[i]

    yield put(actions.transitionCardDrawn(player.id, duration))
    yield delay(duration)
    yield put(actions.cardDrawn(player.id, nextCard))
  }

  yield handleRoundInitialization({payload: {roundNum: 1, activePlayer}})
}

function* handleRoundInitialization({payload: {roundNum, activePlayer}}) {
  yield delay(duration)
  yield put(actions.roundReadied(1, activePlayer))

  yield handlePlayerInitialization({payload: {playerId: activePlayer}})
}

function* handlePlayerInitialization({payload: {playerId}}) {
  yield delay(duration)
  yield put(actions.transitionCardDrawn(playerId, duration))
  yield delay(duration)

  const nextCard = (yield select(selector)).round.deck[0]
  console.log('player init', (yield select(selector)).round, playerId)
  yield put(actions.cardDrawn(playerId, nextCard))

  const player = (yield select(selector)).players.find(player => player.id === playerId)
  yield put(actions.playerReadied(player))
}

function* initListener() {
  yield takeEvery(types.gameReadied, handleGameInitialization);
}

export default [initListener]