import { call, put, select, fork, takeEvery, takeLatest } from 'redux-saga/effects'

import database from '../database'

import types from '../types'
import actions from '../actions'
import selector from '../selector'
import {PREGAME, INGAME} from '../constants'
import gameSagas from './game'

import store from '../../store'; // xxx 

const COLORS = [
  '#4646ff',
  '#ca3853',
  '#20775b',
  '#7405a2',
  '#9e500e',
  '#00b906',
]

function* handleMount() {

  const meta = yield database.get('meta')
  const id = (yield call(database.getAuth)).getUid()
  const savedName = localStorage.getItem('preferredName')

  if(!meta || !meta.host) {
    yield call(database.set, 'meta', {host: id, state: PREGAME, lobby: [{id, name: savedName || 'Host'}]})
  } else {
    const isInLobby = meta.lobby.find(player => player.id === id)
    if(!isInLobby) yield call(database.set, 'meta', {lobby: [...meta.lobby, {id, name: savedName || 'Player'}]})
  }

  yield database.watch('meta', data => store.dispatch(actions.dataReceived('meta', data, {id})))
  yield database.watch('events', data => {
    const {eventQueue} = store.getState()
    const isSingle = Object.keys(data || {}).length - eventQueue.events.length === 1
    gameSagas.changeDuration(isSingle)

    store.dispatch(actions.dataReceived('events', data, {id}))
  })
}

function* handleClick({payload: {id, value}}) {

  switch(id) {

    case 'reset_game': {
      const id = (yield call(database.getAuth)).getUid()

      yield call(database.del, 'events')
      yield call(database.del, 'meta')
    }
    break;

    case 'selfName': {
      const id = (yield call(database.getAuth)).getUid()
      const {lobby} = (yield select()).game
      
      const newLobby = lobby.map(player => player.id !== id ? player : {...player, name: value})

      yield call(database.set, 'meta', {lobby: newLobby})
      localStorage.setItem('preferredName', value)
    }
    break;

    case 'removeLobbyPlayer': {
      const {lobby, host} = (yield select()).game
      const newLobby = lobby.filter(player => player.id !== value)
      const firstNonHost = lobby.find(player => player.id !== host)

      const newHost = host !== value ? host : (firstNonHost || {}).id

      yield call(database.set, 'meta', {host: newHost, lobby: newLobby})
    }
    break;

    case 'startGame': {
      const {lobby} = (yield select()).game

      const deck = [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1, 2, 3, 4, 5].sort((a, b) => Math.random() - .5)
      const players = lobby
        .sort((a, b) => Math.random() - .5).map(({name, id: id}) => ({name, id}))
        .map((player, index) => ({
          ...player,
          color: COLORS[index],
        }))

      yield call(database.set, 'meta', {state: 'ingame'})
      yield call(database.set, 'events', [{
        eventType: 'game_started',
        data: {
          players,
          deck,
          startPlayer: players[0].id,
        }
      }])
    }
    break;

    case 'cardPlay': {
      const {playerId, cardValue, targetPlayer, targetCardValue} = value;
      yield call(database.push, 'events', {
        eventType: 'card_played',
        data: {
          playerId,
          value: cardValue,
          target: targetPlayer,
          targetCard: targetCardValue,
        },
      });
    }
    break;

    case 'startNextRound': {
      const {players, self: {id}, game: {host}} = yield select()

      if(id !== host) return;

      const currentPlayerIndex = players.findIndex(player => player.id === value);
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      const nextPlayer = players[nextPlayerIndex].id;
      
      const deck = [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1, 2, 3, 4, 5].sort((a, b) => Math.random() - .5)

      
      yield call(database.push, 'events', {
        eventType: 'round_initialized',
        data: {
          deck,
          nextPlayer,
        },
      });

    }
    break;
    
  }
}

function* initListener() {
  yield takeEvery(types.interactionMount, handleMount)
  yield takeEvery(types.interactionClick, handleClick)
}

export default [initListener]