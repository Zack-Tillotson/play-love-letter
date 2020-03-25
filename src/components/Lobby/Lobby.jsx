import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import actions from '../../state/actions'

import logo from '../../images/logo.png'


import './lobby.scss';

function Lobby() {
  const {isHosting, lobby} = useSelector(s=>s).game
  const {name, id} = useSelector(s=>s).self

  const dispatch = useDispatch()

  const [isEditable, updateEditable] = useState(name === 'Player')
  const [nameInputValue, updateNameInputValue] = useState(name)

  const handleSubmit = () => {
    if(isEditable) {
      const cleanName = nameInputValue.slice(0, 10)
      
      dispatch(actions.interactionClick('selfName', cleanName))

      updateNameInputValue(cleanName)
      updateEditable(false)
    } else {
      updateEditable(true)
    }
  }

  const handleRemove = id => {
    dispatch(actions.interactionClick('removeLobbyPlayer', id))
  }

  const handleStartGame = () => {
    dispatch(actions.interactionClick('startGame'))
  }

  return (
    <div className="lobby">
      <section className="lobby__nav">
        <div className="lobby__container">
          <a href="/game/">
            <img src={logo} alt="Love Letter logo" />
          </a>
        </div>
      </section>
      <div className="lobby__container">
        <section className="lobby__body">
          <h1 className="lobby__title">Game Lobby</h1>
          <div className="lobby__body">
            <p>The game is being set up, ask your friends to join!</p>
            <div className="lobby__name-container">
              <label htmlFor="name-input">Update your name</label>
              <input 
                id="name-input" 
                type="text" 
                className="landing__name-input" 
                placeholder="A super fun name" 
                value={nameInputValue} 
                onChange={({target: {value}}) => updateNameInputValue(value)}
                disabled={!isEditable} />
              <button onClick={handleSubmit}>{isEditable ? '✔' : '✎'}</button>
              {nameInputValue.length > 10 && (
                <div className="name-input__warning">Your name must be less than 10 letters long</div>
              )}
            </div>
            <h2 className="lobby__players-header">{lobby.length} Players (2 min, 6 max)</h2>
            <ol className="lobby__player-list">
              {new Array(6).fill(0).map((_, index) => {
                if(lobby.length < index + 1) {
                  return (<li key={index} className="player-list__item player-list__item--empty">Invite a friend...</li>)
                }

                const player = lobby[index]
                return (
                  <li key={player.id} className={'player-list__item player-list__item--filled' + (player.id === id ? ' player-list__item--self' : '')}>
                    {player.name}
                    {(isHosting || player.id === id) && (
                      <button onClick={() => handleRemove(player.id)}>×</button>
                    )}
                  </li>
                )
              })}          
            </ol>
            {isHosting && (
              <div className="lobby__controls">
                <button onClick={() => handleStartGame()}>Start Game</button>
              </div>
            )}
            {!isHosting && (
              <div className="lobby__controls lobby__controls--non-host">
                Waiting for host to start game...
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Lobby;