"use client";
import { useState } from "react";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";

const SleepingPatterns = () => {
  const [sleepingPattern, setSleepingPattern] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("")
  const router = useRouter();
  const dispatch = useDispatch();

    const handleOptionSelect = (value: string | string[]) => {
        const selectedValue = Array.isArray(value) ? value[0] : value;
        setSleepingPattern(selectedValue);
        validationSchema
            .validate({ sleepingPattern: selectedValue })
            .then(() => {
                dispatch(updateUser({ sleepingPattern: selectedValue }));
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
    <div className="flex center mt-10">
      <Question
        title="Sleeping Patterns"
        description="How would you describe how well you usually sleep?"
        options={[
          {
            label: "-5hours",
            value: "-5hours",
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
            label: "+8hours",
            value: "+8hours",
            isSelected: sleepingPattern === "+8hours",
        },
      ]}
      onOptionSelect={handleOptionSelect} onBack={handleBack} error={validationError}/>
    </div>
  );
};

export default SleepingPatterns;
