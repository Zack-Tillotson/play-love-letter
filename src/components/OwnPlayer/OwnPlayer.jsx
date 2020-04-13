import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import throttle from 'lodash.throttle'

import cn from 'classnames'

import selector from '../../state/selector'
import actions from '../../state/actions'

import './ownPlayer.scss';

import Card from '../Card';
import Persona from '../Persona'

const throttledDispatch = throttle((dispatch, action) => dispatch(action), 50)

function OwnPlayer() {
  const {players, self, round, cardAction} = useSelector(selector)
  const dispatch = useDispatch()

  const handleClick = value => {
    dispatch(actions.interactionClick('active-card', value))
  }

  const handleDrag = (type, value, ele, position, event) => {
    throttledDispatch(dispatch, actions.transitionCardTarget('active-card-drag', value, ele.id, position)) 
  }

  const handleDragEnd = (type, value, ele, position, event) => {
    throttledDispatch.cancel()
    throttledDispatch(dispatch, actions.transitionCardTarget('active-card-drag-end')) 
  }

  const player = players.find(player => player.id === self.id)
  if(!player) return null

  const {name, playedCards, hand} = player
  
  const isSelf = player.id === self.id
  const isActive = round.activePlayer === player.id && player.hand.length === 2
  const isVisible = isSelf;
  const {isTargetting, cardValue: targetValue} = cardAction

  return (
    <div className="own-player" id={`player-${player.id}`}>
      <Persona name={name} score={2} className="own-player__persona" />
      <div className="own-player__hand">
        {hand.map((card, index) => {
          const cardId = `${player.id}-${index}`

          const isActiveHighlight = isSelf && isActive && (!isTargetting || card === targetValue)

          return (
            <Card
              size="square"
              key={index}
              id={cardId}
              value={card}
              className={cn(
                'own-player__hand-card', 
                {
                  ['own-player__hand_card--active']: isActiveHighlight,
                  ['own-player__hand-card--targettable']: !isSelf && isTargetting,
                  ['own-player__hand-card--first']: index === 0,
                  ['own-player__hand-card--second']: index === 1,
                }
              )}
              isVisible={isVisible}
              draggable={true}
              onClick={isVisible ? handleClick : () => {}}
              onDrag={isVisible ? handleDrag : undefined}
              onDragEnd={isVisible ? handleDragEnd : undefined} />
          )
        })}
      </div>
      <div className="player-cards">
        {playedCards.map((card, index) => (
          <Card
            key={index}
            value={card}
            className={`own-player__played-card`}
            isVisible={true}
            style={{left: `calc(var(--card-overhang, 20px) * ${index})`}} />
        ))}
      </div>
    </div>
  )
}

export default OwnPlayer;