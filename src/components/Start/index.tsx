import React, { useState } from "react";
import type { FC } from "react";
import { CellValue } from "../Cell";

import "./style.scss";
import cross from "../../assets/cross.svg";
import circle from "../../assets/circle.svg";

type Props = { onChooseIcon(type: CellValue): void };

type Option = { id: number; name: CellValue; image: string };

const options: Option[] = [
  { id: 1, name: "o", image: circle },
  { id: 2, name: "x", image: cross },
];

const Start: FC<Props> = ({ onChooseIcon }) => {
  const [radio, setRadio] = useState<CellValue>();

  const onStartGame = () => {
    onChooseIcon(radio);
  };

  return (
    <div className="text-center">
      <h2>Choose your player</h2>
      {options.map(({ id, name, image }) => (
        <label key={id} htmlFor={name}>
          <input
            id={name}
            type="radio"
            value={name}
            checked={radio === name}
            onChange={() => {
              setRadio(name);
            }}
          />
          <img src={image} alt={name} />
        </label>
      ))}

      <div className="text-center">
        <button
          type="button"
          className={`btn ${radio ? "visible" : "invisible"}`}
          onClick={onStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Start;
