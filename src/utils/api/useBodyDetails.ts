import { useState, useEffect } from "react";

export interface Body {
  Gender: string;
  Age: number;
  Weight: number;
  Height: number;
  WeightGoal: number;
  DailyMeals: string;
  SleepingPattern: string;
  DailyWaterIntake: string;
  EatingStyle: string;
  ActivityLevel: number;
}

export function useBodyDetails() {
  const [body, setBody] = useState<Body | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          return;
        }

        const response = await fetch("http://localhost:8080/api/user/body-details", {
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

        if (result.status === "ERROR") {
          throw new Error(result.message || "Failed to fetch body details");
        }

        setBody(result.data);
        console.log("Body details fetched successfully:", result.data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      }
    };

    fetchData();
  }, []);

  return { body, error };
}