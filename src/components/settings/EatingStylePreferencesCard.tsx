"use client";
import React from "react";
import Image from "next/image";
import Question from "@/components/register/Question";

import DietNo from "@/assets/diet/diet-no.png";
import DietKeto from "@/assets/diet/diet-keto.png";
import DietVegan from "@/assets/diet/diet-vegan.png";
import DietVegetarian from "@/assets/diet/diet-vegetarian.png";
import DietPescatarian from "@/assets/diet/diet-pescatarian.png";
import DietOther from "@/assets/diet/diet-other.png";

interface EatingStylePreferencesCardProps {
  eatingStyle: string;
  onOptionSelect: (value: string | string[]) => void;
  validationError?: string;
}

const EatingStylePreferencesCard: React.FC<EatingStylePreferencesCardProps> = ({
  eatingStyle,
  onOptionSelect,
  validationError,
}) => {
  return (
    <div>
      <p className="pt-4 pb-4" />
      <Question
        title=""
        description="Preferred Eating Style:"
        options={[
          {
            label: "I eat everything",
            value: "I eat everything",
            icon: <Image src={DietNo} alt="diet-no" className="w-10 h-10" />,
            isSelected: eatingStyle === "I eat everything",
          },
          {
            label: "Keto",
            value: "Keto",
            icon: <Image src={DietKeto} alt="diet-keto" className="w-10 h-10" />,
            isSelected: eatingStyle === "Keto",
          },
          {
            label: "Vegan",
            value: "Vegan",
            icon: <Image src={DietVegan} alt="diet-vegan" className="w-10 h-10" />,
            isSelected: eatingStyle === "Vegan",
          },
          {
            label: "Vegetarian",
            value: "Vegetarian",
            icon: <Image src={DietVegetarian} alt="diet-vegetarian" className="w-10 h-10" />,
            isSelected: eatingStyle === "Vegetarian",
          },
          {
            label: "Pescatarian",
            value: "Pescatarian",
            icon: <Image src={DietPescatarian} alt="diet-pescatarian" className="w-10 h-10" />,
            isSelected: eatingStyle === "Pescatarian",
          },
          {
            label: "Other",
            value: "Other",
            icon: <Image src={DietOther} alt="diet-other" className="w-10 h-10" />,
            isSelected: eatingStyle === "Other",
          },
        ]}
        onOptionSelect={onOptionSelect}
        error={validationError}
        hasConfirm={false}
      />
    </div>
  );
};

export default EatingStylePreferencesCard;