"use client";
import GridItem from "@/components/charts/GridItem";
import React, { useEffect, useState } from "react";
import meal4 from "@/assets/meal/meal4.png";
import Image from "next/image";
import { useWindowSize } from '@react-hook/window-size';
import dynamic from "next/dynamic";
import {toast, Toaster}  from 'react-hot-toast';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [dailyMealPlan, setDailyMealPlan] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize();
  
  const menuMessages = [
    "You can start your day with this meal",
    "A great option to power through midday",
    "Perfect for a light evening meal",
    "End your day with something nutritious"
  ];

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
        toast.success("Meal plan loaded successfully!");
      } catch (err: any) {
        toast.error("Failed to load meal plan.");
      }
    };

    fetchDailyMealPlan();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center pt-6 w-full">
      {showConfetti && <Confetti width={width} height={height} />}
      <h2 className="text-4xl font-extrabold mt-8 text-center tracking-wide mb-4">Meal Plan</h2>
      <div className="w-80 h-1 bg-indigo-600 rounded-full mb-4" />
      <p className="text-lg text-black text-center mb-6">Today's meal plan is here.</p>

      {dailyMealPlan && Array.isArray(dailyMealPlan.menus) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-6">
          {dailyMealPlan.menus.map((menu: any, menuIdx: number) => (
            <GridItem
              key={menu.id || menuIdx}
              bgColor="bg-white"
              hasShadow={true}
              size="w-full min-h-[300px]"
              other="p-6"
              isFlexCol={true}
              notCenter={true}
            >
              <h3 className="font-semibold text-lg">Menu {menuIdx + 1}</h3>
              <div className="w-60 h-0.5 bg-gray-700 rounded-md mb-4" />
              <h6 className="text-gray-500 mb-4">{menuMessages[menuIdx]}</h6>
              <ul>
                {Array.isArray(menu.meals) && menu.meals.map((meal: any, mealIdx: number) => {
                  const imageSrc = meal.defaultImage
                    ? `data:image/jpeg;base64,${meal.defaultImage}`
                    : meal4;

                  return (
                    <li key={meal.mealID || mealIdx} className="flex items-center mb-2">
                      <Image
                        src={imageSrc}
                        alt="Meal"
                        width={40}
                        height={40}
                        className="rounded mr-3"
                      />
                      <span className="font-medium mr-2">{meal.mealName}</span>
                      <span className="text-gray-500">({meal.calories} kcal)</span>
                    </li>
                  );
                })}
              </ul>
            </GridItem>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No menus available.</p>
      )}
      <Toaster position="bottom-right"/>
    </div>
  );
}