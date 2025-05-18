"use client";

import * as yup from "yup";
import LabeledInput from "@/components/register/LabeledInput";
import React, { useState, useEffect } from "react";
import GridItem from "@/components/charts/GridItem";
import { SaveIcon } from "lucide-react";

export default function AccountSettingsForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/account-details", {
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
        setFirstName(result.FirstName || "");
        setLastName(result.LastName || "");
        setEmail(result.Email || "");
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchData();
  }, []);

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(30, "First name cannot exceed 30 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(30, "Last name cannot exceed 30 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email address"),
    currentPassword: yup
      .string()
      .when(["newPassword", "confirmNewPassword"], {
        is: (newPassword: string, confirmNewPassword: string) => !!newPassword || !!confirmNewPassword,
        then: (schema) =>
          schema
            .required("Current password is required to change your password")
            .min(8, "Password must be at least 8 characters"),
        otherwise: (schema) => schema.notRequired(),
      }),
    newPassword: yup
      .string()
      .notRequired()
      .min(8, "New password must be at least 8 characters")
      .max(15, "New password cannot exceed 15 characters")
      .matches(/[A-Z]/, "New password must contain at least one uppercase letter")
      .matches(/\d/, "New password must contain at least one number"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
  });

  const SaveChangesButton = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      email,
      currentPassword,
      newPassword,
    };

    try {
      const response = await fetch("http://localhost:8080/api/user/update-account-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "An error occurred");
      } else {
        alert("Account updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }

    } catch (error) {
      console.error("Failed to update account:", error);
      alert("Something went wrong while updating your account.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <GridItem title="Account Settings" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-full max-w-md">
        <form className="space-y-4 w-full" onSubmit={SaveChangesButton}>
          <LabeledInput
            label="First Name"
            id="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder={firstName}
          />
          <LabeledInput
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder={lastName}
          />
          <LabeledInput
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={email}
          />
          <LabeledInput
            label="Current Password"
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder={currentPassword}
          />
          <LabeledInput
            label="New Password"
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <LabeledInput
            label="Confirm New Password"
            id="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
          />
          <button type="submit" className="w-full py-2 px-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none flex justify-center items-center">
            <SaveIcon className="mr-2" size={16} />
            Save Changes
          </button>
        </form>
      </GridItem>
    </div>
  );
}