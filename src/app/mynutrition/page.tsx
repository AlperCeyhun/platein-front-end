"use client";
import React, { useEffect, useState } from "react";
import GridItem from "@/components/charts/GridItem";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import TestMealDataWeekly from "@/testdata/TestMealDataWeekly";

export default function Home() {
  const [nutritionData, setNutritionData] = useState<{ name: string; value: number }[] | null>(null);
  const [calorieData, setCalorieData] = useState<{ name: string; value: number }[] | null>(null);

  useEffect(() => {
    const fetchDailyNutritionData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/my-nutrition/daily-stats", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        setNutritionData(data.nutrition);
        setCalorieData([{ name: "Calories", value: data.calories }]);
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    };

    fetchDailyNutritionData();
  }, []);

  return (
    <div className="flex justify-center center">
      <div className="flex items-center xl:grid-cols-3 lg:grid-cols-2 w-full max-w-[1410px] gap-10 p-12">
        <GridItem title="Weekly Progress">
          <LineChart data={TestMealDataWeekly} />
        </GridItem>

        <GridItem title="Daily Nutrition">
          {nutritionData ? <PieChart data={nutritionData} /> : <p>Loading...</p>}
        </GridItem>
      </div>
    </div>
  );
}
