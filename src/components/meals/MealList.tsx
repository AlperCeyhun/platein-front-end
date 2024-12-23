"use client";

import React, { useState, useEffect } from "react";
import MealItem from "@/components/meals/MealItem";

interface Meal {
  MealID: number;
  MealName: string;
  Calories: number;
  Protein: number;
  Fat: number;
  Carbohydrates: number;
  MealImage: string;
}

const MealList = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/user/past-meals", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error fetching meals");
      }

      const data = await response.json();

      if (Array.isArray(data.data)) {
        setMeals(data.data);
      } else {
        setError("Invalid data format received.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-2">
      <h1 className="text-xl">Meals</h1>
      <hr className="border-t-2 border-black" />
      {meals.length > 0 ? (
        meals.map((meal) => (
          <MealItem
            key={meal.MealID}
            meal={{
              id: meal.MealID,
              name: meal.MealName,
              calories: meal.Calories,
              protein: meal.Protein,
              fat: meal.Fat,
              carbohydrates: meal.Carbohydrates,
              image: meal.MealImage,
            }}
          />
        ))
      ) : (
        <div>No meals found</div>
      )}
    </div>
  );
};

export default MealList;
