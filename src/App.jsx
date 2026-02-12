import "./App.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const noTexts = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Really, really sure?",
  "You’re breaking my heart 💔",
  "Think again 💭",
  "Last chance 😢",
  "Wrong option ❌",
  "Still no? 💔",
  "Maybe reconsider? 🥺",
  "Don’t do this to me 😭",
  "I’ll be very sad 😢",
  "Is that your final answer? 😳",
  "Love is waiting… 💘",
  "You can’t escape destiny ✨",
  "Say yes and I’ll smile forever 😊",
  "Last LAST chance!!! 💞",
  "Sorry, but YES is the only answer 🙅🏻",
  "This is getting awkward 😅",
  "ERROR 404 >> Button not found",
];

export default function App() {
  const [noClicks, setNoClicks] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const audioRef = useRef(null);

  const yesScale = Math.min(1 + noClicks * 0.9, 6);
  const noText = noTexts[Math.min(noClicks, noTexts.length - 1)];

  const moveNoButton = () => {
    if (noClicks >= noTexts.length - 1) return;

    const maxX = window.innerWidth / 2.5;
    const maxY = window.innerHeight / 3;

    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;

    setNoPosition({ x: randomX, y: randomY });
    setNoClicks((c) => c + 1);

    // vibrație scurtă pe mobil (dacă e suportată)
    if (navigator.vibrate) navigator.vibrate(30);
  };

  // redare muzică când spune Yes
  useEffect(() => {
    if (accepted && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [accepted]);

  if (accepted) {
    return (
      <div className="container mobile-center">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="title success"
        >
          Knew you would say YES !!! 💝
        </motion.h1>

        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTNrNDM5OGluMTF3MTJramJ3aHAyZG55ZWp4NjNpenIxNHc5d29rbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IzXiddo2twMmdmU8Lv/giphy.gif"
          alt="Celebration"
          className="celebration-gif"
        />

        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="title success"
        >
          Te iubesc !!! 🥰
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="container mobile-center">
      <h1 className="title">Will you be my Valentine? 💘</h1>

      <div className="buttons responsive-buttons">
        <motion.button
          className="btn yes"
          animate={{ scale: yesScale }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          onClick={() => setAccepted(true)}
        >
          Yes 💖
        </motion.button>

        {noClicks < noTexts.length && (
          <motion.button
            className="btn no"
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
          >
            {noText}
          </motion.button>
        )}
      </div>
    </div>
  );
}
