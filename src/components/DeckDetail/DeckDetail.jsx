import React from 'react';
import {useSelector} from 'react-redux'
import selector from '../../state/selector'

import './deckDetail.scss'

const cardCounts = {
  1: 5,
  2: 2,
  3: 2,
  4: 2,
  5: 2,
  6: 1,
  7: 1,
  8: 1,
}

function DeckDetail() {
  const {players} = useSelector(selector);
  const playedCounts = players.reduce((counts, player) => {
    player.playedCards.forEach(value => counts[value]++)
    return counts;
  }, {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0})

  return (
    <div className="deck-detail">
      <h3>Cards left in deck (or your hand)</h3>
      <ul className="deck-detail">
        {Object.keys(cardCounts).reduce((lis, rank) => ([
          ...lis,
          ...new Array(cardCounts[rank]).fill(0).map((_, index) => (
            <li
              key={`${rank} + ${index}`}
              className={'deck-detail__item ' + (index < playedCounts[rank] ? 'deck-detail__item--played' : '')}
            >
              {rank}
            </li>
          ))
        ]), [])}
      </ul>
    </div>
  );
}

export default DeckDetail;