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
            console.log("Attempting to login with email:", mail); // Debug log

            const response = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: mail,
                    password: password
                }),
            });

            console.log("Response status:", response.status); // Debug log

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful, data:", data); // Debug log

                // Token'ı localStorage'a kaydet
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userID", data.userID);
                    
                    // Sonraki istekler için Authorization header'ını ayarla
                    const token = data.token;

                    if (data.isAdmin) {
                        router.push("/admin/dashboard");
                    } else {
                        router.push("/home");
                    }
                } else {
                    setErrorMessage("No token received from server");
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("Cannot connect to the server. Please check if the server is running.");
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