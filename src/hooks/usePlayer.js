import { useCallback, useState } from "react";
import { checkCollision, STAGE_WIDTH } from "../Helpers/gameHelpers";
import { TETROMINOS, randomTetromino } from "../Helpers/tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    //Hacer que los filas se conviertan
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    //Revertir cada cuadrado para tener una matrix rotada
    if(dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse()
  };

  const playerRotate = (stage, dir) => {
      const clonedPlayed = JSON.parse(JSON.stringify(player));
      clonedPlayed.tetromino = rotate(clonedPlayed.tetromino, dir)

      const pos =  clonedPlayed.pos.x;
      let offset = 1;
      while(checkCollision(clonedPlayed, stage, { x:0, y:0 })) {
          clonedPlayed.pos.x += offset;
          offset = -(offset + (offset > 0 ? 1 : -1))
          if(offset > clonedPlayed.tetromino[0].length){
              rotate(clonedPlayed.tetromino, -dir);
              clonedPlayed.pos.x = pos;
              return
          }
      }

      setPlayer(clonedPlayed)
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
