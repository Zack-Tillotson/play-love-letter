import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Game from 'components/Game'
import Landing from 'components/Landing'

import actions from './state/actions'

function App({store}) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/game/">
            <Game />
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

