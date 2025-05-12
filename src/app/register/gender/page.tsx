"use client"
import { useState } from "react";
import Image from "next/image";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import FemaleIcon from "@/assets/gender/gender_female.png";
import MaleIcon from "@/assets/gender/gender_male.png";
import * as yup from "yup";

const Gender = () => {
    const [gender, setGender] = useState<string>("");
    const router = useRouter();
    const [validationError, setValidationError] = useState<string>("");

    const handleOptionSelect = (value: string | string[]) => {
        const selectedValue = Array.isArray(value) ? value[0] : value;
        setGender(selectedValue);
        validationSchema
          .validate({ gender : selectedValue })
          .then(() => {
              setValidationError("");
              router.push("/register/age");
          })
          .catch((validationError) => {
              setValidationError(validationError.message);
        });
    };

    const handleBack = () => {
        router.push('/register');
    };

    const validationSchema = yup.object().shape({
    gender: yup
        .string()
        .required("Please select a gender"),
    });

  return (
    <div className= "flex center mt-10">
        <Question
        title="Let's Create Your Body Profile"
        description="Select your gender:"
        options={[
        {
          label: "Female",
          value: "female",
          icon: <Image src={FemaleIcon} alt="Female" className="w-10 h-10" />,
          isSelected: gender === "female",
        },
        {
          label: "Male",
          value: "male",
          icon: <Image src={MaleIcon} alt="Male" className="w-10 h-10" />,
          isSelected: gender === "male",
        }
      ]}
      onOptionSelect={handleOptionSelect} onBack={handleBack} error={validationError}/>
    </div>
  );
};

export default Gender;