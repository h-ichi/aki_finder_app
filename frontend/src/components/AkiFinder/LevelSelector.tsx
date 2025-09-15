// src/components/AkiFinder/LevelSelector.tsx
import React from "react";

interface LevelSelectorProps {
  setLevel: (lv: number) => void;
  startGame: () => void;
}

export default function LevelSelector({ setLevel, startGame }: LevelSelectorProps) {
  return (
    <div>
      <p>レベルを選んでください</p>
      {[1, 2, 3].map((lv) => (
        <button
          key={lv}
          className="level-button"
          onClick={() => {
            setLevel(lv);
            startGame();
          }}
        >
          レベル{lv}
        </button>
      ))}
    </div>
  );
}
