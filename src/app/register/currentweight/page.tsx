"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";
import { updateUser } from "../redux/userSlice";

const currentweight = () => {
    const [currentweight, setCurrentweight] = useState(0);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleBack = () => {
        router.push("/register/height");
    };

    const handleNext = async () => {
      dispatch(updateUser({ currentweight:currentweight }));
      router.push('/register/goalweight');
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentweight(Number(e.target.value));
        console.log("input: ",currentweight)
    };

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

        <button 
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none mt-4"
            onClick={handleNext}>Next
        </button>  
      </div>
    </div>
    );
};

export default currentweight;