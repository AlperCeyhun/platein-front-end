"use client"
import { useState } from "react";
import Image from "next/image";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import DietNo from "@/assets/diet/diet-no.png";
import DietKeto from "@/assets/diet/diet-keto.png";
import DietVegan from "@/assets/diet/diet-vegan.png";
import DietVegetarian from "@/assets/diet/diet-vegetarian.png";
import DietPescatrian from "@/assets/diet/diet-pescatarian.png";
import DietOther from "@/assets/diet/diet-other.png";
import { useDispatch} from "react-redux";
import { updateUser } from "../redux/userSlice";


const eatingstyle = () => {
    const [eatingstyle, seteatingstyle] = useState<string>("");;
    const router = useRouter();
    const dispatch = useDispatch();

    const handleBack = () => {
        router.push('/register/dailymeals');
    };

    const handleOptionSelect = async (value: string) => {
        seteatingstyle(value);
        dispatch(updateUser({ eatingStyle:value }));
        router.push('/register/sleepingpatterns');
    };

  return (
    <div className= "flex center mt-10">
        <Question
        title="What's your preferred eating style?"
        description="Are you currently on a specific diet?"
        options={[
        {
            label: "I eat everything",
            value: "I eat everything",
            icon: <Image src={DietNo} alt="diet-no" className="w-10 h-10" />,
            isSelected: eatingstyle === "diet-no",
        },
        {
            label: "Keto",
            value: "Keto",
            icon: <Image src={DietKeto} alt="diet-keto" className="w-10 h-10" />,
            isSelected: eatingstyle === "diet-keto",
        },
        {
            label: "Vegan",
            value: "Vegan",
            icon: <Image src={DietVegan} alt="diet-vegan" className="w-10 h-10" />,
            isSelected: eatingstyle === "diet-vegan",
        },
        {
            label: "Vegetarian",
            value: "Vegetarian",
            icon: <Image src={DietVegetarian} alt="diet-vegetarian" className="w-10 h-10" />,
            isSelected: eatingstyle === "diet-vegetarian",
        },
        {
            label: "Pescatarian",
            value: "Pescatarian",
            icon: <Image src={DietPescatrian} alt="diet-pescatarian" className="w-10 h-10" />,
            isSelected: eatingstyle === "diet-pescatarian",
        },
        {
            label: "Other",
            value: "Other",
            icon: <Image src={DietOther} alt="diet-other" className="w-10 h-10" />,
            isSelected: eatingstyle === "diet-other",
        }
      ]}
      onOptionSelect={handleOptionSelect} onBack={handleBack}/>
    </div>
  );
};

export default eatingstyle;