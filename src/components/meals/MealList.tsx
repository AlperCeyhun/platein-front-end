"use client";

import React, { useEffect, useState } from "react";
import MealItem from "@/components/meals/MealItem";

interface UserPastMeal {
  mealName: string;
  photoData: string;
  calories: number;
}

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<UserPastMeal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const response = await fetch("http://localhost:8080/api/user/past-meals", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data: UserPastMeal[] = await response.json();
        setMeals(data);
        console.log(data);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold text-left mb-2">Meals</h1>
        <hr className="border-t-2 border-black mb-8" />
        <ul>
          {meals.map((meal, idx) => (
            <li key={idx} className="py-1">
              <MealItem meal={meal} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealList;