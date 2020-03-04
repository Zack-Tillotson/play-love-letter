import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './state/reducer';
import saga from './state/saga';

import actions from './state/actions';
import {popQSaga} from './state/sagas/session'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
window.__store__ = store;

saga.forEach(sagaItem => sagaMiddleware.run(sagaItem))

store.dispatch(
  actions.eventReceived(
    'game_started',
    {
      players: [{name: 'Alice', id: 0}, {name: 'Bob', id: 1}, {name: 'Charlie', id: 2}],
      deck: [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1, 2, 3, 4, 5],
      startPlayer: 0,
    },
  )
);
sagaMiddleware.run(popQSaga)
document.getElementById('popQ').addEventListener('click', () => {
  sagaMiddleware.run(popQSaga)
})

export default store;