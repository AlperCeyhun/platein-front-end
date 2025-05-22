"use client";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useBodyDetails } from "@/utils/api/useBodyDetails";
import GenderPreferencesCard from "@/components/settings/GenderPreferencesCard";
import AgePreferencesCard from "@/components/settings/AgePreferencesCard";
import HeightPreferencesCard from "@/components/settings/HeightPreferencesCard";
import WeightPreferencesCard from "@/components/settings/WeightPreferencesCard";
import WeightGoalPreferencesCard from "@/components/settings/WeightGoalPreferencesCard";
import DailyMealPreferencesCard from "@/components/settings/DailyMealPreferencesCard";
import EatingStylePreferencesCard from "@/components/settings/EatingStylePreferencesCard";
import ActivityLevelPreferencesCard from "@/components/settings/ActivityLevelPreferencesCard";
import HealthConcernPreferencesCard from "@/components/settings/HealthConcernPreferencesCard";
import SleepingPatternPreferencesCard from "@/components/settings/SleepingPatternPreferencesCard";
import WaterIntakePreferencesCard from "@/components/settings/WaterIntakePreferencesCard";
import SettingsHealthPreferencesSchema from "@/components/settings/SettingsHealthPreferencesSchema";
import GridItem from "@/components/charts/GridItem";
import { useHealthPreferences } from "@/components/settings/useHealthPreferences";


export default function Home() {
  const router = useRouter();
  const { body, error } = useBodyDetails(); 
  const {
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
    handlers,
  } = useHealthPreferences(body);;

  const validationSchema = SettingsHealthPreferencesSchema;

  if (error) {
    return <div className="text-white text-center mt-10">
      Something went wrong. Please try again later.
      <p>Error: {error}</p>
    </div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-md">
        <GridItem title="Health Preferences" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-full max-w-md" other="mt-10">
          <GenderPreferencesCard  gender={gender} onOptionSelect={handlers.handleGenderSelect} validationError={validationError}/>
          <AgePreferencesCard     age={age}       onAgeChange={handlers.handleAgeSelect}       validationError={validationError}/>
          <HeightPreferencesCard  height={height} onHeightChange={handlers.handleHeightSelect} validationError={validationError}/>
          <WeightPreferencesCard  weight={weight} onWeightChange={handlers.handleWeightSelect} validationError={validationError}/>
          <WeightGoalPreferencesCard goalWeight={weightGoal}    onGoalWeightChange={handlers.handleWeightGoalSelect} validationError={validationError}/>
          <DailyMealPreferencesCard dailyMeals={Number(dailyMeals)} onOptionSelect={handlers.handleDailyMealsSelect} validationError={validationError}/>
          <EatingStylePreferencesCard eatingStyle={eatingStyle}     onOptionSelect={handlers.handleEatingStyleSelect}validationError={validationError}/>
          <ActivityLevelPreferencesCard activityLevel={Number(activityLevel)}onOptionSelect={handlers.handleActivityLevelSelect} validationError={validationError}/>
          <HealthConcernPreferencesCard healthConcerns={healthConcerns}     onOptionSelect={handlers.handleHealthConcernsSelect} validationError={validationError}/>
          <SleepingPatternPreferencesCard sleepingPattern={sleepingPattern}onOptionSelect={handlers.handleSleepingPatternSelect} validationError={validationError}/>
          <WaterIntakePreferencesCard waterIntake={Number(waterIntake)} onOptionSelect={handlers.handleWaterIntakeSelect} validationError={validationError}/>
        </GridItem>
      </div>
    </div>
  );
}