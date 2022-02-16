import React, { useState } from "react";
//components
import Stage from "../Stage/Stage";
import Display from "../Display/Display";
import StartButton from "../StartButton/StartButton";
import { createStage, checkCollision } from "../../Helpers/gameHelpers";

import { StyledTetrisWrapper, StyledTetris } from "./StyledTetris";

//Custom hooks
import { useInterval } from '../../hooks/useInterval';
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/UseStage";
import { useGameStatus } from "../../hooks/useGameStatus";


const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    //Reset everything
    setStage(createStage());
    setDropTime(1000)
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // Aumentar el nivel cuando el jugador haya limpiado 10 filas
    if(rows > (level + 1) * 10){
      setLevel(prev => prev + 1)
      //Aumentar velocidad
      setDropTime(1000 / (level + 1) + 200)
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //Cuando el juego termina
      if(player.pos.y < 1){
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true})
    }   
  };

  const keyUp = ({ keyCode }) => {
    if(!gameOver){
      if(keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200)
      }
    }
  }


  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1)
      }
    }
  };

  //Hook para que baje solito
  useInterval(() => {
    drop();
  }, dropTime)

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={(e) => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
