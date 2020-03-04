import React from 'react';

import './transitions.scss';
import Card from '../Card'

function Transitions() {

  return (
    <React.Fragment>
      <Card isVisible={false} id="t-drawn-card" className="transition-item drawn-card" />
    </React.Fragment>
  );
}

export default Transitions;