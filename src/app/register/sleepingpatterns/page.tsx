"use client"
import { useState } from "react";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";

const sleepingpatterns = () => {
    const [sleepingPattern, setSleepingPattern] = useState<string>("");;
    const router = useRouter();

    const handleOptionSelect = (value: string) => {
        setSleepingPattern(value);
        console.log("Selected:", value);
        router.push('/register/waterintake');
    };

    const handleBack = () => {
        router.push('/register/healthconcern');
    };

  return (
    <div className= "flex center mt-10">
        <Question
        title="Sleeping Patterns"
        description="How would you describe how well you sleep?"
        options={[
        {
            label: "less than 5 hours",
            value: "less than 5 hours",
            isSelected: sleepingPattern === "-5hours",
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
            label: "more than 8 hours",
            value: "more than 8 hours",
            isSelected: sleepingPattern === "+8hours",
        },
      ]}
      onOptionSelect={handleOptionSelect} onBack={handleBack}/>
    </div>
  );
};

export default sleepingpatterns;