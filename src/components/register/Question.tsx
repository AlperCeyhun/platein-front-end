import React, { useState } from "react";

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
  onOptionSelect: (selectedValues: string[]) => void;
  onBack: () => void;
  isMultiSelect?: boolean;
};

const Question: React.FC<QuestionStepProps> = ({
  title,
  description,
  options,
  onOptionSelect,
  onBack,
  isMultiSelect = false,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    options.filter((option) => option.isSelected).map((option) => option.value)
  );

  const handleOptionClick = (value: string) => {
    if (isMultiSelect) {
      if (value === "good") {
        // If "good" is selected, deselect all other options
        setSelectedValues(["good"]);
      } else {
        // If any other option is selected, remove "good" and toggle the selected value
        setSelectedValues((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev.filter((v) => v !== "good"), value]
        );
      }
    } else {
      setSelectedValues([value]);
    }
  };

  const handleConfirmSelection = () => {
    onOptionSelect(selectedValues);
  };

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
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-all 
              ${
                selectedValues.includes(option.value)
                  ? "border-indigo-500 bg-indigo-100"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
          >
            {option.icon && <div className="mb-2">{option.icon}</div>}
            <span className="text-gray-800 font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleConfirmSelection}
        className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
      >
        Confirm
      </button>
    </div>
  );
};

export default Question;
