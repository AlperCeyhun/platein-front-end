"use client"
import { useState } from "react";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";
import { updateUser } from "../redux/userSlice";

const sleepingpatterns = () => {
    const [sleepingPattern, setSleepingPattern] = useState<string>("");;
    const router = useRouter();
    const dispatch = useDispatch();

    const handleBack = () => {
      router.push('/register/eatingstyle');
    };

    const handleOptionSelect = async (value: string) => {
      setSleepingPattern(value);
      dispatch(updateUser({ sleepingPattern:value }));
      router.push('/register/waterintake');
    };

  return (
    <div className= "flex center mt-10">
        <Question
        title="Sleeping Patterns"
        description="How would you describe how well you sleep?"
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
      onOptionSelect={handleOptionSelect} onBack={handleBack}/>
    </div>
  );
};

export default sleepingpatterns;