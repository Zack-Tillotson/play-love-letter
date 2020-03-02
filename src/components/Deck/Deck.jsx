import React from 'react';

import deckImage from '../../images/card-back.png';
import deckImageRotated from '../../images/card-back-rotated.png';

import './deck.css';

function Deck() {
  return (
    <div className="deck">
      <img src={deckImage} className="deck__card deck__card--upright" />
      <img src={deckImageRotated} className="deck__card deck__card--rotated" />
    </div>
  );
}

export default Deck;