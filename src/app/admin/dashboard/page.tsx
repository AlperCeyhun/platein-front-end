'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilePenLine, Trash2, FileWarning } from "lucide-react";
import GridItem from "../../../components/charts/GridItem";
import Grid from "../../../components/charts/Grid";
import { apiGetRequest } from "@/utils/api/ApiGetRequest";
import { apiPostRequest } from "@/utils/api/ApiPostRequest";
import Modal from "./Modal";

export default function Home() {

  const router = useRouter();

  const [isModalOneOpen, setIsModalOneOpen] = useState(false);

  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  const [modalData, setModalData] = useState<any>(null);
  const [adminInput, setAdminInput] = useState("");

  const [currentEndpoint, setCurrentEndpoint] = useState<string>("");

  const handleModalTwoOpen = (endpoint: string) => {
    setCurrentEndpoint(endpoint);
    setIsModalTwoOpen(true);
  };

  const handleAdminInputOpen = () => {
    setIsModalTwoOpen(true);
  };

  const handleAdminInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminInput(event.target.value);
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
    console.log("Admin input:", adminInput);

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

  const handleModalClose = () => {
    setIsModalOneOpen(false);
    setIsModalTwoOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">Admin Dashboard</h1>

        <Grid templateColumns="grid-cols-3" gap={4}>
          <GridItem size="w-full h-[75px]" bgColor="bg-white" hasShadow={true} horizontalWidth="w-[200px]">
            <button
              onClick={() => handleButtonClick_GET('/get-high-calorie-meals')}
              className="text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4"
            >
              Get High Calorie Meals
            </button>
          </GridItem>

          <GridItem size="w-full h-[75px]" bgColor="bg-white" hasShadow={true} horizontalWidth="w-[200px]">
            <button
                onClick={async () => {
                  handleModalTwoOpen('/get-users-by-meal')
                }}
              className="text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4"
            >
              Get Users by Meal
            </button>
          </GridItem>

          <GridItem size="w-full h-[75px]" bgColor="bg-white" hasShadow={true} horizontalWidth="w-[200px]">
            <button
              onClick={() => handleButtonClick_GET('/get-user-meal-info')}
              className="text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4"
            >
              Get User Meal Info
            </button>
          </GridItem>

          <GridItem size="w-full h-[75px]" bgColor="bg-white" hasShadow={true} horizontalWidth="w-[200px]">
            <button
              onClick={() => handleButtonClick_GET('/get-meal-info-with-max-cal')}
              className="text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4"
            >
              Get Meal Info with Max Calories
            </button>
          </GridItem>

          <GridItem size="w-full h-[75px]" bgColor="bg-white" hasShadow={true} horizontalWidth="w-[200px]">
            <button
              onClick={() => {
                handleModalTwoOpen('/get-users-by-meal-count');
              }}
              className="text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4"
            >
              Get Users by Meal Count
            </button>
          </GridItem>

          <GridItem size="w-full h-[75px]" bgColor="bg-white" hasShadow={true} horizontalWidth="w-[200px]">
            <button
              onClick={() => {
                handleModalTwoOpen('/get-users-by-calorie-threshold');
              }}
              className="text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4"
            >
              Get Users by Calorie Threshold
            </button>
          </GridItem>

          <GridItem size="w-full h-[75px]" bgColor="bg-white" hasShadow={true} horizontalWidth="w-[200px]">
            <button
              onClick={() => handleButtonClick_GET('/get-users-by-meal-calorie-range')}
              className="text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4"
            >
              Get Users by Meal Calorie Range
            </button>
          </GridItem>

          <GridItem size="w-full h-[75px]" bgColor="bg-white" hasShadow={true} horizontalWidth="w-[200px]">
            <button
              onClick={() => handleButtonClick_GET('/get-users-by-high-calorie-meal')}
              className="text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4"
            >
              Get Users by High Calorie Meal
            </button>
          </GridItem>

          <GridItem size="w-full h-[75px]" bgColor="bg-white" hasShadow={true} horizontalWidth="w-[200px]">
            <button
              onClick={() => handleButtonClick_GET('/get-users-with-no-meals')}
              className="text-red-500 hover:text-red-700 transition-all duration-200 text-sm py-2 px-4"
            >
              Get Users with No Meals
            </button>
          </GridItem>
        </Grid>

        {isModalOneOpen && (
          <Modal onClose={handleModalClose}>
            <div>
              <h2 className="font-semibold mb-4">Data</h2>
              {Array.isArray(modalData) && modalData.length > 0 ? (
                <ul>
                  {modalData.map((item, index) => (
                    <li key={index} className="mb-4">
                      {Object.keys(item).map((key) => (
                        <div key={key}>
                          <strong>{key}:</strong> {item[key]}
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
