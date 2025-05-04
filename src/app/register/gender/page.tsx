"use client"
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Question from "../../../components/register/Question";
import FemaleIcon from "@/assets/gender/gender_female.png";
import MaleIcon from "@/assets/gender/gender_male.png";
import { useDispatch} from "react-redux";
import { updateUser } from "../redux/userSlice";

const Gender = () => {
  const [gender, setGender] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBack = () => {
    router.push("/register");
  };

  const handleOptionSelect = async (value: string) => {
    setGender(value);
    dispatch(updateUser({ gender:value }));
    router.push('/register/age');
  };

  return (
    <div className="flex center mt-10">
      <Question
        title="Let's Create Your Body Profile"
        description="Select your gender:"
        options={[
          {
            label: "Female",
            value: "Female",
            icon: <Image src={FemaleIcon} alt="Female" className="w-10 h-10" />,
            isSelected: gender === "Female",
          },
          {
            label: "Male",
            value: "Male",
            icon: <Image src={MaleIcon} alt="Male" className="w-10 h-10" />,
            isSelected: gender === "Male",
          },
        ]}
        onOptionSelect={handleOptionSelect}
        onBack={handleBack}
      />
    </div>
  );
};

export default Gender;
