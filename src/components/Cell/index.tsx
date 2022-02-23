import type { FC } from "react";

import "./style.scss";
import cross from "../../assets/cross.svg";
import circle from "../../assets/circle.svg";
import { checkOrientation } from "../../utils/helpers";

export type CellValue = "x" | "o" | undefined;

type Props = {
  value: CellValue;
  toggle(index: number): void;
  index: number;
  drawLines: number[] | undefined;
};

const Cell: FC<Props> = ({ value, index, drawLines, toggle }) => {
  return (
    <button type="button" className="cell" onClick={() => toggle(index)}>
      <span
        className={`line ${
          drawLines && drawLines.indexOf(index) > -1
            ? checkOrientation(drawLines)
            : ""
        }`}
      />
      {value === "o" ? (
        <img src={circle} alt="circle" />
      ) : value ? (
        <img src={cross} alt="cross" />
      ) : null}
    </button>
  );
};

export default Cell;
