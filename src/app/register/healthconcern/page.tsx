"use client";
import { useState } from "react";
import Image from "next/image";
import Question from "../../../components/register/Question";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice"; // Make sure the path is correct
import { useRouter } from "next/navigation";
import icon_good from "@/assets/healthconcern/icon_good.webp";
import icon_cholesterol from "@/assets/healthconcern/icon_cholesterol.webp";
import icon_diabetes from "@/assets/healthconcern/icon_diabetes.webp";
import icon_hypertension from "@/assets/healthconcern/icon_pressure.webp";
import icon_iron_ingot from "@/assets/healthconcern/icon_iron_ingot.webp";
import icon_bone from "@/assets/healthconcern/icon_bone.webp";
import * as yup from "yup";

const HealthConcern = () => {
  const [healthconcerns, setHealthConcerns] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOptionSelect = (selectedValues: string[]) => {
    if (selectedValues.includes("good")) {
      setHealthConcerns(["good"]);
    } else {
      const filtered = selectedValues.filter((value) => value !== "good");
      setHealthConcerns(filtered);
    }
      
    // Directly use selectedValues in payload to avoid state timing issue
    const payload = {
      noHealthIssues: selectedValues.includes("good"),
      highCholesterol: selectedValues.includes("cholesterol"),
      diabetes: selectedValues.includes("diabetes"),
      hypertension: selectedValues.includes("hypertension"),
      anemia: selectedValues.includes("ironDeficiency"),
      osteoporosis: selectedValues.includes("boneResorption"),
    };
  
    validationSchema
      .validate({ healthconcerns :selectedValues })
      .then(() => {
        dispatch(updateUser(payload));
        setValidationError("");
        router.push("/register/sleepingpatterns");
      })
      .catch((validationError) => {
        setValidationError(validationError.message);
    });
  };
  

  const handleBack = () => {
    router.push("/register/activitylevel");
  };
  
  const validationSchema = yup.object().shape({
    healthconcerns: yup
      .array()
      .of(yup.string())
      .min(1, "Please select at least one option") // Ensure at least one option is selected
      .required("Please select at least one option"), // Required validation
  });
  
  return (
    <div className="flex center mt-10">
      <Question
        title="Do you have any of the following medical conditions?"
        description=""
        options={[
          {
            label: "I don't have any of these",
            value: "good",
            icon: <Image src={icon_good} alt="good" className="w-10 h-10" />,
            isSelected: healthconcerns.length === 1 && healthconcerns.includes("good"),
          },
          {
            label: "High cholesterol",
            value: "cholesterol",
            icon: <Image src={icon_cholesterol} alt="cholesterol" className="w-10 h-10" />,
            isSelected: healthconcerns.includes("cholesterol"),
          },
          {
            label: "Diabetes",
            value: "diabetes",
            icon: <Image src={icon_diabetes} alt="diabetes" className="w-10 h-10" />,
            isSelected: healthconcerns.includes("diabetes"),
          },
          {
            label: "Hypertension",
            value: "hypertension",
            icon: <Image src={icon_hypertension} alt="Hypertension" className="w-10 h-10" />,
            isSelected: healthconcerns.includes("hypertension"),
          },
          {
            label: "Iron deficiency",
            value: "ironDeficiency",
            icon: <Image src={icon_iron_ingot} alt="ironDeficiency" className="w-10 h-10" />,
            isSelected: healthconcerns.includes("ironDeficiency"),
          },
          {
            label: "Bone resorption",
            value: "boneResorption",
            icon: <Image src={icon_bone} alt="boneResorption" className="w-10 h-10" />,
            isSelected: healthconcerns.includes("boneResorption"),
          },
        ]}
        onOptionSelect={handleOptionSelect}
        onBack={handleBack}
        isMultiSelect={true}
        error={validationError}
      />
    </div>
  );
};

export default HealthConcern;
