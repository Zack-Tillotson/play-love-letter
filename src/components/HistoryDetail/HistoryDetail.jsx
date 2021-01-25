import React, {Fragment} from 'react';
import cn from 'classnames';

import {useSelector, useDispatch} from 'react-redux';
import selector from '../../state/selector'
import actions from '../../state/actions'

import Card from '../Card'
import Persona from '../Persona'

import './historyDetail.scss'

function HistoryDetail() {
  const {cardAction: {historyDetail}, self} = useSelector(selector)
  const {player, value, statusMessage, targetPlayer, targetCard, isCorrectGuess, playerEliminated} = historyDetail;

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(actions.interactionClick('card-selection-close', true))
  }

  const isTargeted = [1, 2, 3, 5, 6].includes(value);
  const isPlayerSelf = self.id === player.id
  const isTargetSelf = self.id === targetPlayer.id
  const isPlayerEliminated = player.id === playerEliminated?.id
  const isTargetEliminated = targetPlayer.id === playerEliminated?.id

	return (
    <div className={cn('history-detail__close', {['history-detail__close--three-column']: isTargeted})} onClick={handleClose}>
      <div className="history-detail__player">
        <Persona {...player}  status={isPlayerEliminated ? 'out' : 'active'} />
        <Card value={value} isVisible={true} className="history-detail__card" />
        {[3].includes(value) && (
          <Card value={(player.hand[0] === 3 && player.hand.length > 1) ? player.hand[1] : player.hand[0]} isVisible={isPlayerSelf || isPlayerEliminated || (!targetPlayer.protected && isTargetSelf)} className="history-detail__card" />
        )}
      </div>
      {isTargeted && ([(
        <div key="at-symbol" className="history-detail__targets">
          @
        </div>
        ), (
        <div key="target-cards" className="history-detail__target-player">
          <Persona {...targetPlayer} status={isTargetEliminated ? 'out' : 'active'} />
          {value === 1 && (
            <Card value={targetCard || 1} isVisible={!!targetCard} className="history-detail__card" />
          )}
          {[2].includes(value) && (
            <Card value={targetPlayer.hand[0]} isVisible={!targetPlayer.protected && isTargetSelf || isPlayerSelf} className="history-detail__card" />
          )}
          {[3].includes(value) && (
            <Card value={targetPlayer.hand[0]} isVisible={!targetPlayer.protected && isTargetSelf || isTargetEliminated} className="history-detail__card" />
          )}
          {[5].includes(value) && (
            <Card value={targetPlayer.hand[0]} isVisible={!targetPlayer.protected} className="history-detail__card" />
          )}
        </div>
      )])}
      <div className="history-detail__status">{statusMessage}</div>
    </div>
	)
}

export default HistoryDetail