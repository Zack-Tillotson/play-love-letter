import React from 'react';
import {useSelector} from 'react-redux'

import selector from '../../state/selector'

import CardSelection from 'components/CardSelection'

import Status from 'components/Status';
import Deck from 'components/Deck';
import DeckDetail from 'components/DeckDetail';
import Players from 'components/Players';
import Transitions from 'components/Transitions'

import {INGAME} from '../../state/constants'

import './game.scss';

function Game() {
  const {isOpen, isTargetting} = useSelector(selector).cardAction

  return (
    <div className={'base-layout game'}>
      <Transitions />
      
	    <Status />
      <Deck />
      <DeckDetail />
      <Players />

      {isOpen && <CardSelection />}
    </div>
  );
}

export default Game;