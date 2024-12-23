"use client"

import React, { useState, useEffect } from "react";
import GridItem from "../charts/GridItem";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import EditButton from "./EditButton";
import { apiGetRequest } from "@/utils/api/ApiGetRequest";

interface Account {
  Name: string;
  Surname: string;
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
        const response = await fetch("http://localhost:5000/api/user/account-details", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
    
        setAccount(result);
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
  };

  return(
    <GridItem bgColor="bg-white" hasShadow={true} size="h-96 w-96" isFlexCol={true}>
      <h1 className="text-3xl flex mb-8 justify-center">Account Details</h1>
      <div className="flex items-center space-x-2 mb-6">
        <CircleUserRound width={48} height={48}/>
      </div>
      <p className="font-bold">
        Name: <span className="font-normal">{account.Name}</span>
      </p>
      <p className="font-bold">
        Surname: <span className="font-normal">{account.Surname}</span>
      </p>
      <p className="font-bold">
        Email: <span className="font-normal">{account.Email}</span>
      </p>
      <p className="font-bold">
        Password: <span className="font-normal">{account.Password}</span>
      </p>
      <div className="mt-auto self-center">
        <EditButton label="Edit Account" onClick={handleClick}/>
      </div>
    </GridItem>
  )
  
};

export default AccountDetails;
