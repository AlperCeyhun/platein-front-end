"use client"

import AccountDetails from "@/components/account/AccountDetails";
import BodyDetails from "@/components/account/BodyDetails";

export default function Home() {
    return (
      <div className = "flex justify-center center space-x-4 mt-6">
        <AccountDetails/>
        <BodyDetails/>
      </div>
    );
  }
  