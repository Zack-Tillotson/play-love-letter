import React, {useState} from 'react';
import {Provider} from 'react-redux';

import Game from 'components/Game'
import Landing from 'components/Landing'

import {PREGAME, INGAME} from './state/constants'

function App({store}) {
  const [isPregame, updateStatus] = useState(true)

  return (
    <Provider store={store}>
      {isPregame && (
        <Landing onJoin={() => updateStatus(false)} />
      )}
      {!isPregame && (
        <Game />
      )}
    </Provider>
  );
}

export default App;

