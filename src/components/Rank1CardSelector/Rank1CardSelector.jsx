import React, {Fragment} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import selector from '../../state/selector'
import actions from '../../state/actions'

import Card from '../Card'

import './rank1CardSelector.scss'

function Rank1CardSelector() {
  const dispatch = useDispatch()

  const handleSelect = cardValue => {
    dispatch(actions.interactionClick('rank-1-select-card-value', cardValue))
  }

  return (
    <div className="rank-1-selector">
      <h2>Guess A Rank</h2>
      {new Array(7).fill(0).map((_, index) => {
        const cardValue = index + 2; // 2-8
        return (
          <Card key={cardValue} value={cardValue} isVisible={true} className="rank-1-selector__card" onClick={handleSelect.bind(this, cardValue)} />
        );
      })}
    </div>
  )
}

export default Rank1CardSelector