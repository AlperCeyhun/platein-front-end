"use client"
import React from "react";
import TestMealDataList from "@/testdata/TestMealDataList";
import MealItem from "@/components/meals/MealItem";

const MealList = () => {
    return (
        <div className="space-y-2">
            <h1 className="text-xl">Meals</h1>
            <hr className="border-t-2 border-black" />
            {TestMealDataList.map(meal => (
                <MealItem key={meal.id} meal={meal}/>
            ))}
        </div>
    );
}

export default MealList;
