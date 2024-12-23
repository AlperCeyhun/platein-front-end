"use client"
import { useState } from "react";
import Image from "next/image";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import Noodle1 from "@/assets/noodle/ramen-1.png";
import Noodle2 from "@/assets/noodle/ramen-2.png";
import Noodle3 from "@/assets/noodle/ramen-3.png";
import Noodle4 from "@/assets/noodle/ramen-4.png";
import { useDispatch} from "react-redux";
import { updateUser } from "../redux/userSlice";


const dailyMeals = () => {
    const [dailyMeals, setdailyMeals] = useState<string>("");;
    const router = useRouter();
    const dispatch = useDispatch();

    const handleBack = () => {
      router.push('/register/goalweight');
    };

    const handleOptionSelect = async (value: string) => {
      setdailyMeals(value);
      dispatch(updateUser({ dailyMeals:value }));
      router.push('/register/eatingstyle');
    };

  return (
    <div className= "flex center mt-10">
        <Question
        title="Daily Meals"
        description="How many meals do you eat per day?"
        options={[
        {
            label: "1",
            value: "1",
            icon: <Image src={Noodle1} alt="1meal" className="w-10 h-10" />,
            isSelected: dailyMeals === "1",
        },
        {
            label: "2",
            value: "2",
            icon: <Image src={Noodle2} alt="2meals" className="w-10 h-10" />,
            isSelected: dailyMeals === "2",
        },
        {
            label: "3",
            value: "3",
            icon: <Image src={Noodle3} alt="3meals" className="w-10 h-10" />,
            isSelected: dailyMeals === "3",
        },
        {
            label: "4+",
            value: "4+",
            icon: <Image src={Noodle4} alt="4+meals" className="w-10 h-10" />,
            isSelected: dailyMeals === "4+",
        }
      ]}
      onOptionSelect={handleOptionSelect} onBack={handleBack}/>
    </div>
  );
};

export default dailyMeals;