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
  const {isOpen} = useSelector(selector).cardAction

  const containerClass = isOpen ? 'card-selection' : 'game'

  return (
    <div className={'base-layout ' + containerClass}>
    	{isOpen && <CardSelection />}
    	{!isOpen && (
    		<React.Fragment>
		      <Status />
		      <Deck />
		      <DeckDetail />
		      <Players />
		      <Transitions />
		    </React.Fragment>
		)}
    </div>
  );
}

export default Game;