"use client";
import dynamic from "next/dynamic";;
import React, { useEffect, useState } from "react";
import GridItem from "@/components/charts/GridItem";
import LineChartRectangle from "@/components/charts/LineChartRectangle";
import PieChart from "@/components/charts/PieChart";
import TestMealDataWeekly from "@/testdata/TestMealDataWeekly";


const ShowCatGif = dynamic(() => import("@/components/mynutrition/ShowCatGif"), { ssr: false });
const ShowCatMessage = dynamic(() => import("@/components/mynutrition/ShowCatMessage"), { ssr: false });

export default function Home() {
  const [nutritionData, setNutritionData] = useState<{ name: string; value: number }[] | null>(null);
  const [calorieData, setCalorieData] = useState<{ name: string; value: number }[] | null>(null);
  const [isCloseToGoal, setIsCloseToGoal] = React.useState(false);

  useEffect(() => {
    const fetchDailyNutritionData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/my-nutrition/daily-stats", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        setNutritionData(data.nutrition);
        setCalorieData(data.weekly_calories);
                
        console.log("Nutrition Data:", data.nutrition);
        console.log("Calorie Data:", data.weekly_calories);

      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    };

    fetchDailyNutritionData();
  }, []);

  
    return (
    <div className="flex flex-col gap-10 p-12 w-full max-w-[1410px] ml-auto mr-auto">
      
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        <div className="flex-1 min-w-[60%]">
          <GridItem title="Weekly Progress" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-full h-full">
            <LineChartRectangle data={TestMealDataWeekly} dataKeys={{ firstSeries: "value", secondSeries: "goalvalue" }} />
          </GridItem>
        </div>

        <div className="w-full lg:w-[30%]">
          <GridItem bgColor="bg-white" isFlexCol={true} hasShadow={true} size="w-full h-fit">
            <ShowCatGif isCloseToGoal={isCloseToGoal} />
			      <ShowCatMessage isCloseToGoal={isCloseToGoal} />
          </GridItem>
        </div>
      </div>

      <div className="w-full">
        <GridItem title="Daily Nutrition" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-fit h-fit">
          {nutritionData ? <PieChart data={nutritionData} /> : <p>Loading...</p>}
        </GridItem>
      </div>
    </div>
    );
  }
  