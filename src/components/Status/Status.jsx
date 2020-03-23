import React from 'react';
import {useSelector} from 'react-redux'

import selector from '../../state/selector'

import './status.css';

function Status() {
  const {roundNum, statusMessage} = useSelector(selector).round;
  const {isHosting} = useSelector(selector).game;

  return (
    <div className="status">
      {isHosting && '(host)'}
      {statusMessage}
    </div>
  );
}

export default Status;