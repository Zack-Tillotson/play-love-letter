import types from './types';

// Data received (from db) 
function dataReceived(path, data, meta) {
  return {type: types.dataReceived, payload: {path, data}, meta}
}

// Event Queue actions (server events)

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

function gameOver(winner) {
  return {type: types.gameOver, payload: {winner}}
}

// UI Interaction

function interactionClick(id, value) {
  return {type: types.interactionClick, payload: {id, value}}
}

function interactionMount(id, value) {
  return {type: types.interactionMount, payload: {id, value}}
}

// Internal event

function cardDrawn(playerId, value) {
  return {type: types.cardDrawn, payload: {playerId, value}}
}

function roundReadied(deck, nextPlayer, roundNum) {
  return {type: types.roundReadied, payload: {deck, nextPlayer, roundNum}}
}

function playerReadied(player) {
  return {type: types.playerReadied, payload: {player}}
}

function playerPlaysCard(payload) {
  return {type: types.playerPlaysCard, payload}
}

function roundEffect(payload) {
  return {type: types.roundEffect, payload}
}

// Transition events

function transitionCardDrawn(playerId, duration) {
  return {type: types.transitionCardDrawn, payload: {playerId, duration}}
}

function transitionCardTarget(eventType, cardValue, eleId, position, isTargettingPlayers, targetPlayer) {
  return {type: types.transitionCardTarget, payload: {eventType, cardValue, eleId, position, isTargettingPlayers, targetPlayer}}
}

export default {
  dataReceived,
  
  eventHandleStart,
  eventHandleEnd,

  gameReadied,
  cardPlayed,

  interactionClick,
  interactionMount,

  cardDrawn,
  roundReadied,
  playerReadied,
  playerPlaysCard,
  roundEffect,
  gameOver,

  transitionCardDrawn,
  transitionCardTarget,
}