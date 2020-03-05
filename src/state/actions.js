import types from './types';

// Event Queue actions (server events)
function eventReceived(eventType, data) {
  return {type: types.eventReceived, payload: {eventType, data}}
}

function eventHandleStart(event) {
  return {type: types.eventHandleStart, payload: {event}}
}

function eventHandleEnd(event) {
  return {type: types.eventHandleEnd, payload: {event}}
}

// Event actions (game events)

function gameReadied(players, deck, activePlayer) {
  return {type: types.gameReadied, payload: {players, deck, activePlayer}, meta: {inTransition: true}}
}

function cardPlayed(value, target) {
  return {type: types.cardPlayed, payload: {value, target}, meta: {inTransition: true}}
}

// Internal event

function cardDrawn(playerId, value) {
  return {type: types.cardDrawn, payload: {playerId, value}}
}

function roundReadied(roundNum, activePlayer) {
  return {type: types.roundReadied, payload: {roundNum, activePlayer}}
}

function playerReadied(player) {
  return {type: types.playerReadied, payload: {player}}
}

function playerPlaysCard(payload) {
  return {type: types.playerPlaysCard, payload}
}

// Transition events

function transitionCardDrawn(playerId, duration) {
  return {type: types.transitionCardDrawn, payload: {playerId, duration}}
}

export default {
  eventReceived,
  eventHandleStart,
  eventHandleEnd,

  gameReadied,
  cardDrawn,
  roundReadied,
  playerReadied,
  playerPlaysCard,

  transitionCardDrawn,
}