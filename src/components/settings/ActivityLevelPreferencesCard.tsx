"use client";

import React from "react";
import Image from "next/image";
import Question from "@/components/register/Question";
import Potato from "@/assets/activitylevel/potato.png";
import icon_scale0 from "@/assets/activitylevel/icon_scale0.webp";
import icon_scale1 from "@/assets/activitylevel/icon_scale1.webp";
import icon_scale2 from "@/assets/activitylevel/icon_scale2.webp";
import icon_scale3 from "@/assets/activitylevel/icon_scale3.webp";

interface ActivityLevelPreferencesCardProps {
  activityLevel: number;
  onOptionSelect: (value: string | string[]) => void;
  validationError?: string;
}

const ActivityLevelPreferencesCard: React.FC<ActivityLevelPreferencesCardProps> = ({
  activityLevel,
  onOptionSelect,
  validationError,
}) => {
  return (
    <div>
      <p className="pt-4 pb-4" />
      <Question
        title=""
        description="activity level:"
        options={[
          {
            label: "I'm a potato",
            value: "1.2",
            icon: <Image src={Potato} alt="potato" className="w-10 h-10" />,
            isSelected: activityLevel === 1.2,
          },
          {
            label: "I'm not that active",
            value: "1.375",
            icon: <Image src={icon_scale0} alt="scale0" className="w-10 h-10" />,
            isSelected: activityLevel === 1.375,
          },
          {
            label: "I'm active once in a while",
            value: "1.55",
            icon: <Image src={icon_scale1} alt="scale1" className="w-10 h-10" />,
            isSelected: activityLevel === 1.55,
          },
          {
            label: "I'm active most days",
            value: "1.725",
            icon: <Image src={icon_scale2} alt="scale2" className="w-10 h-10" />,
            isSelected: activityLevel === 1.725,
          },
          {
            label: "I'm an athlete",
            value: "1.9",
            icon: <Image src={icon_scale3} alt="scale3" className="w-10 h-10" />,
            isSelected: activityLevel === 1.9,
          },
        ]}
        onOptionSelect={onOptionSelect}
        error={validationError}
        hasConfirm={false}
      />
    </div>
  );
};

export default ActivityLevelPreferencesCard;