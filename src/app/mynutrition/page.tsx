"use client";
import React from "react";
import dynamic from "next/dynamic";
import GridItem from "@/components/charts/GridItem";
import LineChartRectangle from "@/components/charts/LineChartRectangle";
import PieChart from "@/components/charts/PieChart";
import TestNutritionDataDaily from "@/testdata/TestNutritionDataDaily";
import TestMealDataWeekly from "@/testdata/TestMealDataWeekly";


const ShowCatGif = dynamic(() => import("@/components/mynutrition/ShowCatGif"), { ssr: false });
const ShowCatMessage = dynamic(() => import("@/components/mynutrition/ShowCatMessage"), { ssr: false });

export default function Home() {
	const [isCloseToGoal, setIsCloseToGoal] = React.useState(false);
  return (
    <div className="flex flex-col gap-10 p-12 w-full max-w-[1410px] ml-auto mr-auto">
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        <div className="flex-1 min-w-[60%]">
          <GridItem title="Weekly Progress" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-full h-full">
            <LineChartRectangle data={TestMealDataWeekly} dataKeys={{ firstSeries: "value", secondSeries: "goalvalue" }} />
          </GridItem>
        </div>

        <div className="w-full lg:w-[30%]">
          <GridItem bgColor="bg-white" isFlexCol={true} hasShadow={true} size="w-full h-fit">
            <ShowCatGif isCloseToGoal={isCloseToGoal} />
			<ShowCatMessage isCloseToGoal={isCloseToGoal} />
          </GridItem>
        </div>
      </div>

      <div className="w-full">
        <GridItem title="Daily Nutrition" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-fit h-fit">
          <PieChart data={TestNutritionDataDaily} />
        </GridItem>
      </div>
    </div>
  );
}