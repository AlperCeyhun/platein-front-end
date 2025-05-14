"use client";
import { DailyMealPlan } from "@/models/dailyMealPlan";
import GridItem from "@/components/charts/GridItem";
import SettingsButton from "@/components/dietplan/SettingsButton";
import React, { useEffect, useState } from "react";

import { Settings,ArrowRight } from "lucide-react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [dailyMealPlan, setDailyMealPlan] = useState<DailyMealPlan | null>(null);

  useEffect(() => {
    const fetchDailyCalories = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/daily-calorie-need", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Daily Calorie Need:", data.dailyCaloriesNeeded);
      } catch (err: any) {
        console.error("Error fetching daily calorie need:", err);
        setError(err.message || "An unexpected error occurred.");
      }
    };

    fetchDailyCalories();
  }, []);

  useEffect(() => {
    const fetchDailyMealPlan = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/daily-meal-plan", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const data: DailyMealPlan = await response.json();
        console.log("Daily Meal Plan:", data);
        setDailyMealPlan(data);
      } catch (err: any) {
        console.error("Error fetching daily meal plan:", err);
      }
    };

    fetchDailyMealPlan();
  }, []);

    return (
        <div className="flex flex-row justify-center items-center pt-6 w-full">
            {/* Left Section */}
            <div className="flex flex-col items-center">
				<GridItem bgColor="bg-white" hasShadow={true} size="h-auto w-auto" other="p-4" isFlexCol={false} notCenter={true}>
					<div className="flex items-center justify-between w-full">
						<h1 className="text-3xl font-semibold">Your Diet Plan</h1>
						<ArrowRight className="ml-2" size={24} />
					</div>
				</GridItem>
                <p className="p-4"></p>
                <GridItem bgColor="bg-white" hasShadow={true} size="h-64 w-96" other="p-6" isFlexCol={true} notCenter={true}>
                    <h2 className="text-xl font-semibold mb-4">Your Diet Plan</h2>
                    <p className="text-gray-700">You can change your goal weight and other account details for different meal plans.</p>
                    <div className="mt-6">
                        <SettingsButton label="Account Settings" icon={<Settings size={18} />} />
                    </div>
                </GridItem>
            </div>

            {/* Right Section */}
            <div className="ml-8">
                <GridItem bgColor="bg-white" hasShadow={true} size="h-96 w-[600px]" other="p-6" isFlexCol={true} notCenter={true}>
                    <h2 className="text-xl font-semibold mb-4">Meal Plan</h2>
                    <p className="text-gray-700">Current meal plan with list is here.</p>
                </GridItem>
            </div>
        </div>
    );
}
