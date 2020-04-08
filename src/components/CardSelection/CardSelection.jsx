import React, {Fragment} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import selector from '../../state/selector'
import actions from '../../state/actions'

import Card from '../Card'

import './cardSelection.scss'

function CardSelection() {
  const {cardAction: {cardValue}, round, self} = useSelector(selector)
  const isActive = round.activePlayer === self.id

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(actions.interactionClick('card-selection-close', true))
  }

	return (
    <div className="card-selection__close" onClick={handleClose}>
		  <Card value={cardValue} isVisible={true} className="card-selection__card" />
    </div>
	)
}

export default CardSelection