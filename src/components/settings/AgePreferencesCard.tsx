"use client";
import React from "react";
import GridItem from "@/components/charts/GridItem";

interface AgePreferencesCardProps {
  age: number | string;
  onAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationError?: string;
}

const AgePreferencesCard: React.FC<AgePreferencesCardProps> = ({
  age,
  onAgeChange,
  validationError,
}) => (
  <GridItem
    title=""
    isFlexCol={true}
    hasShadow={true}
    bgColor="bg-white"
    size="w-full max-w-md"
    other="mt-10 items-center"
  >
    <p className="text-gray-600 mb-6">age:</p>
    <input
      type="number"
      className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={age}
      onChange={onAgeChange}
      placeholder="I am ... years old."
      min={13}
      max={120}
    />
    {validationError && (
      <p className="text-red-500 text-sm mt-2">{validationError}</p>
    )}
  </GridItem>
);

export default AgePreferencesCard;