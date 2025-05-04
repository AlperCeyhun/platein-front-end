import { Meal } from "./meal";

export type DailyMealPlan = {
    id: number;
    planDate: string;
    totalCalories: number;
    totalProtein: number;
    totalFat: number;
    totalCarbohydrates: number;
    meals: Meal[];
  };