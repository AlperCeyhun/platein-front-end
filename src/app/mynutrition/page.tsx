"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import GridItem from "@/components/charts/GridItem";
import LineChartRectangle from "@/components/charts/LineChartRectangle";
import { orderWeeklyData } from "@/components/charts/OrderWeeklyData";
import Emptynutritiondata from "@/testdata/EmptyNutritionData";
import TestMealDataWeekly2 from "@/testdata/TestMealDataWeekly2";
import GoalProximityChecker from "@/components/mynutrition/GoalProximityChecker";


const ShowCatGif = dynamic(() => import("@/components/mynutrition/ShowCatGif"), { ssr: false });
const ShowCatMessage = dynamic(() => import("@/components/mynutrition/ShowCatMessage"), { ssr: false });
const PieChart = dynamic(() => import("@/components/charts/PieChart"), { ssr: false });

export default function Home() {
  const [nutritionData, setNutritionData] = useState<{ name: string; value: number }[] | null>(null);
  const [calorieData, setCalorieData] = useState<
    { day_of_week: string; calorie_need: number; consumed_calories: number }[] | null
  >(null);
  const [isCloseToGoal, setIsCloseToGoal] = React.useState(false);

  useEffect(() => {
    const fetchDailyNutritionData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const response = await fetch("http://localhost:8080/api/my-nutrition/daily-stats", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();

        setNutritionData(data.nutrition);

        if (data.weekly_calories && Array.isArray(data.weekly_calories) && data.weekly_calories.length > 0) {
          setCalorieData(data.weekly_calories);
        } else {
          setCalorieData(TestMealDataWeekly2);
        }

        console.log("Nutrition Data:", data.nutrition);
        console.log("Calorie Data:", data.weekly_calories);
      } catch (error) {
        console.log("Error fetching nutrition data:", error);
        setCalorieData(TestMealDataWeekly2);
      }
    };

    fetchDailyNutritionData();
  }, []);

  // Use orderWeeklyData directly on the API data
  const orderedCalorieData =
    calorieData && Array.isArray(calorieData)
      ? orderWeeklyData(calorieData)
      : [];
  return (
    <div className="flex flex-col gap-5 p-12 w-full max-w-[1410px] ml-auto mr-auto">
      <h2 className="text-4xl font-extrabold text-center tracking-wide">My Nutrition</h2>
      <div className="w-80 h-1 bg-indigo-600 rounded-full mb-4 mx-auto"/>
      <p className="text-lg text-black text-center mb-6">You can track your calorie through the day and week from here!.</p>
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        <div className="flex-1 min-w-[60%]">
          <GridItem title="Weekly Progress" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-full h-full">
            <LineChartRectangle data={orderedCalorieData} dataKeys={{ firstSeries: "value", secondSeries: "goalvalue" }} />
          </GridItem>
        </div>
        <div className="w-full lg:w-[30%]">
          <GridItem bgColor="bg-white" isFlexCol={true} hasShadow={true} size="w-full h-fit">
            <GoalProximityChecker calorieData={orderedCalorieData} setIsCloseToGoal={setIsCloseToGoal} />
            <ShowCatGif isCloseToGoal={isCloseToGoal} />
            <ShowCatMessage isCloseToGoal={isCloseToGoal} />
          </GridItem>
        </div>
      </div>
      <div className="w-full">
        <GridItem title="Daily Nutrition" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-fit h-fit">
          <PieChart data={nutritionData && nutritionData.length > 0 ? nutritionData : Emptynutritiondata} />
        </GridItem>
      </div>
    </div>
  );
}