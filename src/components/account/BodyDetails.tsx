"use client";

import React from "react";
import GridItem from "../charts/GridItem";
import { useRouter } from "next/navigation";
import EditButton from "./EditButton";
import { useBodyDetails } from "@/utils/api/useBodyDetails";

const BodyDetails = () => {
  const { body, error } = useBodyDetails();
  const router = useRouter();

  const handleClick = () => {
    router.push('/settings/healthpreferences');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!body) {
    return <div>Loading...</div>;
  }

  return (
    <GridItem bgColor="bg-white/80" hasShadow={true} size="h-192 w-96" other="p-6 backdrop-blur-md" isFlexCol={true} notCenter={true}>
      <h1 className="text-3xl font-semibold text-center mb-6">Health Preferences</h1>
      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <p className="font-semibold">Gender</p>
          <p className="text-gray-600">{body.Gender}</p>
        </div>
        <div>
          <p className="font-semibold">Age</p>
          <p className="text-gray-600">{body.Age}</p>
        </div>
        <div>
          <p className="font-semibold">Height</p>
          <p className="text-gray-600">{body.Height}</p>
        </div>
        <div>
          <p className="font-semibold">Weight</p>
          <p className="text-gray-600">{body.Weight}</p>
        </div>
        <div>
          <p className="font-semibold">Goal Weight</p>
          <p className="text-gray-600">{body.WeightGoal}</p>
        </div>
        <div>
          <p className="font-semibold">Daily Meals</p>
          <p className="text-gray-600">{body.DailyMeals}</p>
        </div>
        <div>
          <p className="font-semibold">Sleeping Pattern</p>
          <p className="text-gray-600">{body.SleepingPattern}</p>
        </div>
        <div>
          <p className="font-semibold">Daily Water Intake</p>
          <p className="text-gray-600">{body.DailyWaterIntake}</p>
        </div>
        <div>
          <p className="font-semibold">Eating Style</p>
          <p className="text-gray-600">{body.EatingStyle}</p>
        </div>
      </div>
      <div className="mt-auto pt-6 flex justify-center">
        <EditButton label="Edit Details" onClick={handleClick} />
      </div>
    </GridItem>
  );
};

export default BodyDetails;