"use client";

import GridItem from "../charts/GridItem";
import { FileWarning, Trash2 } from "lucide-react";

interface MealItemProps {
  meal: {
    mealName: string;
    photoData: string;
    calories: number;
  };
}

const MAX_NAME_WIDTH = "w-[260px]";

const MealItem: React.FC<MealItemProps> = ({ meal }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const response = await fetch("http://localhost:8080/api/user/delete-meal", {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mealName: meal.mealName })
    });

    if (response.ok) {
      console.log("Meal deleted successfully");
    } else {
      console.log("Failed to delete meal");
    }
  };

  return (
    <GridItem size="w-fit h-fit" bgColor="bg-white" hasShadow={true}>
      <div className="flex items-center">
        {meal.photoData ? (
          <img
            src={`data:image/jpeg;base64,${meal.photoData}`}
            alt={meal.mealName}
            className="w-16 h-16 object-cover mr-6"
          />
        ) : (
          <FileWarning className="text-red-500 mr-6" />
        )}

        <div className={`${MAX_NAME_WIDTH} flex flex-col`}>
          <h3
            className="text-xl font-semibold flex items-center truncate"
            title={meal.mealName}
          >
            {meal.mealName || "No Name"}
          </h3>
          <span className="text-gray-600 text-base">{meal.calories} kcal</span>
        </div>
        <div className="flex justify-end space-x-2 mt-2">
          <button className="text-red-500 ml-24" onClick={handleDelete}>
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </GridItem>
  );
};

export default MealItem;