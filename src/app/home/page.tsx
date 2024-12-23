"use client"
import {MoveRight} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();  
  const handleClick = () => {
      router.push("/mymeals");
    }
    return (
      <div className="flex justify-center items-center min-h-screen flex-col">
        <h1 className="font-bold text-3xl text-indigo-600">Welcome to PlateIn!</h1>
        <h4 className="mt-2">You can start tracking your diet progress with adding your first meal.</h4>
        <button className="flex items-center justify-center w-auto mt-12 py-2 px-12 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                onClick={handleClick}>
          <span className="mr-8">Get started</span>
          <MoveRight/>
        </button>
      </div>
    );
  }
  