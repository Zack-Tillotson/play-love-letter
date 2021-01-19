import React from 'react'
import cn from 'classnames'

import './persona.scss'

function Persona({name, score, status = 'playing', maxScore = 3, isTargettable, isTargetted, className}) {

  const dragEnterHandler = event => {
  }

  const dragExitHandler = event => {
  }

  const divClassName = cn('persona', className, {'persona--targettable': isTargettable, 'persona--targetted': isTargetted})

  return (
    <div className={divClassName} onDragEnter={dragEnterHandler} onDragExit={dragExitHandler} data-target={'' + !!isTargettable}>
      <div className="persona__name">
        {name}
      </div>
      <div className="persona__score">
        {new Array(score).fill(0).map((_, index) => (
          <span className="persona__scored--filled" key={index}>❤</span>
        ))}
        {new Array(maxScore - score).fill(0).map((_, index) => (
          <span className="persona__scored--empty" key={index}>❤</span>
        ))}
      </div>
    </div>
  )
}

export default Persona