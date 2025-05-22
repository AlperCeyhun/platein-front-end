"use client";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useBodyDetails } from "@/utils/api/useBodyDetails";
import GenderPreferencesCard from "@/components/settings/GenderPreferencesCard";
import AgePreferencesCard from "@/components/settings/AgePreferencesCard";
import HeightPreferencesCard from "@/components/settings/HeightPreferencesCard";
import WeightPreferencesCard from "@/components/settings/WeightPreferencesCard";
import GridItem from "@/components/charts/GridItem";
import { capitalize } from "@/utils/data/capitalize";



export default function Home() {
  const router = useRouter();
  const { body, error } = useBodyDetails(); 
  const [gender, setGender] = useState<string>(body?.Gender || "");
  const [age, setAge] = useState<number | string>(body?.Age || "");
  const [height, setHeight] = useState<number | string>(body?.Height || "");
  const [weight, setWeight] = useState<number | string>(body?.Weight || "");
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    if (body) {
      if (body.Gender) setGender(capitalize(body.Gender.trim()));;
      if (body.Age) setAge(body.Age);
      if (body.Height) setHeight(body.Height);
      if (body.Weight) setWeight(body.Weight);
    }
  }, [body]);

  const validationSchema = yup.object().shape({
    gender: yup.string().required("Please select a gender"),
    age: yup
      .number()
      .required("Age is required")
      .min(13, "You must be at least 13 years old")
      .max(120, "Please enter a valid age"),
    height: yup
      .number()
      .required("Height is required")
      .min(50, "Height must be at least 50 cm")
      .max(250, "Height must not exceed 250 cm"),
    weight: yup
      .number()
      .required("Weight is required")
      .min(30, "Weight must be at least 30 kg")
      .max(200, "Weight must not exceed 200 kg"),
  });

  const handleGenderSelect = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    setGender(selectedValue);
    validationSchema
      .validate({ gender: selectedValue, age })
      .then(() => setValidationError(""))
      .catch((validationError) => setValidationError(validationError.message));
  };

  const handleAgeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
    validationSchema
      .validate({ gender, age: Number(e.target.value) })
      .then(() => setValidationError(""))
      .catch((validationError) => setValidationError(validationError.message));
  };

  const handleHeightSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  setHeight(Number(e.target.value));
  validationSchema
    .validate({ gender, age, height: Number(e.target.value) })
    .then(() => setValidationError(""))
    .catch((validationError) => setValidationError(validationError.message));
  };
  
  const handleWeightSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = Number(e.target.value);
    setWeight(newWeight);
    validationSchema
      .validate({ gender, age, height, weight: newWeight })
      .then(() => setValidationError(""))
      .catch((validationError) => setValidationError(validationError.message));
  };

  if (error) {
    return <div className="text-white text-center mt-10">
      Something went wrong. Please try again later.
      <p>Error: {error}</p>
    </div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-md">
        <GridItem title="Health Preferences" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-full max-w-md" other="mt-10">
          <GenderPreferencesCard  gender={gender} onOptionSelect={handleGenderSelect} validationError={validationError}/>
          <AgePreferencesCard     age={age}       onAgeChange={handleAgeSelect}       validationError={validationError}/>
          <HeightPreferencesCard  height={height} onHeightChange={handleHeightSelect} validationError={validationError}/>
          <WeightPreferencesCard  weight={weight} onWeightChange={handleWeightSelect} validationError={validationError}/>
          </GridItem>
      </div>
    </div>
  );
}