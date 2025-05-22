"use client";

import React from "react";
import Image from "next/image";
import Question from "@/components/register/Question";

import icon_good from "@/assets/healthconcern/icon_good.webp";
import icon_cholesterol from "@/assets/healthconcern/icon_cholesterol.webp";
import icon_diabetes from "@/assets/healthconcern/icon_diabetes.webp";
import icon_hypertension from "@/assets/healthconcern/icon_pressure.webp";
import icon_iron_ingot from "@/assets/healthconcern/icon_iron_ingot.webp";
import icon_bone from "@/assets/healthconcern/icon_bone.webp";

interface HealthConcernPreferencesCardProps {
  healthConcerns: string[];
  onOptionSelect: (value: string[]) => void;
  validationError?: string;
}

const HealthConcernPreferencesCard: React.FC<HealthConcernPreferencesCardProps> = ({
  healthConcerns,
  onOptionSelect,
  validationError,
}) => {
  return (
    <div>
      <p className="pt-4 pb-4" />
      <Question
        title=""
        description="medical conditions:"
        options={[
          {
            label: "I don't have any of these",
            value: "good",
            icon: <Image src={icon_good} alt="good" className="w-10 h-10" />,
            isSelected: healthConcerns.length === 1 && healthConcerns.includes("good"),
          },
          {
            label: "High cholesterol",
            value: "cholesterol",
            icon: <Image src={icon_cholesterol} alt="cholesterol" className="w-10 h-10" />,
            isSelected: healthConcerns.includes("cholesterol"),
          },
          {
            label: "Diabetes",
            value: "diabetes",
            icon: <Image src={icon_diabetes} alt="diabetes" className="w-10 h-10" />,
            isSelected: healthConcerns.includes("diabetes"),
          },
          {
            label: "Hypertension",
            value: "hypertension",
            icon: <Image src={icon_hypertension} alt="hypertension" className="w-10 h-10" />,
            isSelected: healthConcerns.includes("hypertension"),
          },
          {
            label: "Iron deficiency",
            value: "ironDeficiency",
            icon: <Image src={icon_iron_ingot} alt="ironDeficiency" className="w-10 h-10" />,
            isSelected: healthConcerns.includes("ironDeficiency"),
          },
          {
            label: "Bone resorption",
            value: "boneResorption",
            icon: <Image src={icon_bone} alt="boneResorption" className="w-10 h-10" />,
            isSelected: healthConcerns.includes("boneResorption"),
          },
        ]}
        onOptionSelect={onOptionSelect}
        isMultiSelect={true}
        error={validationError}
        hasConfirm={false}
      />
    </div>
  );
};

export default HealthConcernPreferencesCard;