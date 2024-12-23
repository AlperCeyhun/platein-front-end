"use client";

import React, { useState } from "react";
import LabeledInput from "@/components/register/LabeledInput";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch} from "react-redux";
import { updateUser } from "../../app/register/redux/userSlice";

export default function RegisterForm() {
  
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [id]: value,
        }));
    };

    const router = useRouter();

    const validationSchema = yup.object().shape({
    email: yup.string()
        .required("Email is required")
        .email("Must be a valid email address"),
    password: yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(15, "Password cannot should not exceed 15 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number"),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUser({ firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password }));
        router.push('/register/success');
    };
    
    return (
        <div className="max-w-md mx-auto mt-10">
        <h1 className="text-center text-2xl font-bold mb-6">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <LabeledInput
                label="Name:"
                id="firstName"
                placeholder="Your name here."
                value={formData.firstName}
                onChange={handleInputChange}
            />
            <LabeledInput
                label="Surname:"
                id="lastName"
                placeholder="Your surname here."
                value={formData.lastName}
                onChange={handleInputChange}
            />
            <LabeledInput
                label="Email:"
                id="email"
                placeholder="Your Email adress here."
                type="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <LabeledInput
                label="Password:"
                id="password"
                placeholder="Your password here"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
            />
            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >Register</button>
        </form>
        </div>
  );
}