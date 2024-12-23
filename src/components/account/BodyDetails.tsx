"use client"

import React, { useState, useEffect } from "react";
import GridItem from "../charts/GridItem";
import { useRouter } from "next/navigation";
import EditButton from "./EditButton";
import { apiGetRequest } from "@/utils/api/ApiGetRequest";

interface Body {
    Gender: string; 
    Age: number;         
    Weight: number;      
    Height: number;
    WeightGoal: number; 
    DailyMeals: string;
    SleepingPattern: string;
    DailyWaterIntake: string;
    EatingStyle: string;
}

const BodyDetails = () =>{
    
    const [body, setBody] = useState<Body | null>(null);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

     useEffect(() => {
    
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/user/body-details", {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const result = await response.json();
        
            setBody(result);

          } catch (err) {
            console.error("Unexpected error:", err);
            setError("An unexpected error occurred.");
          }
        };
    
        fetchData();
      }, []);
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!body) {
        return <div>Loading...</div>;
      }
    
      const handleClick = () => {
      };
    

    return(
        <GridItem bgColor="bg-white" hasShadow={true} size="h-96 w-96" isFlexCol={true}>
          <h1 className="text-3xl flex mb-8 justify-center">Health Preferences</h1>
            <p className="font-bold">
                 Gender: <span className="font-normal">{body.Gender}</span>
            </p>
            <p className="font-bold">
                age: <span className="font-normal">{body.Age}</span>
            </p>
            <p className="font-bold">
                height: <span className="font-normal">{body.Height}</span>
            </p>
            <p className="font-bold">
                weight: <span className="font-normal">{body.Weight}</span>
            </p>
            <p className="font-bold">
                goalweight: <span className="font-normal">{body.WeightGoal}</span>
            </p>
            <p className="font-bold">
                dailyMeals: <span className="font-normal">{body.DailyMeals}</span>
            </p>
            <p className="font-bold">
                sleepingpattern: <span className="font-normal">{body.SleepingPattern}</span>
            </p>
            <p className="font-bold">
                dailyWaterIntake: <span className="font-normal">{body.DailyWaterIntake}</span>
            </p>
            <p className="font-bold">
                eatingStyle: <span className="font-normal">{body.EatingStyle}</span>
            </p>
            <div className="mt-auto self-center">
                <EditButton label="Edit Details" onClick={handleClick}/>
            </div>
        </GridItem>
    )
}
export default BodyDetails;