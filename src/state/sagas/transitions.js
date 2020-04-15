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
    cardEle.style.cssText = `display: inline-block; left: ${playerEle.offsetLeft + playerEle.offsetWidth / 2 - deckEle.offsetWidth / 2}px; top: ${playerEle.offsetTop + 30}px`

    setTimeout(() => {
      cardEle.style.display = ''
    }, duration)
  } catch(e) {}
}

function* handlePlayerTargetting({payload: {eventType, cardValue, eleId, position}}) {

  try {
    const arrowEle = document.getElementById('t-targetting-arrow-line')

    if(eventType === 'active-card-drag-end') {
      arrowEle.removeAttribute('x1')
      arrowEle.removeAttribute('x2')
      arrowEle.removeAttribute('y1')
      arrowEle.removeAttribute('y2')
      return;
    }

    const sourcePos = document.getElementById(eleId).getBoundingClientRect()

    arrowEle.setAttribute('x1', sourcePos.left + sourcePos.width / 2)
    arrowEle.setAttribute('y1', sourcePos.top + sourcePos.height / 2)
    arrowEle.setAttribute('x2', position.x)
    arrowEle.setAttribute('y2', position.y)
  } catch(e) {
    console.error(e)
  }
}

function* watchCardDrawn() {
  yield takeEvery(types.transitionCardDrawn, handleCardDrawn)
  yield takeEvery(types.transitionCardTarget, handlePlayerTargetting)
}

export default [watchCardDrawn]