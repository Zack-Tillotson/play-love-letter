import React from 'react';
import {useSelector} from 'react-redux'

import selector from '../../state/selector'

import CardSelection from 'components/CardSelection'

import Transitions from 'components/Transitions'

import Status from 'components/Status';
import Deck from 'components/Deck';
import Players from 'components/Players';
import OwnPlayer from 'components/OwnPlayer';

import {INGAME} from '../../state/constants'

import logo from '../../images/logo.png'

import './game.scss';

function Game() {
  const {isOpen, isTargetting} = useSelector(selector).cardAction

  return (
    <div className={'base-layout game'}>
      <Transitions />
      
	    <nav className="game-navigation">
        <img src={logo} />
      </nav>

      <Deck />
      <Status />      
      <Players />
      <OwnPlayer />

      {isOpen && <CardSelection />}
    </div>
  );
}

export default Game;