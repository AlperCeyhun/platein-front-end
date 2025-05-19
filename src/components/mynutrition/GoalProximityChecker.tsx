import { useEffect } from "react";

interface GoalProximityCheckerProps {
  calorieData: { value: number; goalvalue: number }[]; // orderedCalorieData type
  setIsCloseToGoal: (value: boolean) => void;
}

const GoalProximityChecker = ({ calorieData, setIsCloseToGoal }: GoalProximityCheckerProps) => {
  useEffect(() => {
    if (!calorieData || calorieData.length === 0) {
      setIsCloseToGoal(false);
      return;
    }
    // Find the last day with a nonzero value
    const lastDayWithData = [...calorieData]
      .reverse()
      .find(day => typeof day.value === "number" && day.value > 0);

    if (lastDayWithData) {
      const diff = Math.abs((lastDayWithData.goalvalue ?? 0) - (lastDayWithData.value ?? 0));
      setIsCloseToGoal(diff < 300);
    } else {
      setIsCloseToGoal(false);
    }
  }, [calorieData, setIsCloseToGoal]);

  return null;
};

export default GoalProximityChecker;