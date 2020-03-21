import React, {useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux'

import selector from '../../state/selector'
import actions from '../../state/actions'

import Status from 'components/Status';
import Deck from 'components/Deck';
import DeckDetail from 'components/DeckDetail';
import Players from 'components/Players';
import Transitions from 'components/Transitions'

import {INGAME} from '../../state/constants'

import './game.scss';

function Game() {

  const {state} = useSelector(selector).game;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.interactionMount('Game'))
  }, [dispatch])

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