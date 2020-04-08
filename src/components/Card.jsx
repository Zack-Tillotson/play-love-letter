import React from 'react';

import cardBack from '../images/card-back.png';
import cardFront1 from '../images/card-front-1.png';
import cardFront2 from '../images/card-front-2.png';
import cardFront3 from '../images/card-front-3.png';
import cardFront4 from '../images/card-front-4.png';
import cardFront5 from '../images/card-front-5.png';
import cardFront6 from '../images/card-front-6.png';
import cardFront7 from '../images/card-front-7.png';
import cardFront8 from '../images/card-front-8.png';

import cardBackSq from '../images/card-back-sq.png';
import cardFrontSq1 from '../images/card-front-sq-1.png';
import cardFrontSq2 from '../images/card-front-sq-2.png';
import cardFrontSq3 from '../images/card-front-sq-3.png';
import cardFrontSq4 from '../images/card-front-sq-4.png';
import cardFrontSq5 from '../images/card-front-sq-5.png';
import cardFrontSq6 from '../images/card-front-sq-6.png';
import cardFrontSq7 from '../images/card-front-sq-7.png';
import cardFrontSq8 from '../images/card-front-sq-8.png';

const cardImg = {
  back: cardBack,
  1: cardFront1,
  2: cardFront2,
  3: cardFront3,
  4: cardFront4,
  5: cardFront5,
  6: cardFront6,
  7: cardFront7,
  8: cardFront8,
}

const sqCardImg = {
  back: cardBackSq,
  1: cardFrontSq1,
  2: cardFrontSq2,
  3: cardFrontSq3,
  4: cardFrontSq4,
  5: cardFrontSq5,
  6: cardFrontSq6,
  7: cardFrontSq7,
  8: cardFrontSq8,
}

function Card({value, isVisible, className, id, style, size, onClick = () => {}}) {

  const handleClick = () => {
    onClick(value)
  }

  const imgObj = size === 'square' ? sqCardImg : cardImg;

  const props = {
    className,
    id,
    style,
    onClick: handleClick,
    src: isVisible ? imgObj[value] : imgObj.back,
    alt: isVisible ? `Card Rank ${value}` : `Card showing back`,
  }

  return <img {...props} />

}

export default Card;