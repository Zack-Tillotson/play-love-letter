import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import throttle from 'lodash.throttle'
import cn from 'classnames'

import selector from '../../state/selector'
import actions from '../../state/actions'

import './players.scss'

import Card from '../Card'
import Persona from '../Persona'

const TARGET_CARDS = [1, 2, 3, 5, 6]
const throttledDispatch = throttle((dispatch, action) => dispatch(action), 50)

function Players() {
  const {players, self, round, cardAction} = useSelector(selector)
  const dispatch = useDispatch()

  const handleClick = value => {
    dispatch(actions.interactionClick('active-card', value))
  }

  return (
    <div className={cn('players', {'players--targettable': cardAction.isTargetting})} id="players-container">
      {players
        .filter(player => player.id !== self.id)
        .map((player) => {

          const {name, playedCards, hand} = player
          const isActive = round.activePlayer === player.id && player.hand.length === 2
          const {isTargetting, cardValue: targetValue, isTargettingPlayers, targetPlayer} = cardAction

          const isTargettedPlayer = isTargettingPlayers && targetPlayer === player.id && TARGET_CARDS.includes(targetValue)

          return (
            <div key={name} className={cn('player', {'player--targetted': isTargettedPlayer})} id={`player-${player.id}`}>
              <Persona name={name} score={2} isTargettable={TARGET_CARDS.includes(targetValue)} isTargetted={isTargettedPlayer} />
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