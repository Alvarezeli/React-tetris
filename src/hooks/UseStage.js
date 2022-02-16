import { useState, useEffect } from "react";
import { createStage } from "../Helpers/gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    
    const sweepRows = newStage => 
            newStage.reduce((acu, row) => {
            if(row.findIndex(cell => cell[0] === 0) === -1) {
                setRowsCleared(prev => prev + 1);
                acu.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                return acu
            }
            acu.push(row);
            return acu; 
        }, [])
    

    const updateStage = (prevStage) => {
      //Primero tenemos que limpiar el escenario
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      //Bajamos el tetromino
      player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
              if( value !== 0) {
                  newStage[y + player.pos.y][x + player.pos.x] = [
                      value,
                      `${player.collided ? 'merged' : 'clear'}`, 
                  ]
              }
          })
      });

      //checkear si el el tetrominos colapso contra otro
      if(player.collided){
          resetPlayer()
          return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
