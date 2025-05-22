import { useState, useEffect } from "react";
import SettingsHealthPreferencesSchema from "@/components/settings/SettingsHealthPreferencesSchema";
import { capitalize } from "@/utils/data/capitalize";

type ValidationError = string;

export function useHealthPreferences(body: any) {
  const [gender, setGender] = useState<string>(body?.Gender || "");
  const [age, setAge] = useState<number | string>(body?.Age || "");
  const [height, setHeight] = useState<number | string>(body?.Height || "");
  const [weight, setWeight] = useState<number | string>(body?.Weight || "");
  const [weightGoal, setWeightGoal] = useState<number | string>(body?.WeightGoal || "");
  const [dailyMeals, setDailyMeals] = useState<number | string>(body?.DailyMeals || "");
  const [eatingStyle, setEatingStyle] = useState<string>(body?.EatingStyle || "");
  const [activityLevel, setActivityLevel] = useState<number | string>(body?.ActivityLevel || "");
  const [healthConcerns, setHealthConcerns] = useState<string[]>([]);
  const [sleepingPattern, setSleepingPattern] = useState<string>(body?.SleepingPattern || "");
  const [waterIntake, setWaterIntake] = useState<number | string>(body?.DailyWaterIntake || "");
  const [validationError, setValidationError] = useState<ValidationError>("");

  const validationSchema = SettingsHealthPreferencesSchema;

  useEffect(() => {
    if (body) {
      if (body.Gender) setGender(capitalize(body.Gender.trim()));
      if (body.Age) setAge(body.Age);
      if (body.Height) setHeight(body.Height);
      if (body.Weight) setWeight(body.Weight);
      if (body.WeightGoal) setWeightGoal(body.WeightGoal);
      if (body.DailyMeals) setDailyMeals(body.DailyMeals);
      if (body.EatingStyle) setEatingStyle(capitalize(body.EatingStyle.trim()));
      if (body.ActivityLevel) setActivityLevel(body.ActivityLevel);
      if (body.SleepingPattern) setSleepingPattern(capitalize(body.SleepingPattern.trim()));
      if (body.DailyWaterIntake) setWaterIntake(body.DailyWaterIntake);
    }
  }, [body]);

  // Validation helper
  const validate = (values: any) => {
    validationSchema
      .validate(values)
      .then(() => setValidationError(""))
      .catch((err) => setValidationError(err.message));
  };

  // Handler functions
  const handleGenderSelect = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    setGender(selectedValue);
    validate({ gender: selectedValue, age });
  };

  const handleAgeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setAge(val);
    validate({ gender, age: val });
  };

  const handleHeightSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setHeight(val);
    validate({ gender, age, height: val });
  };

  const handleWeightSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setWeight(val);
    validate({ gender, age, height, weight: val });
  };

  const handleWeightGoalSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setWeightGoal(val);
    validate({ gender, age, height, weight, weightGoal: val });
  };

  const handleDailyMealsSelect = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    const val = Number(selectedValue);
    setDailyMeals(val);
    validate({ gender, age, height, weight, weightGoal, dailyMeals: val });
  };

  const handleEatingStyleSelect = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    setEatingStyle(selectedValue);
    validate({ gender, age, height, weight, weightGoal, dailyMeals, eatingStyle: selectedValue });
  };

  const handleActivityLevelSelect = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? Number(value[0]) : Number(value);
    setActivityLevel(selectedValue);
    validate({ gender, age, height, weight, weightGoal, dailyMeals, eatingStyle, activityLevel: selectedValue });
  };

  const handleHealthConcernsSelect = (selectedValues: string[]) => {
    if (selectedValues.includes("good")) {
      setHealthConcerns(["good"]);
    } else {
      setHealthConcerns(selectedValues.filter((v) => v !== "good"));
    }
    validate({ gender, age, height, weight, weightGoal, dailyMeals, eatingStyle, activityLevel, healthconcerns: selectedValues });
  };

  const handleSleepingPatternSelect = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    setSleepingPattern(selectedValue);
    validate({ sleepingPattern: selectedValue });
  };

  const handleWaterIntakeSelect = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    setWaterIntake(selectedValue);
    validate({ waterIntake: selectedValue });
  };

  return {
    gender,
    age,
    height,
    weight,
    weightGoal,
    dailyMeals,
    eatingStyle,
    activityLevel,
    healthConcerns,
    sleepingPattern,
    waterIntake,
    validationError,
    handlers: {
      handleGenderSelect,
      handleAgeSelect,
      handleHeightSelect,
      handleWeightSelect,
      handleWeightGoalSelect,
      handleDailyMealsSelect,
      handleEatingStyleSelect,
      handleActivityLevelSelect,
      handleHealthConcernsSelect,
      handleSleepingPatternSelect,
      handleWaterIntakeSelect,
    },
  };
}