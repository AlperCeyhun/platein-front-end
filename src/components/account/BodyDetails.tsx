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
        <GridItem bgColor="bg-white" hasShadow={true} size="h-96 w-96" other="justify-items-start" isFlexCol={true} notCenter={true}>
            <h1 className="text-3xl flex mb-8 justify-center">Health Preferences</h1>
            <p className="font-bold">
                 Gender: <span className="font-normal">{account.isMale ? "Male" : "Female"}</span>
            </p>
            <p className="font-bold">
                age: <span className="font-normal">{account.age}</span>
            </p>
            <p className="font-bold">
                weight: <span className="font-normal">{account.weight}</span>
            </p>
            <p className="font-bold">
                goalweight: <span className="font-normal">{account.goalweight}</span>
            </p>
            <p className="font-bold">
                dailyMeals: <span className="font-normal">{account.dailyMeals}</span>
            </p>
            <p className="font-bold">
                sleepingpattern: <span className="font-normal">{account.sleepingpattern}</span>
            </p>
            <p className="font-bold">
                dailyWaterIntake: <span className="font-normal">{account.dailyWaterIntake}</span>
            </p>
            <p className="font-bold">
                eatingStyle: <span className="font-normal">{account.eatingStyle}</span>
            </p>
            <div className="mt-auto self-center">
                <EditButton label="Edit Details" onClick={handleClick}/>
            </div>
        </GridItem>
    )
}
export default BodyDetails;