import React from 'react'
import cn from 'classnames'

import imgPersona1 from '../../images/persona-1.png'

import './persona.scss'

function Persona({name, score, status = 'playing', maxScore = 3, className}) {
  return (
    <div className={cn('persona', className)}>
      <img className="persona__image" src={imgPersona1} />
      <div className="persona__name">
        {name}
      </div>
      <div className="persona__score">
        {new Array(score).fill(0).map(_ => (
          <span className="persona__scored--filled">❤</span>
        ))}
        {new Array(maxScore - score).fill(0).map(_ => (
          <span className="persona__scored--empty">❤</span>
        ))}

      </div>
    </div>
  )
}

export default Persona