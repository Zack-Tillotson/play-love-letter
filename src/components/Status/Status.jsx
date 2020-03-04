import React from 'react';
import {useSelector} from 'react-redux'

import selector from '../../state/selector'

import './status.css';

function Status() {
  const {roundNum, statusMessage} = useSelector(selector).round;

  return (
    <div className="status">
      Round {roundNum}: {statusMessage}
    </div>
  );
}

export default Status;