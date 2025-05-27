import React from 'react';
import AddMeal from '@/components/meals/AddMeal';
import MealList from '@/components/meals/MealList';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full px-4">
      <h1 className="text-4xl font-extrabold mt-8 mb-2 text-center tracking-wide text-gray-800">
        My Meals Today
      </h1>
      <div className="w-80 h-1 bg-indigo-600 rounded-full mb-4" />
      <AddMeal />
      <MealList />
    </div>
  );
}
