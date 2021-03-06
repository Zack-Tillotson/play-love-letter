import React from 'react';
import {useSelector} from 'react-redux'

import selector from '../../state/selector'

import CardSelection from 'components/CardSelection'
import HistoryDetail from 'components/HistoryDetail';
import Rank1CardSelector from 'components/Rank1CardSelector'

import Transitions from 'components/Transitions'

import Status from 'components/Status';
import History from 'components/History';
import Players from 'components/Players';

import {INGAME} from '../../state/constants'

import logo from '../../images/logo.png'

import './game.scss';

function Game() {
  const {isOpen, isHistoryDetailOpen, isTargetting, isRank1SelectOpen} = useSelector(selector).cardAction

  return (
    <div className={'base-layout game'}>
      <Transitions />

      <History />
      <Status />
      <Players />

      {isOpen && <CardSelection />}
      {isHistoryDetailOpen && <HistoryDetail />}
      {isRank1SelectOpen && <Rank1CardSelector />}
    </div>
  );
}

export default Game;