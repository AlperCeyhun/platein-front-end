'use client';
import LoginForm from "../../components/login/LoginForm";
import "../globals.css";
import { useRouter } from "next/navigation";

export default function login() {

  const router = useRouter();
  
  const handleClick = () => {
    router.push('/register');
  }
  return (
    <div className="min-h-full flex items-center justify-center mt-32 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center">
              <img src="../favicon.ico"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Tabaq Diet Tracker</h2>
          </div>
          <LoginForm/>
          <p className="text-center text-sm text-gray-600">
            Have no Account?
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 px-2 hover:underline" onClick={handleClick}>Sign up here</a>
          </p>
      </div>
    </div>
  )
}