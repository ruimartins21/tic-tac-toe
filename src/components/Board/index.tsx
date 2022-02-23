import type { FC } from "react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { winningConditions } from "../../utils/helpers";

import Cell, { CellValue } from "../Cell";
import cross from "../../assets/cross.svg";
import circle from "../../assets/circle.svg";

import "./style.scss";
import { CONSTANTS } from "../../utils/constants";

export type Winner = CellValue | "tie";

type Props = {
  chosenIcon: CellValue;
  resumedGame: CellValue[];
};

const Board: FC<Props> = ({ chosenIcon, resumedGame }) => {
  const [cells, setCells] = useState<CellValue[]>(
    resumedGame.length ? resumedGame : Array(9).fill(undefined)
  );
  const [player, setPlayer] = useState(chosenIcon);

  const winningCondition = winningConditions.find((cond) => {
    const line = cond.map((cellIndex) => cells[cellIndex]);

    return line[0] && line.every((cellValue) => cellValue === line[0]);
  });

  const winningPlayer = winningCondition
    ? cells[winningCondition[0]]
    : undefined;

  const tie = cells.filter(Boolean).length === 9;

  useEffect(() => {
    if (cells.filter(Boolean).length && !winningPlayer) {
      setPlayer(player === "o" ? "x" : "o");
    }
  }, [cells]);

  const toogleCell = (index: number) => {
    if (!cells[index] && !winningPlayer && !tie) {
      const game = cells.map((c, i) => (i === index ? player : c));
      setCells(game);
      localStorage.setItem(
        CONSTANTS.STORAGE,
        JSON.stringify({ board: game, player })
      );
    }
  };

  // const onReset = () => {
  //   setCells(Array(9).fill(undefined));
  //   onGameReset();
  // };

  return (
    <>
      <div className="header">
        {!tie || winningPlayer ? (
          <h3 className={winningPlayer ? "game-status" : ""}>
            {winningPlayer ? "Winner" : "Next"} Player:
            {player === "x" ? (
              <img src={cross} alt="cross" />
            ) : (
              <img src={circle} alt="circle" />
            )}
          </h3>
        ) : (
          <h3 className="game-status">Draw!</h3>
        )}

        <hr />
      </div>
      <div className="board">
        <div className="content">
          {cells.map((cell, i) => (
            <Cell
              key={uuidv4()}
              value={cell}
              index={i}
              toggle={toogleCell}
              drawLines={winningCondition}
            />
          ))}
        </div>
      </div>
      {/* <button type="button" className="btn" onClick={() => onReset()}>
        Reset Game
      </button> */}
    </>
  );
};

export default Board;
