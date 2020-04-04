import {combineReducers} from 'redux';

import round from './reducers/round';
import players from './reducers/players';
import game from './reducers/game';
import history from './reducers/history';
import eventQueue from './reducers/eventQueue';
import self from './reducers/self';
import cardAction from './reducers/cardAction';

const rootReducer = combineReducers({
  round,
  players,
  game,
  history,
  eventQueue,
  self,
  cardAction,
});

export default rootReducer;