"use client";

import React from "react";
import Question from "@/components/register/Question";

interface SleepingPatternPreferencesCardProps {
  sleepingPattern: string;
  onOptionSelect: (value: string | string[]) => void;
  validationError?: string;
}

const SleepingPatternPreferencesCard: React.FC<SleepingPatternPreferencesCardProps> = ({
  sleepingPattern,
  onOptionSelect,
  validationError,
}) => {
  return (
    <div>
      <p className="pt-4 pb-4" />
      <Question
        title=""
        description="Sleeping pattern:"
        options={[
          {
            label: "< 5 hours",
            value: "<5hours",
            isSelected: sleepingPattern === "<5hours",
          },
          {
            label: "5-6 hours",
            value: "5-6 hours",
            isSelected: sleepingPattern === "5-6 hours",
          },
          {
            label: "7-8 hours",
            value: "7-8 hours",
            isSelected: sleepingPattern === "7-8 hours",
          },
          {
            label: "> 8 hours",
            value: ">8hours",
            isSelected: sleepingPattern === ">8hours",
          },
        ]}
        onOptionSelect={onOptionSelect}
        error={validationError}
        hasConfirm={false}
      />
    </div>
  );
};

export default SleepingPatternPreferencesCard;