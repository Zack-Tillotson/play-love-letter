import React from 'react';

import './players.scss';

import cardBack from '../../images/card-back.png';
import cardFront1 from '../../images/card-front-1.png';
import cardFront2 from '../../images/card-front-2.png';
import cardFront3 from '../../images/card-front-3.png';
import cardFront6 from '../../images/card-front-6.png';
import cardFront7 from '../../images/card-front-7.png';

const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
const playedCards = [cardFront1, cardFront2, cardFront3];

function Players() {
  return (
    <div className="players">
      {players.map((name, playerIndex) => {
        return (
          <div key={name} className="player">
            <div className="player-cards">
              {playedCards.map((card, index) => (
                <img
                  key={index}
                  src={card}
                  className="player-cards__played-card"
                  style={{left: `calc(var(--card-overhang, 20px) * ${index})`}} />
              ))}
            </div>
            <div className="player-hand">
              {playerIndex !== 1 && (
                <img src={cardBack} className="player-cards__hand_card" />
              )}
              {playerIndex === 1 && (
                <React.Fragment>
                  <img
                    src={cardFront6}
                    className="player-cards__hand_card player-cards__hand_card--active" />
                  <img
                    src={cardFront7}
                    className="player-cards__hand_card player-cards__hand_card--active" />
                </React.Fragment>
              )}
            </div>
            <div className="player-name">{name}</div>
            <div className="player-score">
              score
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Players;