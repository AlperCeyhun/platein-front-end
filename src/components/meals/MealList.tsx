"use client";

import React, { useEffect, useState } from "react";

interface UserPastMeal {
  mealName: string;
  photoData: number[]; // byte array
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

  return null; // Render edilen hiçbir şey yok
};

export default MealList;
