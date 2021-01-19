import React from 'react';
import {useSelector, useDispatch} from 'react-redux'

import selector from '../../state/selector'
import actions from '../../state/actions'

import './status.css';

function Status() {
  const {roundNum, statusMessage, isRoundOver} = useSelector(selector).round;
  const {state, isHosting} = useSelector(selector).game;
  const dispatch = useDispatch()

  const isGameOver = state === 'postgame';

  const handleRoundStart = () => {
    dispatch(actions.interactionClick('startNextRound'))
  }


  return (
    <div className="status">
      {statusMessage}
      {isRoundOver && !isGameOver && isHosting && (
        <button className="start-next-round" onClick={handleRoundStart}>
          Start next round
        </button>
      )}
      {isRoundOver && !isHosting && ' Waiting for host to start next round.'}
    </div>
  );
}

export default Status;