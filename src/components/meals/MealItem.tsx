"use client"
import Image, { StaticImageData } from "next/image";
import GridItem from "../charts/GridItem";
import {FilePenLine,Trash2,FileWarning} from "lucide-react";

interface MealItemProps {
    meal: {
      id: number;
      name?: string;
      image?: StaticImageData;
    };
}
  const MealItem: React.FC<MealItemProps> = ({ meal }) => {

    const handleEdit = () =>{
      console.log("handleEdit");
    }
    const handleDelete = () =>{
      console.log("handleDelete");
    }

    return (
      <GridItem size="w-full h-[72px]" bgColor="bg-white" hasShadow={true}>
        {meal.image ? <Image src={meal.image} alt="meal1" width={32} height={32}/> : <FileWarning className="red"/>}
        {meal.name ? <h3 className="m-auto">{meal.name}</h3> : <h3 className="m-auto">NoName</h3>}
        
        <button className="mr-4 ml-96" onClick={handleEdit}>
          <FilePenLine size={24} color="blue"/>
        </button>
        <button onClick={handleDelete}>
          <Trash2 size={24} color="red" />
        </button>
      </GridItem>
    );
  };
  
  export default MealItem;
  