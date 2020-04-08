import React from 'react';
import {useSelector} from 'react-redux'

import selector from '../../state/selector'

import './transitions.scss';
import Card from '../Card'

function Transitions() {
  const {cardValue} = useSelector(selector).cardAction

  return (
    <React.Fragment>
      <Card isVisible={false} id="t-drawn-card" className="transition-item drawn-card" />
      <Card isVisible={true} value={cardValue} id="t-targetting-card" className="transition-item player-cards__hand-card player-cards__hand_card--active" />
      <svg id="t-targetting-arrow" className="transition-item transition-targetting-arrow" viewBox={`0 0 ${document.body.offsetWidth} ${document.body.offsetHeight}`}>
        <line id="t-targetting-arrow-line" />
      </svg>
    </React.Fragment>
  );
}

export default Transitions;