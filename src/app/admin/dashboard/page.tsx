'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import GridItem from "@/components/charts/GridItem";
import Grid from "@/components/charts/Grid";
import Modal from "@/components/admin/Modal";

import { apiGetRequest } from "@/utils/api/ApiGetRequest";
import { apiPostRequest } from "@/utils/api/ApiPostRequest";

export default function Home() {
  const router = useRouter();

  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  const [modalData, setModalData] = useState<any>(null);
  const [adminInput, setAdminInput] = useState("");
  const [currentEndpoint, setCurrentEndpoint] = useState<string>("");

  const handleModalClose = () => {
    setIsModalOneOpen(false);
    setIsModalTwoOpen(false);
  };

  const handleModalTwoOpen = (endpoint: string) => {
    setCurrentEndpoint(endpoint);
    setIsModalTwoOpen(true);
  };

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminInput(e.target.value);
  };

  const handleButtonClick_GET = async (endpoint: string) => {
    try {
      const response = await apiGetRequest({
        endpoint: `http://localhost:5000/api/admin${endpoint}`,
        router,
        successRoute: "",
      });

      console.log("Response:", response);
      setModalData(response.result);
      setIsModalOneOpen(true);
    } catch (error) {
      console.error("Error during API request", error);
    }
  };

  const handleAdminSubmit = async (endpoint: string) => {
    setIsModalTwoOpen(false);

    if (!adminInput.trim()) {
      alert("Please provide a valid input!");
      return;
    }

    try {
      const response = await apiPostRequest({
        endpoint: `http://localhost:5000/api/admin${endpoint}`,
        bodyData: { input: adminInput },
        router,
        successRoute: "",
      });

      console.log("Response:", response.result);
      setModalData(response.result);
      setIsModalOneOpen(true);
      setAdminInput("");
    } catch (error) {
      console.error("Error submitting admin input", error);
    }
  };

  const buttonClass =
    "text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4 flex justify-center items-center w-full h-full";

  const buttons = [
    { label: "Get Users & Meal Info for each consumed meal (>450 Cals)", onClick: () => handleButtonClick_GET('/get-high-calorie-meals') },
    { label: "Get Users by Consumed Meal ID", onClick: () => handleModalTwoOpen('/get-users-by-meal') },
    { label: "Get All User's Meal Info", onClick: () => handleButtonClick_GET('/get-user-meal-info') },
    { label: "Get Meal Info with Max Calories", onClick: () => handleButtonClick_GET('/get-meal-info-with-max-cal') },
    { label: "Get Users by Meal Count", onClick: () => handleModalTwoOpen('/get-users-by-meal-count') },
    { label: "Get Users by Total Calorie Threshold", onClick: () => handleModalTwoOpen('/get-users-by-calorie-threshold') },
    { label: "Get Users by Meal Calorie Range (100–500)", onClick: () => handleButtonClick_GET('/get-users-by-meal-calorie-range') },
    { label: "Get Users with High Calorie Meal (>500 Cals)", onClick: () => handleButtonClick_GET('/get-users-by-high-calorie-meal') },
    { label: "Get Users with No Meals", onClick: () => handleButtonClick_GET('/get-users-with-no-meals') },
    { label: "Delete User with ID", onClick: () => handleModalTwoOpen('/delete-user-with-id') },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">Admin Dashboard</h1>

        <Grid templateColumns="grid-cols-2" gap={4}>
          {buttons.map((btn, index) => (
            <GridItem
              key={index}
              size="w-full h-[75px]"
              bgColor="bg-white"
              hasShadow={true}
              horizontalWidth="w-[600px]"
            >
              <button onClick={btn.onClick} className={buttonClass}>
                {btn.label}
              </button>
            </GridItem>
          ))}
        </Grid>

        {isModalOneOpen && (
          <Modal onClose={handleModalClose}>
            <div>
              <h2 className="font-semibold mb-4">Data</h2>
              {Array.isArray(modalData) && modalData.length > 0 ? (
                <ul>
                  {modalData.map((item, index) => (
                    <li key={index} className="mb-4">
                      {Object.entries(item).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {String(value)}
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </Modal>
        )}

        {isModalTwoOpen && (
          <Modal onClose={handleModalClose}>
            <div>
              <h2 className="font-semibold mb-4">Admin Input</h2>
              <input
                type="text"
                value={adminInput}
                onChange={handleAdminInputChange}
                className="border p-2 mb-4 w-full"
                placeholder="Enter your input"
              />
              <button
                onClick={() => handleAdminSubmit(currentEndpoint)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
