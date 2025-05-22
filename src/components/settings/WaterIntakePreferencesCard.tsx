"use client";

import React from "react";
import Question from "@/components/register/Question";

interface WaterIntakePreferencesCardProps {
  waterIntake: number;
  onOptionSelect: (value: string | string[]) => void;
  validationError?: string;
}

const WaterIntakePreferencesCard: React.FC<WaterIntakePreferencesCardProps> = ({
  waterIntake,
  onOptionSelect,
  validationError,
}) => {
  return (
    <div>
      <p className="pt-4 pb-4" />
      <Question
        title="Daily Water Intake"
        description="How many glasses of water do you drink per day?"
        options={[
          {
            label: "0-4 glasses",
            value: "4",
            isSelected: waterIntake === 4,
          },
          {
            label: "4-6 glasses",
            value: "5",
            isSelected: waterIntake === 5,
          },
          {
            label: "6-8 glasses",
            value: "7",
            isSelected: waterIntake === 7,
          },
          {
            label: "8+ glasses",
            value: "8",
            isSelected: waterIntake === 8,
          },
        ]}
        onOptionSelect={onOptionSelect}
        error={validationError}
        hasConfirm={false}
      />
    </div>
  );
};

export default WaterIntakePreferencesCard;