import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './state/reducer';
import saga from './state/saga';

import actions from './state/actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
window.__store__ = store;

saga.forEach(sagaItem => sagaMiddleware.run(sagaItem))

document.getElementById('gameInit').addEventListener('click', () => {
  store.dispatch(
    actions.interactionClick(
      'reset_game',
    )
  );
})
document.getElementById('play1').addEventListener('click', () => {
  store.dispatch(
    actions.eventReceived(
      'card_played',
      {
        value: 1,
        target: {
          player: 1,
          rank: 5,
        },
        playerId: 0,
      },
    )
  );
})

document.getElementById('play2').addEventListener('click', () => {
  store.dispatch(
    actions.eventReceived(
      'card_played',
      {
        value: 4,
        playerId: 1,
      },
    )
  );
})

export default store;