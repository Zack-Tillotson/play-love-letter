import React from 'react'
import cn from 'classnames'

import './persona.scss'

function Persona({name, score, color, status = 'playing', maxScore = 3, isMini, isTargettable, isTargetted, className}) {

  const divClassName = cn(
      'persona', 
      className, 
      {
        'persona--mini': isMini,
        'persona--targettable': isTargettable && !isMini, 
        'persona--targetted': isTargetted && !isMini
      })

  return (
    <div className={divClassName} data-target={'' + !!isTargettable} style={{backgroundColor: color}}>
      <div className="persona__name">
        {name}
      </div>
      {!isMini && (
        <div className="persona__score">
          {new Array(score).fill(0).map((_, index) => (
            <span className="persona__scored--filled" key={index}>❤</span>
          ))}
          {new Array(maxScore - score).fill(0).map((_, index) => (
            <span className="persona__scored--empty" key={index}>❤</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default Persona