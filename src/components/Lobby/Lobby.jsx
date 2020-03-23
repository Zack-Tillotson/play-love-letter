import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import actions from '../../state/actions'

import logo from '../../images/logo.png'


import './lobby.scss';

function Lobby() {
  const {isHosting} = useSelector(s=>s).game
  const {name, uid} = useSelector(s=>s).self
  const {players} = useSelector(s=>s)
  
  const dispatch = useDispatch()

  const [isEditable, updateEditable] = useState(!name)
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
              <label htmlFor="name-input">Enter your name: </label>
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
            <ol className="lobby__player-list">
              {players.forEach(player => (
                <li key={player.uid}>
                  {player.name}
                  {player.uid === uid && (<button>X</button>)}
                </li>
              ))}              
            </ol>
            {isHosting && (
              <div className="lobby__controls">
                <button>Start Game</button>
              </div>
            )}
            {!isHosting && (
              <div className="lobby__controls">
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