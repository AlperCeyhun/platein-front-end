"use client";

import { useBodyDetails } from "@/utils/api/useBodyDetails";
import React, { useEffect, useState } from "react";

export default function HealthPreferencesPage() {
 const { body, error } = useBodyDetails();

  const [formData, setFormData] = useState({
    gender: "",
    age: 0,
    height: 0,
    weight: 0,
    goalWeight: 0,
    dailyMeals: "",
    eatingStyle: "",
    activityLevel: 0,
    healthConcerns: [] as string[],
    sleepingPattern: "",
    waterIntake: "",
  });

useEffect(() => {
  if (body) {
    // Map health concerns to string array
    const mappedHealthConcerns: string[] = [];
    if (body.NoHealthIssues) mappedHealthConcerns.push("good");
    if (body.HighCholesterol) mappedHealthConcerns.push("cholesterol");
    if (body.Diabetes) mappedHealthConcerns.push("diabetes");
    if (body.Hypertension) mappedHealthConcerns.push("hypertension");
    if (body.Anemia) mappedHealthConcerns.push("ironDeficiency");
    if (body.Osteoporosis) mappedHealthConcerns.push("boneResorption");

    // Map daily meals (string from API -> string for dropdown)
    const dailyMealsNumber = Number(body.DailyMeals);
    const dailyMealsValue = dailyMealsNumber >= 4 ? "4+" : body.DailyMeals;

    // Map daily water intake to dropdown ranges
    const dailyWaterIntakeNumber = Number(body.DailyWaterIntake);
    let waterIntakeValue = "0-4";
    if (dailyWaterIntakeNumber >= 8) waterIntakeValue = "8+";
    else if (dailyWaterIntakeNumber >= 6) waterIntakeValue = "6-8";
    else if (dailyWaterIntakeNumber >= 4) waterIntakeValue = "4-6";

    // Finally, update the form data state
    setFormData({
      gender: body.Gender.toLowerCase(),
      age: body.Age,
      height: body.Height,
      weight: body.Weight,
      goalWeight: body.WeightGoal,
      dailyMeals: dailyMealsValue,
      eatingStyle: body.EatingStyle,
      activityLevel: body.ActivityLevel,
      sleepingPattern: body.SleepingPattern,
      waterIntake: waterIntakeValue,
      healthConcerns: mappedHealthConcerns,
    });
  }
}, [body]);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      const checked = target.checked;
      setFormData((prev) => ({
        ...prev,
        healthConcerns: checked
          ? [...prev.healthConcerns, value]
          : prev.healthConcerns.filter((c) => c !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!", formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full mt-10 max-w-4xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">Health Preferences</h1>
        <p className="text-gray-600">You can reconfigure your health preferences in this section.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block font-medium mb-1">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block font-medium mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Goal Weight */}
          <div>
            <label className="block font-medium mb-1">Goal Weight (kg)</label>
            <input
              type="number"
              name="goalWeight"
              value={formData.goalWeight}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Daily Meals */}
          <div>
            <label className="block font-medium mb-1">Daily Meal Amount</label>
            <select
              name="dailyMeals"
              value={formData.dailyMeals}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="1">1 meal</option>
              <option value="2">2 meals</option>
              <option value="3">3 meals</option>
              <option value="4+">4+ meals</option>
            </select>
          </div>

          {/* Eating Style */}
          <div>
            <label className="block font-medium mb-1">Preferred Eating Style</label>
            <select
              name="eatingStyle"
              value={formData.eatingStyle}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="I eat everything">I eat everything</option>
              <option value="Keto">Keto</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Pescatarian">Pescatarian</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block font-medium mb-1">Activity Level</label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="1.2">I'm a potato</option>
              <option value="1.375">Not that active</option>
              <option value="1.55">Active once in a while</option>
              <option value="1.725">Active most days</option>
              <option value="1.9">I'm an athlete</option>
            </select>
          </div>

          {/* Sleeping Pattern */}
          <div>
            <label className="block font-medium mb-1">Sleeping Pattern</label>
            <select
              name="sleepingPattern"
              value={formData.sleepingPattern}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="-5hours">&lt; 5 hours</option>
              <option value="5-6 hours">5-6 hours</option>
              <option value="7-8 hours">7-8 hours</option>
              <option value="+8hours">&gt; 8 hours</option>
            </select>
          </div>

          {/* Water Intake */}
          <div>
            <label className="block font-medium mb-1">Daily Water Intake</label>
            <select
              name="waterIntake"
              value={formData.waterIntake}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="0-4">0–4 glasses</option>
              <option value="4-6">4–6 glasses</option>
              <option value="6-8">6–8 glasses</option>
              <option value="8+">8+ glasses</option>
            </select>
          </div>
        </div>

        {/* Health Concerns */}
        <div>
          <label className="block font-medium mb-1">Medical Conditions</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { label: "None", value: "good" },
              { label: "High cholesterol", value: "cholesterol" },
              { label: "Diabetes", value: "diabetes" },
              { label: "Hypertension", value: "hypertension" },
              { label: "Iron deficiency", value: "ironDeficiency" },
              { label: "Bone resorption", value: "boneResorption" },
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="healthConcerns"
                  value={value}
                  checked={formData.healthConcerns.includes(value)}
                  onChange={handleChange}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
