// src/components/AkiFinder/AkiFinderPage.tsx
import { useState } from "react";
import LevelSelector from "./LevelSelector";
import AkiFinderGame from "./AkiFinderGame";

export default function AkiFinderPage() {
  const [level, setLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => setGameStarted(true);
  const backToMenu = () => setGameStarted(false);

  return (
    <div className="aki-finder-container">
      <h2>のぎへんの中から「秋」を探せ！</h2>
      {!gameStarted && <LevelSelector setLevel={setLevel} startGame={startGame} />}
      {gameStarted && (
        <>
          <AkiFinderGame level={level} onFinish={() => {}} />
          <div style={{ marginTop: "20px" }}>
            <button className="level-button" onClick={backToMenu}>戻る</button>
          </div>
        </>
      )}
    </div>
  );
}
