import React from "react";

type ButtonOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isSelected?: boolean;
};

type QuestionStepProps = {
  title: string;
  description: string;
  options: ButtonOption[];
  onOptionSelect: (value: string) => void;
  onBack: () => void;
};

const Question: React.FC<QuestionStepProps> = ({
  title,
  description,
  options,
  onOptionSelect,
  onBack,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto text-center bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800 focus:outline-none">
          &larr; Back
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>

      <p className="text-gray-600 mb-6">{description}</p>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button key={option.value} onClick={() => onOptionSelect(option.value)} className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all 
              ${
                option.isSelected
                  ? "border-indigo-500 bg-indigo-100"
                  : "border-gray-200 hover:border-indigo-300"
              }`}>
            {option.icon && <div className="mb-2">{option.icon}</div>}
            <span className="text-gray-800 font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
