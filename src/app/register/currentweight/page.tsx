"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";


const currentweight = () => {
    const [currentweight, setCurrentweight] = useState(0);
    const [validationError, setError] = useState<string>("");
    const router = useRouter();
    const minWeight = 30;
    const maxWeight = 200;

    const handleBack = () => {
        router.push("/register/height");
    };

    const handleNext = () => {
      validationSchema
            .validate({ currentweight })
            .then(() => {
                setError("");
                router.push(`/register/goalweight?currentweight=${currentweight}`);
            })
            .catch((validationError) => {
                setError(validationError.message);
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentweight(Number(e.target.value));
        console.log("input: ",currentweight)
    };

    const validationSchema = yup.object().shape({
        currentweight: yup
            .number()
            .typeError("Current weight must be a number")
            .required("Current weight is required")
            .min(minWeight, `Current weight must be at least ${minWeight} kg`)
            .max(maxWeight, `Current weight must not exceed ${maxWeight} kg`),
    });
    
    return (
    <div className="flex center mt-10">
      <div className="w-full max-w-lg mx-auto text-center bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <button onClick={handleBack} className="text-gray-500 hover:text-gray-800 focus:outline-none">
            &larr; Back
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">What is your current weight?</h1>

        <p className="text-gray-600 mb-6">
            Weight is needed to determine a safe goal weight rate.
        </p>
        
        <input 
            type="number"
            className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={currentweight}
            onChange={handleInputChange}
            placeholder="I am ... years old."/>
        {validationError && <p className="text-red-500 text-sm mt-2">{validationError}</p>}
        <button 
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none mt-4"
            onClick={handleNext}>Next
        </button>  
      </div>
    </div>
    );
};

export default currentweight;