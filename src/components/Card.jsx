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

function Card({value, isVisible, className, id, style, onClick}) {

  const handleClick = () => {
    onClick(value)
  }

  const props = {
    className,
    id,
    style,
    onClick: handleClick,
    src: isVisible ? cardImg[value] : cardImg.back,
    alt: isVisible ? `Card Rank ${value}` : `Card showing back`,
  }

  return <img {...props} />

}

export default Card;