"use client";
import React from "react";

interface WeightGoalMessageProps {
  currentWeight?: number;
  targetWeight?: number;
}

const WeightGoalMessage: React.FC<WeightGoalMessageProps> = ({ currentWeight, targetWeight }) => {
  if (currentWeight === undefined || targetWeight === undefined) {
    return <p>Loading your weight goals...</p>;
  }

  const difference = Math.abs(currentWeight - targetWeight).toFixed(1);

  if (currentWeight > targetWeight) {
    return <p className="text-red-700">You are trying to lose {difference} kg. Keep going! 🔥</p>;
  }

  if (currentWeight < targetWeight) {
    return <p className="text-green-700">You are trying to gain {difference} kg. Bulk mode on! 🍗</p>;
  }

  return <p className="text-indigo-700">You're at your target weight! 🎯 Time to maintain!</p>;
};

export default WeightGoalMessage;