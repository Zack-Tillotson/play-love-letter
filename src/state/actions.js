import types from './types';

// Shared Events (server events)
function eventReceived(eventType, data) {
  return {type: types.eventReceived, payload: {eventType, data}}
}

function eventHandled(event) {
  return {type: types.eventHandled, payload: {event}}
}

// Local events (game events)

function gameReadied(players, deck, activePlayer) {
  return {type: types.gameReadied, payload: {players, deck, activePlayer}}
}

function cardDrawn(playerId, value) {
  return {type: types.cardDrawn, payload: {playerId, value}}
}

function roundReadied(roundNum, activePlayer) {
  return {type: types.roundReadied, payload: {roundNum, activePlayer}}
}

function playerReadied(player) {
  return {type: types.playerReadied, payload: {player}}
}

// Transition events

function transitionCardDrawn(playerId, duration) {
  return {type: types.transitionCardDrawn, payload: {playerId, duration}}
}

export default {
  eventReceived,
  eventHandled,

  gameReadied,
  cardDrawn,
  roundReadied,
  playerReadied,

  transitionCardDrawn,
}