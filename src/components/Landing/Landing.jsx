import React from 'react';

import {useSelector} from 'react-redux'
import store from 'store';

import logo from '../../images/logo.png'
import cardBack from '../../images/card-back.png'


import './landing.scss';

function Landing({onJoin}) {

  return (
    <div className="landing">
      <section className="landing__nav">
        <div className="landing__container">
          <a href="/">
            <img src={logo} alt="Love Letter logo" />
          </a>
        </div>
      </section>
      <div className="landing__container">
        <section className="landing__body">
          <h1 className="landing__title">Play Love Letter</h1>
          <p className="landing__p">Love Letter is a game of risk, deduction, and luck for 2–6 players. Your goal is to get your love letter into Princess Annette's hands while deflecting the letters from competing suitors. <br /> <br />From a deck with only sixteen cards, each player starts with only one card in hand; one card is removed from play. On a turn, you draw one card, and play one card, trying to expose others and knock them from the game. Powerful cards lead to early gains, but make you a target. Rely on weaker cards for too long, however, and your letter may be tossed in the fire!</p>
          <img className="landing__img" src={cardBack} alt="Love Letter card" />
          <div className="landing__button"><button onClick={onJoin}>Join Game</button></div>
        </section>
      </div>
    </div>
  );
}

export default Landing;