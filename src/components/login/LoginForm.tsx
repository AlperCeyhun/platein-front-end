"use client"
import React, { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const inputClass = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 mb-2"+
                       " focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";

    const handleClick = async () => {
        setErrorMessage("");
        try {
            const response = await fetch('http://localhost:8080/api/user/auth/check-status', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: mail,
                    password: password
                }),
            });
            if (response.ok) {
                const data = await response.json();
                if(data.isAdmin){
                    router.push("/admin/dashboard");
                }else{
                    router.push("/home");
                }
            } else {
                let errorMsg = "Login failed. Please check your credentials.";
                try {
                    const errorData = await response.json();
                    if (errorData && errorData.message) errorMsg = errorData.message;
                } catch {}
                setErrorMessage(errorMsg);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An error occurred while logging in.");
        }
    };
                 
    return (
        <form>
            <div>
                <div>
                    <input type="email" value={mail}  onChange={(event) => setMail(event.target.value)} autoComplete="none" required className={`${inputClass} rounded-t-md`} placeholder="email adress"/>
                </div>
                <div>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="none" required className={`${inputClass} rounded-b-md`} placeholder="password"/>
                </div>
                {errorMessage && (
                    <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
                )}
                <div>
                    <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"type="button" onClick={handleClick}>Login</button>
                </div>
            </div>
        </form>
    )
}