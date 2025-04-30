"use client"
import { useState } from "react";
import Image from "next/image";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import FemaleIcon from "@/assets/gender/gender_female.png";
import MaleIcon from "@/assets/gender/gender_male.png";


const Gender = () => {
    const [gender, setGender] = useState<string>("");
    const router = useRouter();

    const handleOptionSelect = (value: string | string[]) => {
        const selectedValue = Array.isArray(value) ? value[0] : value;
        setGender(selectedValue);
        console.log("Selected: ", selectedValue);
        router.push('/register/age');
    };

    const handleBack = () => {
        router.push('/register');
    };

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
      onOptionSelect={handleOptionSelect} onBack={handleBack}/>
    </div>
  );
};

export default Gender;