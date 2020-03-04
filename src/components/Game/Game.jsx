import React from 'react';

import {useSelector} from 'react-redux'

import selector from '../../state/selector'

import Status from 'components/Status';
import Deck from 'components/Deck';
import DeckDetail from 'components/DeckDetail';
import Players from 'components/Players';
import Transitions from 'components/Transitions'

import {INGAME} from '../../state/constants'

import './game.scss';

function Game() {

  const {state} = useSelector(selector).game;
  if(state !== INGAME) return false; // XXX

  return (
    <div className="game">
      <Status />
      <Deck />
      <DeckDetail />
      <Players />
      <Transitions />
    </div>
  );
}

export default Game;