import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import types from '../types';
import actions from '../actions';
import selector from '../selector';

function* handleCardDrawn({payload: {playerId, duration}}) {
  try {
    const deckEle = document.getElementById('game-deck')
    const playerEle = document.getElementById(`player-${playerId}`)
    const cardEle = document.getElementById('t-drawn-card')

    cardEle.style.transition = 'none'
    cardEle.style.cssText = `left: ${deckEle.offsetLeft}px; top: ${deckEle.offsetTop}px; display: inline-block`
    cardEle.style.transition = ''
    cardEle.style.cssText = `display: inline-block; left: ${playerEle.offsetLeft + playerEle.offsetWidth / 4}px; top: ${playerEle.offsetTop + 30}px`

    setTimeout(() => {
      cardEle.style.display = ''
    }, duration)
  } catch(e) {}
}

function* watchCardDrawn() {
  yield takeEvery(types.transitionCardDrawn, handleCardDrawn)
}

export default [watchCardDrawn]