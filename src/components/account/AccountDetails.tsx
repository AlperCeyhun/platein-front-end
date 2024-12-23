"use client"
import GridItem from "../charts/GridItem";
import {CircleUserRound} from "lucide-react";
import TestAccountData from "@/testdata/TestAccountData";
import EditButton from "./EditButton";
import { useRouter } from "next/navigation";

const AccountDetails = () =>{
    const account = TestAccountData[0];
    const router = useRouter();

    const handleClick = () =>{
        router.push('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }

    return(
        <GridItem bgColor="bg-white" hasShadow={true} size="h-96 w-96" other="justify-items-start" isFlexCol={true} notCenter={true}>
            <h1 className="text-3xl flex mb-8 justify-center">Account Details</h1>
            <div className="flex items-center space-x-2 mb-6">
                <CircleUserRound width={48} height={48}/>
                <p>{account.name}</p>
                <p>{account.surname}</p>
            </div>
            <p className="font-bold">
                 Email: <span className="font-normal">{account.email}</span>
            </p>
            <p className="font-bold">
                Password: <span className="font-normal">{account.password}</span>
            </p>
            <div className="mt-auto self-center">
                <EditButton label="Edit Account" onClick={handleClick}/>
            </div>
        </GridItem>
    )
}
export default AccountDetails;