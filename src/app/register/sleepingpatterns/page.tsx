"use client"
import { useState } from "react";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const sleepingpatterns = () => {
    const [sleepingPattern, setSleepingPattern] = useState<string>("");
    const [validationError, setValidationError] = useState<string>("");
    const router = useRouter();

    const handleOptionSelect = (value: string | string[]) => {
        const selectedValue = Array.isArray(value) ? value[0] : value;
        setSleepingPattern(selectedValue);
        validationSchema
            .validate({ sleepingPattern: selectedValue })
            .then(() => {
                setValidationError("");
                router.push('/register/waterintake');
            })
            .catch((validationError) => {
                setValidationError(validationError.message);
            });
    };

    const handleBack = () => {
        router.push('/register/healthconcern');
    };

    const validationSchema = yup.object().shape({
        sleepingPattern: yup
            .string()
            .required("Please select an option"),
    });
  return (
    <div className= "flex center mt-10">
        <Question
        title="Sleeping Patterns"
        description="How would you describe how well you usually sleep?"
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
      onOptionSelect={handleOptionSelect} onBack={handleBack} error={validationError}/>
    </div>
  );
};

export default sleepingpatterns;