import React from 'react';
import {useSelector} from 'react-redux'

import selector from '../../state/selector'

import CardSelection from 'components/CardSelection'
import Rank1CardSelector from 'components/Rank1CardSelector'

import Transitions from 'components/Transitions'

import Status from 'components/Status';
import Deck from 'components/Deck';
import Players from 'components/Players';
import OwnPlayer from 'components/OwnPlayer';

import {INGAME} from '../../state/constants'

import logo from '../../images/logo.png'

import './game.scss';

function Game() {
  const {isOpen, isTargetting, isRank1SelectOpen} = useSelector(selector).cardAction

  return (
    <div className={'base-layout game'}>
      <Transitions />

      <Deck />
      <Status />      
      <Players />
      <OwnPlayer />

      {isOpen && <CardSelection />}
      {isRank1SelectOpen && <Rank1CardSelector />}
    </div>
  );
}

export default Game;