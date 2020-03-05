import React from 'react';

import deckImage from '../../images/card-back.png';
import deckImageRotated from '../../images/card-back-rotated.png';

import './deck.css';

function Deck() {
  return (
    <div className="deck" id="game-deck">
      <img src={deckImage} alt="The Deck" className="deck__card deck__card--upright" />
      <img src={deckImageRotated} alt="The Deck" className="deck__card deck__card--rotated" />
    </div>
  );
}

export default Deck;