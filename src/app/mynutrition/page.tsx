"use client"
import React, { useEffect, useState } from "react";
import GridItem from "@/components/charts/GridItem";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import TestMealDataWeekly from "@/testdata/TestMealDataWeekly";

export default function Home() {
  const [nutritionData, setNutritionData] = useState(null);

  useEffect(() => {
    const fetchDailyNutritionData = async () => {
      const response = await fetch("http://localhost:5000/api/user/daily-nutrition-stats", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setNutritionData(data.data);
    };

    fetchDailyNutritionData();
  }, []);

  if (!nutritionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center center">
      <div className="flex items-center xl:grid-cols-3 lg:grid-cols-2 w-full max-w-[1410px] gap-10 p-12">
        <GridItem title="Weekly Progress">
          <LineChart data={TestMealDataWeekly} />
        </GridItem>

        <GridItem title="Daily Nutrition">
          <PieChart data={nutritionData} />
        </GridItem>
      </div>
    </div>
  );
}
