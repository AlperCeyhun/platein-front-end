"use client";

import React, { useEffect, useState } from "react";
import MealItem from "@/components/meals/MealItem";
import GridItem from "@/components/charts/GridItem";

interface UserPastMeal {
  mealName: string;
  photoData: string;
  calories: number;
}

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<UserPastMeal[]>([]);
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "warning"; message: string } | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setFeedback({ type: "error", message: "No authentication token found" });
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

        // Warning if no meal uploaded today
        if (!data || data.length === 0) {
          setFeedback({
            type: "warning",
            message: "You have not uploaded a meal today."
          });
        } else {
          setFeedback(null);
        }
      }
    };

    fetchMeals();
  }, []);

  return (
    <GridItem isFlexCol={true} size="w-fit h-fit" bgColor="bg-white/80" hasShadow={true} other="backdrop-blur-sm">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold text-left mb-2">Meals</h1>
        <hr className="border-t-2 border-black mb-8" />
        {feedback && (
          <div
            className={`mt-4 p-3 rounded text-center text-sm ${
              feedback.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : feedback.type === "warning"
                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {feedback.message}
          </div>
        )}
        <ul>
          {meals.map((meal, idx) => (
            <li key={idx} className="py-1">
              <MealItem meal={meal} />
            </li>
          ))}
        </ul>
      </div>
    </GridItem>
  );
};

export default MealList;