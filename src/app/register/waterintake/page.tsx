"use client"
import { useState } from "react";
import Question from "../../../components/register/Question";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/api/ApiRequest";
import { useDispatch, useSelector} from "react-redux";
import { updateUser } from "../redux/userSlice";
import { RootState } from "../redux/store";

const waterintake = () => {
    const [waterintake, setWaterIntake] = useState<string>("");
    const router = useRouter();
    const dispatch = useDispatch();
    const handleBack = () => {
      router.push('/register/sleepingpatterns');
    };

    const userData = useSelector((state: RootState) => state.user);

    const handleOptionSelect = async (value: string | string[]) => {
      const selectedValue = Array.isArray(value) ? value[0] : value;
      setWaterIntake(selectedValue);
      console.log("Selected:", selectedValue);

      dispatch(updateUser({ waterintake: selectedValue }));

      const updatedUserData = { ...userData, waterintake: selectedValue };
      console.log('userData:', userData);
      console.log('updatedUserData:', updatedUserData);

      try {
          await apiRequest({
              endpoint: "http://localhost:8080/api/user/register-complete",
              bodyData: updatedUserData,
              router,
              successRoute: "/home",
          });
      } catch (error) {
          console.error("API request failed:", error);
      }
  };

  return (
    <div className= "flex center mt-10">
        <Question
        title="Daily Water Intake"
        description="How many glasses of water do you drink per day?"
        options={[
        {
            label: "0-4 glasses",
            value: "0-4 glasses",
            isSelected: waterintake === "0-4 glasses",
        },
        {
            label: "4-6 glasses",
            value: "4-6 glasses",
            isSelected: waterintake === "4-6 glasses",
        },
        {
            label: "6-8 glasses",
            value: "6-8 glasses",
            isSelected: waterintake === "6-8 glasses",
        },
        {
            label: "8+ glasses",
            value: "8+ glasses",
            isSelected: waterintake === "8+ glasses",
        },
      ]}
      onOptionSelect={handleOptionSelect} onBack={handleBack}/>
    </div>
  );
};

export default waterintake;