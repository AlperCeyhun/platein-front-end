import React from 'react';
import AddMeal from '@/components/meals/AddMeal';
import MealList from '@/components/meals/MealList';

export default function Home() {
    return (
      <div className = "flex flex-col items-center w-full">
        <AddMeal/>
        <MealList/>
      </div>
    );
  }