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
    <GridItem bgColor="bg-white" hasShadow={true} size="h-96 w-96" other="p-6" isFlexCol={true} notCenter={true}>
        <h1 className="text-3xl font-semibold text-center mb-6">Account Details</h1>
        <div className="flex items-center space-x-4 mb-6">
            <CircleUserRound width={48} height={48}/>
            <div>
                <p className="text-lg font-medium">
                    {account.name} {account.surname}
                </p>
                <p className="text-sm text-gray-500">User Profile</p>
            </div>
        </div>
        <div className="space-y-3 text-sm text-gray-700">
            <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">{account.email}</p>
            </div>
            <div>
                <p className="font-semibold">Password</p>
                <p className="text-gray-600">{account.password}</p>
            </div>
        </div>
        <div className="mt-auto pt-6 flex justify-center">
            <EditButton label="Edit Account" onClick={handleClick} />
        </div>
    </GridItem>)
}
export default AccountDetails;