import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import throttle from 'lodash.throttle'
import cn from 'classnames'

import selector from '../../state/selector'
import actions from '../../state/actions'

import './player.scss'

import Card from '../Card'
import Persona from '../Persona'

import {isHoverPlayersContainer, getPlayerAtCoordinates} from './util'

const TARGET_CARDS = [1, 2, 3, 5, 6]
const throttledDispatch = throttle((dispatch, action) => dispatch(action), 50)

function Player({player, className}) {
  const {self, round, cardAction} = useSelector(selector)
  const dispatch = useDispatch()

  const handleClick = value => {
    dispatch(actions.interactionClick('active-card', value))
  }

  const handleDrag = (type, value, ele, position, event) => {
    const targetPlayer = getPlayerAtCoordinates(position)
    const isTargettingPlayers = targetPlayer !== player.id
    throttledDispatch(dispatch, actions.transitionCardTarget('active-card-drag', value, ele.id, position, isTargettingPlayers, targetPlayer)) 
  }

  const handleDragEnd = (type, value, ele, position, event) => {
    throttledDispatch.cancel()
    throttledDispatch(dispatch, actions.transitionCardTarget('active-card-drag-end')) 
  }

  const {name, playedCards, hand, score} = player
  const isActive = round.activePlayer === player.id && player.hand.length === 2
  const {isTargetting, cardValue: targetValue, isTargettingPlayers, targetPlayer} = cardAction

  const isSelf = player.id === self.id;
  const isTargettedPlayer = isTargettingPlayers && targetPlayer === player.id && TARGET_CARDS.includes(targetValue)

  return (
    <div key={name} className={cn('player', className, {'player--targetted': isTargettedPlayer, 'player--self': isSelf})} id={`player-${player.id}`}>
      <div className="player__played-cards">
        {/*playedCards*/[].map((card, index) => (
          <Card
            key={index}
            value={card}
            className={`player__played-card`}
            isVisible={true}
            style={{left: `calc(var(--card-overhang, 20px) * ${index})`}} />
        ))}
      </div>
      <Persona name={name} score={score} isTargettable={TARGET_CARDS.includes(targetValue)} isTargetted={isTargettedPlayer} className="player__persona" />
      <div className="player__hand-cards">
        {player.hand.map((card, index) => {

          const cardId = `${player.id}-${index}`

          const isVisible = isSelf;
          const isPlayable = isSelf && isActive && !isTargetting
          const isDragging = isTargetting && card === targetValue
          const isValidPlay = isTargetting && card === targetValue && isTargettingPlayers          

          return (
            <Card
              key={index}
              value={card}
              id={cardId}
              className={cn(
                  'player__hand-card', 
                  `player__hand-card--${index+1}`, 
                  {
                    ['player__hand-card--not-self']: !isSelf, 
                    ['player__hand-card--self']: isSelf,
                    ['player__hand-card--playable']: isPlayable,
                    ['player__hand-card--targetting']: isDragging,
                    ['player__hand-card--valid-targetting']: isValidPlay,
                    ['player__hand-card--first']: index === 0,
                    ['player__hand-card--second']: index === 1,
                  },
              )}
              draggable={true}
              onClick={isVisible ? handleClick : () => {}}
              onDrag={isVisible ? handleDrag : undefined}
              onDragEnd={isVisible ? handleDragEnd : undefined}
              isVisible={isVisible} />
          );
        })}
      </div>
    </div>
  )
}

export default Player;