"use client";

import * as yup from "yup";
import LabeledInput from "@/components/register/LabeledInput";
import React, { useState } from "react";
import GridItem from "@/components/charts/GridItem";
import { SaveIcon } from "lucide-react";


export default function AccountSettingsForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
    console.log("Save Changes Button Clicked");
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <GridItem title="Account Settings" isFlexCol={true} hasShadow={true} bgColor="bg-white" size="w-full max-w-md">
        <form className="space-y-4 w-full">
          <LabeledInput
            label="First Name"
            id="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <LabeledInput
            label="Last Name"
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <LabeledInput
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
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
          <button type="submit" className="w-full py-2 px-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none flex justify-center items-center" onClick={SaveChangesButton}>
            <SaveIcon className="mr-2" size={16} />
             Save Changes
          </button>
        </form>
      </GridItem>
    </div>
  );
}