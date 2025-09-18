import { useState } from "react";
import LevelSelector from "./LevelSelector";
import AkiFinderGame from "./AkiFinderGame";

type Score = {
  level: number;
  remaining_time: number;
};

export default function AkiFinderPage() {
  const [level, setLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [latestScore, setLatestScore] = useState<Score | null>(null);

  const startGame = () => setGameStarted(true);
  const backToMenu = () => setGameStarted(false);

  const handleGameFinish = async (timeLeft: number) => {
    const score: Score = { level, remaining_time: timeLeft };

    try {
      await fetch("https://aki-app-api.onrender.com/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
    } catch (err) {
      console.error("スコア送信エラー:", err);
    }

    setLatestScore(score);
  };

  return (
    <div className="aki-finder-container">
      <h2>のぎへんの中から「秋」を探せ！</h2>

      {!gameStarted && <LevelSelector setLevel={setLevel} startGame={startGame} />}

      {gameStarted && (
        <>
          <AkiFinderGame level={level} onFinish={handleGameFinish} />
          <div style={{ marginTop: 20 }}>
            <button className="level-button" onClick={backToMenu}>戻る</button>
          </div>
        </>
      )}

      {latestScore && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
              maxHeight: "80vh",
              overflowY: "auto",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "1.5rem" }}>レベル {latestScore.level} のスコア</h3>
            <p style={{ fontSize: "1.25rem" }}>残り時間: {latestScore.remaining_time.toFixed(2)} 秒</p>

            <button
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => setLatestScore(null)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
