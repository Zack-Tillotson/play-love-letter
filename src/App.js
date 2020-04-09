import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import GameMonitor from 'components/Game/GameMonitor'
import Landing from 'components/Landing'

import actions from './state/actions'

function ResetTheStuffs({store}) {
  useEffect(() => {
    store.dispatch(
      actions.interactionClick(
        'reset_game',
      )
    );
  }, [])
  return "it's reset";
}

function App({store}) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/game/">
            <GameMonitor />
          </Route>
          <Route path="/reset/">
            <ResetTheStuffs store={store} />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

