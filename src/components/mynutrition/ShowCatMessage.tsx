"use client";

import React, { useEffect, useState } from "react";

interface ShowCatMessageProps {
  isCloseToGoal: boolean;
}

const ShowCatMessage: React.FC<ShowCatMessageProps> = ({ isCloseToGoal }) => {
  const [message, setMessage] = useState<string | null>(null);

    const closeToGoalMessages = [
    "Paw-some job today! 🐾",
    "Macros on point! 😺",
    "You're crushing it! 💪🐱",
    "Almost purr-fect! 🐈",
    "Solid tracking! 🎯",
    "Cat-tastic effort! 🐾"
    ];

    const farFromGoalMessages = [
    "Bit off today. Try again! 😿",
    "Refocus, food warrior! ⚔️",
    "Don't fur-get your goals! 🐾",
    "Less chaos, more nutrition math. 🐱📊",
    "You've got this tomorrow! 🌅🐾",
    "Even cats stumble. 🐈‍⬛✨"
    ];

  useEffect(() => {
    const messages = isCloseToGoal ? closeToGoalMessages : farFromGoalMessages;
    const selected = messages[Math.floor(Math.random() * messages.length)];
    setMessage(selected);
  }, [isCloseToGoal]);

  if (message === null) return null;

  return (
    <div className="text-center text-lg font-medium p-4 mt-4 rounded-xl bg-yellow-50 border border-yellow-300 shadow">
      {message}
    </div>
  );
};

export default ShowCatMessage;
