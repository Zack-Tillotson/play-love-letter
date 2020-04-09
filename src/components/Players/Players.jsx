import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import throttle from 'lodash.throttle'

import selector from '../../state/selector'
import actions from '../../state/actions'

import './players.scss'

import Card from '../Card'
import Persona from '../Persona'

const throttledDispatch = throttle((dispatch, action) => dispatch(action), 50)

function Players() {
  const {players, self, round, cardAction} = useSelector(selector)
  const dispatch = useDispatch()

  const handleClick = value => {
    dispatch(actions.interactionClick('active-card', value))
  }

  return (
    <div className="players">
      {players
        .filter(player => player.id !== self.id)
        .map((player) => {

          const {name, playedCards, hand} = player
          const isActive = round.activePlayer === player.id && player.hand.length === 2
          const {isTargetting, cardValue: targetValue} = cardAction

          return (
            <div key={name} className={`player`} id={`player-${player.id}`}>
              <Persona name={name} score={2} />            
              <div className="player-cards">
                {playedCards.map((card, index) => (
                  <Card
                    key={index}
                    value={card}
                    className={`player-cards__played-card`}
                    isVisible={true}
                    style={{left: `calc(var(--card-overhang, 20px) * ${index})`}} />
                ))}
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default Players;