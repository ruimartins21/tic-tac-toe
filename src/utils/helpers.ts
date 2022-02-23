import { CellValue } from "../components/Cell";
import { CONSTANTS } from "./constants";

type LocalData = { board: CellValue[]; player: CellValue };

export const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Horizontal
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Vertical
  [0, 4, 8],
  [2, 4, 6], // Diagonal
];

export const checkOrientation = (winningCondition: number[]): string => {
  const index = winningConditions.indexOf(winningCondition);
  if (index <= 2) {
    return "horizontal";
  }
  if (index > 2 && index <= 5) {
    return "vertical";
  }
  if (index === 6) return "diagonal";

  return "diagonal inverse";
};

export const getLocalStorage = (): LocalData => {
  const saved = localStorage.getItem(CONSTANTS.STORAGE);
  const initialValue = JSON.parse(saved!);
  return initialValue;
};
