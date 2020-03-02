import React from 'react';

import Status from 'components/Status';
import Deck from 'components/Deck';
import DeckDetail from 'components/DeckDetail';
import Players from 'components/Players';

import './game.scss';

function Game() {
  return (
    <div className="game">
      <Status />
      <Deck />
      <DeckDetail />
      <Players />
    </div>
  );
}

export default Game;