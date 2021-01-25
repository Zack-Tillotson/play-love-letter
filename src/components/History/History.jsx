import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import selector from '../../state/selector'
import actions from '../../state/actions'

import Persona from '../Persona'
import Card from '../Card'

import './history.scss';
import crownImage from '../../images/crown.png'

const DISPLAYED_EVENT_TYPES = ['round_ready', 'player_card_effect'];

function History() {
  const {history} = useSelector(selector);
  const dispatch = useDispatch()

  const filteredHistory = history
    .filter(event => DISPLAYED_EVENT_TYPES.includes(event.type))

  const scrollContainerRef = useRef(null);
  useEffect(() => {
    scrollContainerRef.current.scrollTop = 10000;
  }, [history]);

  const handleDetailClick = value => {
    dispatch(actions.interactionClick('active-history-detail', value))
  }

  return (
    <div className="history">
      <div className="history__scrolly" ref={scrollContainerRef}>
        {filteredHistory.map((event, index) => {
          switch(true) {
            case (event.type === 'round_ready'): {
              return (
                <div key={index} className="history__round-title">Round{'\u00A0'}{event.data.roundNum}</div>
              );
            }
            case (event.type === 'player_card_effect' && !!event.data.value): {
              return (
                <div key={index} className="history__card-played" onClick={() => handleDetailClick(event)}>
                  <div className="history__card-container">
                    <Card value={event.data.value} isVisible className="history__card" />
                  </div>
                  <Persona 
                    {...event.data.player} 
                    status={event.data.playerEliminated === event.data.player ? 'eliminated' : 'active'}
                    isMini 
                    className="history__player" />                
                </div>
              );
            }

            case (event.type === 'player_card_effect' && !!event.data.roundWinner): {
              return (
                <div key={index} className="history__round-won">
                  <img className="history__image" src={crownImage} alt="Round won" />
                  <Persona {...event.data.roundWinner} isMini />
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
}

export default History;