"use client"

import React, { useState, useEffect } from "react";
import GridItem from "../charts/GridItem";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import EditButton from "./EditButton";
import { apiGetRequest } from "@/utils/api/ApiGetRequest";

interface Account {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}

const AccountDetails = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          return;
        }

        const response = await fetch("http://localhost:8080/api/user/account-details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.status === "ERROR") {
          throw new Error(result.message || "Failed to fetch account details");
        }
        
        setAccount(result.data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!account) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    router.push('/settings/account');
  }

  return (
    <GridItem bgColor="bg-white" hasShadow={true} size="h-96 w-96" other="p-6" isFlexCol={true} notCenter={true}>
      <h1 className="text-3xl font-semibold text-center mb-6">Account Details</h1>
      <div className="flex items-center space-x-4 mb-6">
        <CircleUserRound width={48} height={48}/>
        <div>
          <p className="text-lg font-medium">
            {account.FirstName} {account.LastName}
          </p>
          <p className="text-sm text-gray-500">User Profile</p>
        </div>
      </div>
      <div className="space-y-3 text-sm text-gray-700">
        <div>
          <p className="font-semibold">Email</p>
          <p className="text-gray-600">{account.Email}</p>
        </div>
        <div>
          <p className="font-semibold">Password</p>
          <p className="text-gray-600">{account.Password}</p>
        </div>
      </div>
      <div className="mt-auto pt-6 flex justify-center">
        <EditButton label="Edit Account" onClick={handleClick} />
      </div>
    </GridItem>
  )
}

export default AccountDetails;
