import { useEffect, useState } from "react";
import "./App.scss";
import Board from "./components/Board";
import { CellValue } from "./components/Cell";
import { getLocalStorage } from "./utils/helpers";

type GameStatus = "start" | "game" | "resume";

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>("start");
  const [player, setPlayer] = useState<CellValue>("x");
  const [game, setGame] = useState<CellValue[]>([]);

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

  return (
    <>
      <h1>Tic Tac Toe Game</h1>

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
