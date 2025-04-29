"use client"
import { useState } from "react";
import Image from "next/image";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import Potato from "@/assets/activitylevel/potato.png";
import icon_scale0 from "@/assets/activitylevel/icon_scale0.webp"
import icon_scale1 from "@/assets/activitylevel/icon_scale1.webp"
import icon_scale2 from "@/assets/activitylevel/icon_scale2.webp"
import icon_scale3 from "@/assets/activitylevel/icon_scale3.webp"


const activitylevel = () => {
    const [activitylevel, setactivitylevel] = useState<number>(0);
    const router = useRouter();

    const handleOptionSelect = (value: string) => {
        setactivitylevel(Number(value));
        console.log("Selected:", value);
        router.push('/register/healthconcern');
    };

    const handleBack = () => {
        router.push('/register/eatingstyle');
    };

  return (
    <div className= "flex center mt-10">
        <Question
        title="What is your current activity level?"
        description="This will help us determine how many extra calories you burn through exercise."
        options={[
        {
            label: "I'm a potato",
            value: "1.2",
            icon: <Image src={Potato} alt="potato" className="w-10 h-10" />,
            isSelected: activitylevel === 1.2,
        },
        {
            label: "I'm not that active",
            value: "1.375",
            icon: <Image src={icon_scale0} alt="scale0" className="w-10 h-10" />,
            isSelected: activitylevel === 1.375,
        },
        {
            label: "I'm active once in a while",
            value: "1.55",
            icon: <Image src={icon_scale1} alt="scale1" className="w-10 h-10" />,
            isSelected: activitylevel === 1.55,
        },
        {
            label: "I'm active most days",
            value: "1.725",
            icon: <Image src={icon_scale2} alt="scale2" className="w-10 h-10" />,
            isSelected: activitylevel === 1.725,
        },
        {
            label: "I'm an athlete",
            value: "1.9",
            icon: <Image src={icon_scale3} alt="scale3" className="w-10 h-10" />,
            isSelected: activitylevel === 1.9,
        }
      ]}
      onOptionSelect={handleOptionSelect} onBack={handleBack}/>
    </div>
  );
};

export default activitylevel;