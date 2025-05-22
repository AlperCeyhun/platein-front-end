"use client";
import Question from "@/components/register/Question";
import Image from "next/image";
import Noodle1 from "@/assets/noodle/ramen-1.png";
import Noodle2 from "@/assets/noodle/ramen-2.png";
import Noodle3 from "@/assets/noodle/ramen-3.png";
import Noodle4 from "@/assets/noodle/ramen-4.png";

interface DailyMealPreferencesCardProps {
  dailyMeals: number;
  onOptionSelect: (value: string | string[]) => void;
  validationError?: string;
}

const DailyMealPreferencesCard: React.FC<DailyMealPreferencesCardProps> = ({
  dailyMeals,
  onOptionSelect,
  validationError,
}) => (
  <div>
    <p className="pt-4 pb-4"/>
    <Question
      title=""
      description="Daily meal amount:"
      options={[
        {
          label: "1",
          value: "1",
          icon: <Image src={Noodle1} alt="1 meal" className="w-10 h-10" />,
          isSelected: dailyMeals === 1,
        },
        {
          label: "2",
          value: "2",
          icon: <Image src={Noodle2} alt="2 meals" className="w-10 h-10" />,
          isSelected: dailyMeals === 2,
        },
        {
          label: "3",
          value: "3",
          icon: <Image src={Noodle3} alt="3 meals" className="w-10 h-10" />,
          isSelected: dailyMeals === 3,
        },
        {
          label: "4+",
          value: "4",
          icon: <Image src={Noodle4} alt="4+ meals" className="w-10 h-10" />,
          isSelected: dailyMeals === 4,
        },
      ]}
      onOptionSelect={onOptionSelect}
      error={validationError}
      hasConfirm={false}
    />
  </div>
);

export default DailyMealPreferencesCard;