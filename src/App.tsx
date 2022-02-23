import { useEffect, useState } from "react";
import "./App.scss";
import Board from "./components/Board";
import { CellValue } from "./components/Cell";
import Resume from "./components/Resume";
import Start from "./components/Start";
import { CONSTANTS } from "./utils/constants";
import { getLocalStorage } from "./utils/helpers";

type GameStatus = "start" | "game" | "resume";

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>("start");
  const [player, setPlayer] = useState<CellValue>();
  const [game, setGame] = useState<CellValue[]>();

  useEffect(() => {
    if (getLocalStorage()) {
      setGame(getLocalStorage().board);
      setPlayer(getLocalStorage().player);
      setGameStatus("resume");
    }
  }, []);

  const onReset = () => {
    setGameStatus("start");
  };

  const onResume = (option: string) => {
    if (option === "YES") {
      setGameStatus("game");
    } else {
      setGameStatus("start");
    }
  };

  const onChoosePlayer = (player: CellValue) => {
    setPlayer(player);
    setGameStatus("game");
    setGame([]);
    localStorage.removeItem(CONSTANTS.STORAGE);
  };

  return (
    <>
      <h1>Tic Tac Toe Game</h1>

      {gameStatus === "start" && (
        <Start onChooseIcon={(player) => onChoosePlayer(player)} />
      )}

      {gameStatus === "resume" && (
        <Resume onResumeGame={(value) => onResume(value)} />
      )}

      {gameStatus === "game" && (
        <div className="text-center">
          <Board
            chosenIcon={player}
            resumedGame={game!}
            onGameReset={onReset}
          />
        </div>
      )}
    </>
  );
}

export default App;
