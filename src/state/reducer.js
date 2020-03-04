import {combineReducers} from 'redux';

import round from './reducers/round';
import players from './reducers/players';
import game from './reducers/game';
import history from './reducers/history';
import eventQueue from './reducers/eventQueue';
import self from './reducers/self';

const rootReducer = combineReducers({
  round,
  players,
  game,
  history,
  eventQueue,
  self,
});

export default rootReducer;