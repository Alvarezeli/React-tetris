import React from 'react'
import { StyledCell } from './StyledCell';
import { TETROMINOS } from '../../Helpers/tetrominos';

const Cell = ({type}) => {
  return (
    <StyledCell type={type} color={TETROMINOS[type].color} shadow={TETROMINOS[type].shadow}/>
  )
}

export default React.memo(Cell);

