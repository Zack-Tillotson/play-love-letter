import React, {useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux'

import Game from './Game'
import Lobby from '../Lobby'

import selector from '../../state/selector'
import actions from '../../state/actions'
import {PREGAME, INGAME} from '../../state/constants'

function GameMonitor() {

  const {state} = useSelector(selector).game;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.interactionMount('Game'))
  }, [dispatch])


	if(state === PREGAME) return (<Lobby />)
	if(state === INGAME) return (<Game />)

	return null

}

export default GameMonitor;