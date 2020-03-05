import React from 'react';
import {useSelector} from 'react-redux'
import selector from '../../state/selector'

import './deckDetail.scss'

function DeckDetail() {
  const {deck} = useSelector(selector).round;
  return (
    <ul className="deck-detail">
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>2</li>
      <li>2</li>
      <li>3</li>
      <li>3</li>
      <li>4</li>
      <li>4</li>
      <li>5</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
    </ul>
  );
}

export default DeckDetail;