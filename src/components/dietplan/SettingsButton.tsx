"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface SettingsButtonProps {
  label: string;
  icon: ReactNode;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ label, icon }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/account");
  };

  return (
    <div className="py-6">
      <button
        onClick={handleClick}
        className="flex items-center w-full py-2 px-16 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
      >
        <h1 className="font-semibold px-2">{label}</h1>
        {icon}
      </button>
    </div>
  );
};

export default SettingsButton;