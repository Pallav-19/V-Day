import { useState, useCallback } from "react";
import "./App.css";

// Romantic GIFs from the web
const ASSETS = {
  askGif:
    "https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif",
  yesGif:
    "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif",
};

const NO_PHRASES = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
  "Catch me if you can!",
  "Nope, I'm outta here!",
  "Still no! 😏",
  "Okay fine... try Yes 😊",
];

function getRandomPosition(): { x: number; y: number } {
  const padding = 80;
  const maxX = typeof window !== "undefined" ? window.innerWidth - 140 : 400;
  const maxY = typeof window !== "undefined" ? window.innerHeight - 60 : 400;
  return {
    x: Math.max(padding, Math.random() * maxX),
    y: Math.max(padding, Math.random() * maxY),
  };
}

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState(() => getRandomPosition());
  const [runawayMode, setRunawayMode] = useState(false);

  const runAway = useCallback(() => {
    setNoCount((c) => c + 1);
    setRunawayMode(true);
    setNoPosition(getRandomPosition());
  }, []);

  const noText = NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
  const useRunawayStyle = runawayMode && noCount > 0;

  return (
    <div className="valentine-page">
      <div className="hearts-bg" aria-hidden />

      <div className="valentine-card">
        {yesPressed ? (
          <div className="success-screen">
            <img
              src={ASSETS.yesGif}
              alt="Celebration"
              className="success-gif"
            />
            <h2 className="success-title">You made my day!</h2>
            <p className="success-subtitle">Happy Valentine&apos;s Day 💕</p>
          </div>
        ) : (
          <>
            <img
              src={ASSETS.askGif}
              alt="Will you be my Valentine?"
              className="ask-gif"
            />
            <h1 className="ask-title">Will you be my Valentine?</h1>
            <div className="buttons-wrap">
              <button
                type="button"
                className="btn-yes"
                onClick={() => setYesPressed(true)}
              >
                Yes!
              </button>
              <button
                type="button"
                className="btn-no"
                onMouseEnter={noCount >= 1 ? runAway : undefined}
                onClick={runAway}
                style={
                  useRunawayStyle
                    ? {
                        position: "fixed",
                        left: noPosition.x,
                        top: noPosition.y,
                        transform: "translate(-50%, -50%)",
                        transition: "left 0.2s ease-out, top 0.2s ease-out",
                        zIndex: 50,
                      }
                    : undefined
                }
              >
                {noText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
