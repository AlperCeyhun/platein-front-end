"use client"
import { useState } from "react";
import Image from "next/image";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import icon_good from "@/assets/healthconcern/icon_good.webp";
import icon_cholesterol from "@/assets/healthconcern/icon_cholesterol.webp";
import icon_diabetes from "@/assets/healthconcern/icon_diabetes.webp";
import icon_hypertension from "@/assets/healthconcern/icon_pressure.webp";
import icon_iron_ingot from "@/assets/healthconcern/icon_iron_ingot.webp";
import icon_bone from "@/assets/healthconcern/icon_bone.webp";

const healthconcern = () => {
    const [healthconcern, sethealthconcern] = useState<string>("");;
    const router = useRouter();

    const handleOptionSelect = (value: string) => {
        sethealthconcern(value);
        console.log("Selected:", value);
        router.push('/register/sleepingpatterns');
    };

    const handleBack = () => {
        router.push('/register/activitylevel');
    };

  return (
    <div className= "flex center mt-10">
        <Question
        title="Do you have any of the following medical conditions?"
        description=""
        options={[
        {
            label: "I don't have any of these",
            value: "good",
            icon: <Image src={icon_good} alt="good" className="w-10 h-10" />,
            isSelected: healthconcern === "good",
        },
        {
            label: "High cholesterol",
            value: "cholesterol",
            icon: <Image src={icon_cholesterol} alt="cholesterol" className="w-10 h-10" />,
            isSelected: healthconcern === "cholesterol",
        },
        {
            label: "Diabetes",
            value: "diabetes",
            icon: <Image src={icon_diabetes} alt="diabetes" className="w-10 h-10" />,
            isSelected: healthconcern === "diabetes",
        },
        {
            label: "Hypertension",
            value: "hypertension",
            icon: <Image src={icon_hypertension} alt="Hypertension" className="w-10 h-10" />,
            isSelected: healthconcern === "Hypertension",
        },
        {
            label: "Iron deficiency",
            value: "ironDeficiency",
            icon: <Image src={icon_iron_ingot} alt="ironDeficiency" className="w-10 h-10" />,
            isSelected: healthconcern === "ironDeficiency",
        },
        {
            label: "Bone resorption",
            value: "boneResorption",
            icon: <Image src={icon_bone} alt="boneResorption" className="w-10 h-10" />,
            isSelected: healthconcern === "boneResorption",
        }
        
      ]}
      onOptionSelect={handleOptionSelect} onBack={handleBack}/>
    </div>
  );
};

export default healthconcern;