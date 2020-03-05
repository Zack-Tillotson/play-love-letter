import React from 'react';
import {useSelector} from 'react-redux'

import selector from '../../state/selector'

import './players.scss';

import Card from '../Card';

function Players() {
  const {players, self, round} = useSelector(selector)

  return (
    <div className="players">
      {players.map((player) => {
        const {name, playedCards, hand} = player
        const isSelf = player.id === self.id
        const isActive = round.activePlayer === player.id && player.hand.length === 2
        return (
          <div key={name} className="player" id={`player-${player.id}`}>
            <div className="player-cards">
              {playedCards.map((card, index) => (
                <Card
                  key={index}
                  value={card}
                  className="player-cards__played-card"
                  isVisible={isSelf}
                  style={{left: `calc(var(--card-overhang, 20px) * ${index})`}} />
              ))}
            </div>
            <div className="player-hand">
              {hand.map((card, index) => (
                <Card
                  key={index}
                  value={card}
                  className={`player-cards__hand_card ${isActive ? 'player-cards__hand_card--considered' : ''} ${isSelf && isActive ? 'player-cards__hand_card--active' : ''}`}
                  isVisible={isSelf} />
              ))}
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