import React, {Fragment} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import selector from '../../state/selector'
import actions from '../../state/actions'

import Card from '../Card'
import Persona from '../Persona'

import './historyDetail.scss'

function HistoryDetail() {
  const {cardAction: {historyDetail}, self} = useSelector(selector)
  const {player, value, statusMessage} = historyDetail;

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(actions.interactionClick('card-selection-close', true))
  }

	return (
    <div className="history-detail__close" onClick={handleClose}>
      <Persona {...player} />
		  <Card value={value} isVisible={true} className="history-detail__card" />
      <div className="history-detail__status">{statusMessage}</div>
    </div>
	)
}

export default HistoryDetail