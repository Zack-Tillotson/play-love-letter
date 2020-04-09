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

function Card({value, isVisible, className, id, style, onClick, onDrag, onDragEnd, ...rest}) {

  const handleClick = () => {
    onClick(value)
  }

  const handleDragStart = event => {}
  const handleDrag = event => {
    const {clientX: x, clientY: y} = event
    onDrag('drag', value, event.target, {x,y}, event)
  }
  const handleDragEnd = event => {
    onDragEnd('drag')
  }

  const handleTouchStart = event => {}
  const handleTouchMove = event => {
    const {clientX: x, clientY: y, target} = event.touches[0]
    onDrag('touchmove', value, target, {x, y}, event)
  }
  const handleTouchEnd = event => {
   onDragEnd('touchmove') 
  }

  const props = {
    className,
    id,
    style,
    onClick: handleClick,
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    src: isVisible ? cardImg[value] : cardImg.back,
    alt: isVisible ? `Card Rank ${value}` : `Card showing back`,
  }

  if(!onClick) delete props.onClick
  if(!onDrag) {
    delete props.onDragStart
    delete props.onDrag
    delete props.handleDragEnd

    delete props.onTouchStart
    delete props.onTouchMove
    delete props.onTouchEnd
  }

  return <img {...props} {...rest} />

}

export default Card;