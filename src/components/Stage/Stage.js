import React from 'react'
import Cell from '../Cell/Cell.js'
import { StyledStage } from './StyledStage.js'

const Stage = ({stage}) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/> ))}
    </StyledStage>
  )
}

export default Stage