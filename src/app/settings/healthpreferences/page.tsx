"use client";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useBodyDetails } from "@/utils/api/useBodyDetails";
import GenderPreferencesCard from "@/components/settings/GenderPreferencesCard";
import AgePreferencesCard from "@/components/settings/AgePreferencesCard";
import GridItem from "@/components/charts/GridItem";

export default function Home() {
  const router = useRouter();
  const { body, error } = useBodyDetails();
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<number | string>("");
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    if (body) {
      if (body.Gender) setGender(body.Gender);
      if (body.Age) setAge(body.Age);
    }
  }, [body]);

  const validationSchema = yup.object().shape({
    gender: yup.string().required("Please select a gender"),
    age: yup
      .number()
      .required("Age is required")
      .min(13, "You must be at least 13 years old")
      .max(120, "Please enter a valid age"),
  });

  const handleOptionSelect = (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    setGender(selectedValue);
    validationSchema
      .validate({ gender: selectedValue, age })
      .then(() => setValidationError(""))
      .catch((validationError) => setValidationError(validationError.message));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
    validationSchema
      .validate({ gender, age: Number(e.target.value) })
      .then(() => setValidationError(""))
      .catch((validationError) => setValidationError(validationError.message));
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-md">
        <GridItem title="Health Preferences" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-full max-w-md" other="mt-10">
          <GenderPreferencesCard
            gender={gender}
            onOptionSelect={handleOptionSelect}
            validationError={validationError}/>
          <AgePreferencesCard
            age={age}
            onAgeChange={handleAgeChange}
            validationError={validationError}/>
          </GridItem>
      </div>
    </div>
  );
}