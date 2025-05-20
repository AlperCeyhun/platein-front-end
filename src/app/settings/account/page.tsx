"use client";

import * as yup from "yup";
import LabeledInput from "@/components/register/LabeledInput";
import React, { useState, useEffect } from "react";
import GridItem from "@/components/charts/GridItem";
import { SaveIcon,Settings2 } from "lucide-react";


export default function AccountSettingsForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const response = await fetch("http://localhost:8080/api/user/account-details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.status === "SUCCESS" && result.data) {
          setFirstName(result.data.FirstName || "");
          setLastName(result.data.LastName || "");
          setEmail(result.data.Email || "");
        } else {
          console.error("Failed to fetch account details:", result.message);
        }
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
    ...(showPasswordFields && {
      currentPassword: yup
        .string()
        .required("Current password is required to change your password")
        .min(8, "Password must be at least 8 characters"),
      newPassword: yup
        .string()
        .required("New password is required")
        .min(8, "New password must be at least 8 characters")
        .max(15, "New password cannot exceed 15 characters")
        .matches(/[A-Z]/, "New password must contain at least one uppercase letter")
        .matches(/\d/, "New password must contain at least one number"),
      confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword"), ""], "Passwords must match"),
    }),
  });

  const SaveChangesButton = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to update your account details.");
      return;
    }

    // Validate form
    try {
      await validationSchema.validate(
        {
          firstName,
          lastName,
          email,
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        { abortEarly: false }
      );
    } catch (validationError: any) {
      alert(validationError.errors?.[0] || "Validation error");
      return;
    }

    // Prepare payload
    const payload: any = {
      firstName,
      lastName,
      email,
    };
    if (showPasswordFields) {
      payload.currentPassword = currentPassword;
      payload.newPassword = newPassword;
    }

    try {
      const response = await fetch("http://localhost:8080/api/user/update-account-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
        setShowPasswordFields(false);
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
          {!showPasswordFields && (
            <button
              type="button"
              className="w-full py-2 px-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none flex justify-center items-center"
              onClick={() => setShowPasswordFields(true)}
            >
              <Settings2 className="mr-2" size={16}/>Change Password
            </button>
          )}
          {showPasswordFields && (
            <>
              <LabeledInput
                label="Current Password"
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
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
            </>
          )}
          <button type="submit" className="w-full py-2 px-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none flex justify-center items-center">
            <SaveIcon className="mr-2" size={16} />
            Save Changes
          </button>
        </form>
      </GridItem>
    </div>
  );
}