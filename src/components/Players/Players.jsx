import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import throttle from 'lodash.throttle'
import cn from 'classnames'

import selector from '../../state/selector'
import actions from '../../state/actions'

import './players.scss'

import Player from '../Player'

function getPlayerClassName(players, player, self, index) {
  if(player.id === self.id) return 'player--self';

  const position = players.findIndex(testPlayer => testPlayer.id === self.id) < index ? index : index + 1;

  return `player--${position}-of-${players.length - 1}`  
}

function Players() {
  const {players, self} = useSelector(selector)

  return (
    <div className={cn('players')} id="players-container">
      {players.map((player, index) => <Player key={player.id} player={player} className={getPlayerClassName(players, player, self, index)} />)}
    </div>
  );
}

export default Players;