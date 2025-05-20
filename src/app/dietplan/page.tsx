"use client";
import { DailyMealPlan } from "@/models/dailyMealPlan";
import GridItem from "@/components/charts/GridItem";
import SettingsButton from "@/components/dietplan/SettingsButton";
import React, { useEffect, useState } from "react";
import meal4 from "@/assets/meal/meal4.png";
import Image from "next/image";
import { Settings, ArrowRight } from "lucide-react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [dailyMealPlan, setDailyMealPlan] = useState<any>(null);

  useEffect(() => {
    const fetchDailyCalories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          return;
        }

        const response = await fetch("http://localhost:8080/api/user/daily-calorie-need", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
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
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          return;
        }

        const response = await fetch("http://localhost:8080/api/user/daily-meal-plan", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
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
      <div className="ml-8">
        <GridItem bgColor="bg-white" hasShadow={true} size="h-full w-full" other="p-6" isFlexCol={true} notCenter={true}>
          <h2 className="text-xl font-semibold mb-4">Meal Plan</h2>
          <p className="text-gray-700 mb-4">Today's meal plan is here.</p>
          <div className="overflow-y-auto max-h-80">
            {dailyMealPlan && Array.isArray(dailyMealPlan.menus) ? (
              dailyMealPlan.menus.map((menu: any, menuIdx: number) => (
                <div key={menu.id || menuIdx} className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Menu {menuIdx + 1}</h3>
                  <ul>
                    {Array.isArray(menu.meals) && menu.meals.map((meal: any, mealIdx: number) => {
                      const imageSrc = meal.defaultImage
                        ? `data:image/png;base64,${meal.defaultImage}`
                        : meal4;
                      return (
                        <li key={meal.mealID || mealIdx} className="flex items-center mb-2">
                          <Image src={imageSrc} alt="Meal" width={40} height={40} className="rounded mr-3" />
                          <span className="font-medium mr-2">{meal.mealName}</span>
                          <span className="text-gray-500">({meal.calories} kcal)</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No menus available.</p>
            )}
          </div>
        </GridItem>
      </div>
    </div>
  );
}