"use client"
import GridItem from "@/components/charts/GridItem";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import TestNutritionDataDaily from "@/testdata/TestNutritionDataDaily";
import TestMealDataWeekly from "@/testdata/TestMealDataWeekly";

export default function Home() {
  
    return (
      <div className = "flex justify-center center">
        <div className="flex items-center xl:grid-cols-3 lg:grid-cols-2 w-full max-w-[1410px] gap-10 p-12">
        <GridItem title="Weekly Progress" isFlexCol={true} hasShadow={true} bgColor="bg-white">
          <LineChart data={TestMealDataWeekly}/>
        </GridItem>
        <GridItem title="Daily Nutrition" isFlexCol={true} hasShadow={true} bgColor="bg-white">
          <PieChart data={TestNutritionDataDaily}/>
        </GridItem>
        </div>
      </div>
    );
  }
  