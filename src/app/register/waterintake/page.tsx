"use client"
import { useState } from "react";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";

const waterintake = () => {
    const [waterintake, setWaterIntake] = useState<number>(0);;
    const router = useRouter();

    const handleOptionSelect = (value: string | string[]) => {
        const selectedValue = Array.isArray(value) ? value[0] : value;
        setWaterIntake(Number(selectedValue));
        console.log("Selected:", selectedValue);
        router.push('/home');
    };

    const handleBack = () => {
        router.push('/register/sleepingpatterns');
    };

  return (
    <div className= "flex center mt-10">
        <Question
        title="Daily Water Intake"
        description="How many glasses of water do you drink per day?"
        options={[
        {
            label: "0-4 glasses",
            value: "0-4 glasses",
            isSelected: waterintake === 4,
        },
        {
            label: "4-6 glasses",
            value: "4-6 glasses",
            isSelected: waterintake === 5,
        },
        {
            label: "6-8 glasses",
            value: "6-8 glasses",
            isSelected: waterintake === 7,
        },
        {
            label: "8+  glasses",
            value: "8+  glasses",
            isSelected: waterintake === 8,
        },
      ]}
      onOptionSelect={handleOptionSelect} onBack={handleBack}/>
    </div>
  );
};

export default waterintake;