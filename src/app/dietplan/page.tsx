"use client";
import { DailyMealPlan } from "@/models/dailyMealPlan";
import React, { useEffect, useState } from "react";


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
    <div className="flex justify-center items-center min-h-screen flex-col">
      {/* Ekrana bastırmak istemiyorsan bu kısmı boş bırakman yeterli */}
    </div>
  );
}
