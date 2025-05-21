"use client";
import GridItem from "@/components/charts/GridItem";
import Question from "@/components/register/Question";
import FemaleIcon from "@/assets/gender/gender_female.png";
import MaleIcon from "@/assets/gender/gender_male.png";
import Image from "next/image";

interface GenderPreferencesCardProps {
  gender: string;
  onOptionSelect: (value: string | string[]) => void;
  validationError?: string;
}

const GenderPreferencesCard: React.FC<GenderPreferencesCardProps> = ({
  gender,
  onOptionSelect,
  validationError,
}) => (
  <GridItem
    title="Health Preferences"
    isFlexCol={true}
    hasShadow={true}
    bgColor="bg-white"
    size="w-full max-w-md"
    other="mt-10"
  >
    <p className="pt-4 pb-4">
      You can reconfigure your health preferences in this section.
    </p>
    <Question
      title=""
      description="gender:"
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
      onOptionSelect={onOptionSelect}
      error={validationError}
      hasConfirm={false}
    />
  </GridItem>
);

export default GenderPreferencesCard;