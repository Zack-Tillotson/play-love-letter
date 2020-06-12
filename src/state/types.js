export default {
  dataReceived: 'DATA/recieved',
  
  eventReceived: 'EVENT_QUEUE/eventReceieved',
  eventHandleStart: 'EVENT_QUEUE/eventHandle/start',
  eventHandleEnd: 'EVENT_QUEUE/eventHandle/end',

  gameReadied: 'EVENT/GameReadied',
  cardPlayed: 'EVENT/CardPlayed',

  interactionClick: 'INTERACTION/click',
  interactionMount: 'INTERACTION/mount',

  cardDrawn: 'GAME/CardDrawn',
  roundReadied: 'GAME/RoundReadied',
  playerReadied: 'GAME/PlayerReadied',
  playerPlaysCard: 'GAME/PlayerPlaysCard',
  roundEffect: 'GAME/RoundEffect',
  gameOver: 'GAME/GameOver',

  transitionCardDrawn: 'TRANSITION/cardDrawn',
  transitionCardTarget: 'TRANSITION/cardTarget',
}