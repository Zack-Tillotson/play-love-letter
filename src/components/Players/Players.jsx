import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import throttle from 'lodash.throttle'

import selector from '../../state/selector'
import actions from '../../state/actions'

import './players.scss';

import Card from '../Card';

const throttledDispatch = throttle((dispatch, action) => dispatch(action), 50)

function Players() {
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

  return (
    <div className="players">
      {players.map((player) => {
        const {name, playedCards, hand} = player
        
        const isSelf = player.id === self.id
        const isActive = round.activePlayer === player.id && player.hand.length === 2
        const isVisible = isSelf;
        const {isTargetting} = cardAction

        return (
          <div key={name} className={`player ${!isSelf && isTargetting ? ' player--targettable' : ''}`} id={`player-${player.id}`}>
            <div className="player-cards">
              {playedCards.map((card, index) => (
                <Card
                  key={index}
                  value={card}
                  className="player-cards__played-card"
                  isVisible={true}
                  style={{left: `calc(var(--card-overhang, 20px) * ${index})`}} />
              ))}
            </div>
            <div className="player-hand">
              {hand.map((card, index) => {
                const cardId = `${player.id}-${index}`

                return (
                  <Card
                    size="square"
                    key={index}
                    id={cardId}
                    value={card}
                    className={`player-cards__hand_card ${isActive ? 'player-cards__hand_card--considered' : ''} ${isSelf && isActive ? 'player-cards__hand_card--active' : ''}`}
                    isVisible={isVisible}
                    draggable={true}
                    onClick={isVisible ? handleClick : () => {}}
                    onDrag={isVisible ? handleDrag : undefined}
                    onDragEnd={isVisible ? handleDragEnd : undefined} />
                )
              })}
            </div>
            <div className="player-name">{name}</div>
            <div className="player-score">
              ♡ ♡ ♡
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Players;