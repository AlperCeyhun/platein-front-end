"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const Age = () => {
    const [age, setAge] = useState<number | string>("");
    const [validationError, setValidationError] = useState<string>("");
    const router = useRouter();

    const validationSchema = yup.object().shape({
        age: yup
            .number()
            .required("Age is required")
            .min(13, "You must be at least 13 years old")
            .max(120, "Please enter a valid age"),
    });

    const handleBack = () => {
        router.push("/register/gender");
    };

    const handleNext = () => {
        validationSchema
            .validate({ age })
            .then(() => {
                setValidationError("");
                router.push("/register/height");
            })
            .catch((validationError) => {
                setValidationError(validationError.message);
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(e.target.value);
        setValidationError("");
    };

    return (
        <div className="flex center mt-10">
            <div className="w-full max-w-lg mx-auto text-center bg-white shadow rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <button onClick={handleBack} className="text-gray-500 hover:text-gray-800 focus:outline-none">
                        &larr; Back
                    </button>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">How old are you?</h1>

                <p className="text-gray-600 mb-6">
                    We ask this to establish if certain meals are fit for you.
                </p>

                <input
                    type="number"
                    className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={age}
                    onChange={handleInputChange}
                    placeholder="I am ... years old."
                />
                {validationError && <p className="text-red-500 text-sm mt-2">{validationError}</p>}

                <button
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none mt-4"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Age;