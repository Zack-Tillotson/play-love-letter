import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import GameMonitor from 'components/Game/GameMonitor'
import Landing from 'components/Landing'

import actions from './state/actions'

function App({store}) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/game/">
            <GameMonitor />
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

