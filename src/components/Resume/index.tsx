import React, { useState } from "react";
import type { FC } from "react";

import "./style.scss";

type Props = { onResumeGame(type: string): void };

type Option = { id: number; label: string };

const options: Option[] = [
  { id: 1, label: "YES" },
  { id: 2, label: "NO" },
];

const Resume: FC<Props> = ({ onResumeGame }) => {
  const [radio, setRadio] = useState<string>();

  const onResume = () => {
    onResumeGame(radio!);
  };

  return (
    <div className="text-center">
      <h2>Do you want resume the game ?</h2>
      {options.map(({ id, label }) => (
        <label key={id} htmlFor={label}>
          <input
            id={label}
            type="radio"
            value={label}
            checked={radio === label}
            onChange={() => {
              setRadio(label);
            }}
          />
          <span>{label}</span>
        </label>
      ))}

      <div className="text-center">
        <button
          type="button"
          className={`btn ${radio ? "visible" : "invisible"}`}
          onClick={onResume}
        >
          Resume Game
        </button>
      </div>
    </div>
  );
};

export default Resume;
