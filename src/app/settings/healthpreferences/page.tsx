"use client";
import { useRouter } from "next/navigation";
import React from "react";
import GridItem from "@/components/charts/GridItem";

export default function Home() {
  const router = useRouter();
  const label = "Reconfigure Health Preferences";
  const onClick = () => {
    router.push("/register/gender");
  };
  return (
    <div className="flex justify-center center">
      <GridItem title="Health Preferences" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-full max-w-md" other="mt-10">
        <p className="pt-4 pb-4">Click the button below to reconfigure your health profile.</p>
        <button
          className="w-full py-2 px-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none flex justify-center items-center"
          onClick={onClick}>
          {label}
        </button>
      </GridItem>
    </div>
  );
}