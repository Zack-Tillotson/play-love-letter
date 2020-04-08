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
    <Fragment>
      <button className="card-selection__close" onClick={handleClose}>X</button>
  		<Card value={cardValue} isVisible={true} className="card-selection__card" />
      {isActive && (
        <div className="card-selection__form">
          {[1, 2, 3, 5, 6].includes(cardValue) && (
            <div className="card-selection-form__target-player">
              Select a target player
            </div>
          )}
          {[1].includes(cardValue) && (
            <div className="card-selection-form__target-player">
              Select a target rank
            </div>
          )}
          <button>Play Card</button>
        </div>
      )}
    </Fragment>
	)
}

export default CardSelection