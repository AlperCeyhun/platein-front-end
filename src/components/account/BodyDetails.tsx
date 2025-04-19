"use client"
import GridItem from "../charts/GridItem";
import TestAccountData from "@/testdata/TestAccountData";
import EditButton from "./EditButton";
import { useRouter } from "next/navigation";

const BodyDetails = () =>{
    const account = TestAccountData[0];
    const router = useRouter();

    const handleClick = () =>{
        router.push('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }

    return(
    <GridItem bgColor="bg-white" hasShadow={true} size="h-192 w-96" other="p-6" isFlexCol={true} notCenter={true}>
        <h1 className="text-3xl font-semibold text-center mb-6">Health Preferences</h1>
        <div className="space-y-3 text-sm text-gray-700">
            <div>
                <p className="font-semibold">Gender</p>
                <p className="text-gray-600">{account.isMale ? "Male" : "Female"}</p>
            </div>
            <div>
                <p className="font-semibold">Age</p>
                <p className="text-gray-600">{account.age}</p>
            </div>
            <div>
                <p className="font-semibold">Weight</p>
                <p className="text-gray-600">{account.weight}</p>
            </div>
            <div>
                <p className="font-semibold">Goal Weight</p>
                <p className="text-gray-600">{account.goalweight}</p>
            </div>
            <div>
                <p className="font-semibold">Daily Meals</p>
                <p className="text-gray-600">{account.dailyMeals}</p>
            </div>
            <div>
                <p className="font-semibold">Sleeping Pattern</p>
                <p className="text-gray-600">{account.sleepingpattern}</p>
            </div>
            <div>
                <p className="font-semibold">Daily Water Intake</p>
                <p className="text-gray-600">{account.dailyWaterIntake}</p>
            </div>
            <div>
                <p className="font-semibold">Eating Style</p>
                <p className="text-gray-600">{account.eatingStyle}</p>
            </div>
        </div>
        <div className="mt-auto pt-6 flex justify-center">
            <EditButton label="Edit Details" onClick={handleClick} />
        </div>
    </GridItem>)
}
export default BodyDetails;