// src/components/AkiFinder/AkiFinderGame.tsx
import { useState, useEffect } from "react";
import "./AkiFinder.css";

const kanjiPool = [
  "秋", "稲","穂","稿","種","稼","稔","稽","租","科",
  "積","穏","稚","稀","稜","穫","穎","穆","秩","称",
  "稻","稷","稠","稗","稜","稟","稚","稀","稔","稠",
  "秤","稍","稷","稲","稽","稠","稠","稜","稠","穂",
  "穀","穣","穐","穎","穏","穆","稼","稔","種","稿",
  "秩","租","程","稽","稔","稠","稚","稟","稀","稜",
  "稻","稷","稠","稗","稜","稟","稚","稀","稔","穂",
  "穀","穣","穐","穎","穆","秩","租","程","稽","稿",
  "穂","積","穏","種","稚","稀","稜","稔","稼","稿",
  "穫","穎","穆","秩","租","科","稽","稲","稜","穂",
];

const fonts = ["serif", "sans-serif", "monospace", "cursive", "fantasy"];

const levelSettings: Record<number, { count: number; time: number; colorful: boolean }> = {
  1: { count: 100, time: 30, colorful: false },
  2: { count: 100, time: 30, colorful: true },
  3: { count: 100, time: 30, colorful: true },
};

type Props = {
  level: number;
  onFinish: () => void;
};

export default function AkiFinderGame({ level, onFinish }: Props) {
  const [kanjis, setKanjis] = useState<string[]>([]);
  const [styles, setStyles] = useState<React.CSSProperties[]>([]);
  const [timeLeft, setTimeLeft] = useState(levelSettings[level].time);
  const [finished, setFinished] = useState(false);

  // ゲーム初期化
  useEffect(() => {
    const { count, time } = levelSettings[level];
    const shuffled = [...kanjiPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    setKanjis(selected);
    setTimeLeft(time);
    setFinished(false);
  }, [level]);

  // レベル2・3のカラフルスタイル
  useEffect(() => {
    const { colorful } = levelSettings[level];
  
    if (colorful) {
      // レベル2・3: カラフル
      const colors = ["#e63946","#ffb703","#8ecae6","#219ebc","#023047","#06d6a0","#ef476f"];
      const bgColors = ["#f1faee","#ffe5ec","#fdfcdc","#d0f4de","#caf0f8","#fff3b0"];
      setStyles(kanjis.map((kanji) => ({
        transform: `rotate(${Math.random() * 30 - 15}deg)`,
        color: colors[Math.floor(Math.random() * colors.length)],
        backgroundColor: bgColors[Math.floor(Math.random() * bgColors.length)],
        fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
        display: "inline-block",
        cursor: "pointer",
        transition: "all 0.3s",
        animation: kanji === "秋" && level === 3 ? "shake 0.6s infinite" : "none",
      })));
    } else {
      // レベル1: 白背景、黒文字、黒枠
      setStyles(kanjis.map(() => ({
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "1px solid #000000",
        display: "inline-block",
        cursor: "pointer",
        transition: "all 0.3s",
      })));
    }
  }, [level, kanjis]);
  

  // 制限時間
  useEffect(() => {
    if (timeLeft <= 0 || finished) {
      if (!finished) onFinish();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished, onFinish]);

  // レベル3: 漢字の並び替え
  useEffect(() => {
    if (level !== 3 || finished) return;
    const shuffleInterval = setInterval(() => {
      setKanjis(prev => [...prev].sort(() => 0.5 - Math.random()));
    }, 3000);
    return () => clearInterval(shuffleInterval);
  }, [level, finished]);

  // レベル3: 背景色を変える
  useEffect(() => {
    if (level !== 3 || finished) return;
    const bgColors = ["#f1faee","#ffe5ec","#fdfcdc","#d0f4de","#caf0f8","#fff3b0"];
    const bgInterval = setInterval(() => {
      setStyles(prev =>
        prev.map((style) => ({
          ...style,
          backgroundColor: bgColors[Math.floor(Math.random() * bgColors.length)],
        }))
      );
    }, 2000);
    return () => clearInterval(bgInterval);
  }, [level, finished]);

  const handleClick = (kanji: string) => {
    if (finished) return;
    if (kanji === "秋") {
      setFinished(true);
      onFinish();
    }
  };

  return (
    <div className="kanji-grid">
      <p>制限時間: {timeLeft}s</p>
      {kanjis.map((k, i) => (
        <button
          key={i}
          onClick={() => handleClick(k)}
          style={styles[i]}
          disabled={finished || timeLeft === 0}
        >
          {k}
        </button>
      ))}
      {finished && <p>正解！ゲーム終了です。</p>}
      {timeLeft === 0 && !finished && <p>時間切れ！残念！</p>}
    </div>
  );
}
