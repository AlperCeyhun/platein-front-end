"use client";

import GridItem from "../charts/GridItem";
import { FilePenLine, Trash2, FileWarning } from "lucide-react";
import { apiRequest } from "@/utils/api/ApiRequest";
import { useRouter } from "next/navigation";

interface MealItemProps {
  meal: {
    id: number;
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    image: string;
  };
}

const MealItem: React.FC<MealItemProps> = ({ meal }) => {

  const router = useRouter();

  const handleEdit = () => {
    console.log("handleEdit");
  };

  const handleDelete = async () => {

    console.log("user trying to delete meal with ID:"+meal.id)
    
    const meal_id = { meal_id : meal.id };
    await apiRequest({
      endpoint: "http://localhost:5000/api/user/delete-meal",
      bodyData: meal_id,
      router: router,
      successRoute: "",
    });
    console.log("handleDelete");
    window.location.reload();
  };

  return (
    <GridItem size="w-full h-[180px]" bgColor="bg-white" hasShadow={true}>
      {}
      {meal.image ? (
        <img
          src={`data:image/jpeg;base64,${meal.image}`}
          alt={meal.name}
          className="w-16 h-16 object-cover mr-6"
        />
      ) : (
        <FileWarning className="text-red-500" />
      )}

      <h3 className="text-xl font-semibold mr-6">{meal.name || "NoName"}</h3>

      <div className="mt-2 space-y-1">
        <p><strong>Calories:</strong> {meal.calories} kcal</p>
        <p><strong>Protein:</strong> {meal.protein} g</p>
        <p><strong>Fat:</strong> {meal.fat} g</p>
        <p><strong>Carbohydrates:</strong> {meal.carbohydrates} g</p> 
      </div>

      <div className="flex justify-end space-x-2 mt-2">
        <button className="text-red-500 ml-24" onClick={handleDelete}>
          <Trash2 size={24}/>
        </button>
      </div>
    </GridItem>
  );
};

export default MealItem;