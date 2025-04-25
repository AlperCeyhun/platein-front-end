"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "@/components/meals/Modal";

const AddMeal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
  
    setUploading(true);
  
    try {
      // Resim Yükleme
      const formData = new FormData();
      formData.append("image", selectedFile);
  
      const response = await fetch(
        "http://localhost:8080/api/meal/classifier",
        {
          method: "POST",
          body: formData,   
        }
      );
  
      if (!response.ok) {
        throw new Error("Error uploading image.");
      }
  
      const data = await response.json();
      console.log("Image classified:", data);
  
      // Yemek Ekleme
      const mealData = new FormData();
      mealData.append("food_name", data.food_name);
      mealData.append("image", selectedFile);

      console.log("FormData content:");
      for (let [key, value] of mealData.entries()) {
        console.log(`${key}:`, value);
      }

      const uploadResponse = await fetch("http://localhost:8080/api/meal-photo/upload", {
        method: "POST",
        body: mealData,
      });

      if (!uploadResponse.ok) {
          throw new Error("Error uploading meal photo.");
      }

      const uploadData = await uploadResponse.json();
      console.log("Uploaded Image ID:", uploadData);
      mealData.append("photo_id", uploadData);

      const addMealResponse = await fetch("http://localhost:8080/api/user/add-meal", {
        method: "POST",
        credentials: "include",
        body: mealData, 
      });

      if (!addMealResponse.ok) {
        throw new Error("Error adding meal.");
      }
  
      setUploadSuccess("Image uploaded and meal added successfully!");
    } catch (error) {
      console.error("Error:", error);
      setUploadSuccess("An error occurred.");
    } finally {
      setUploading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="py-6">
      <button
        onClick={handleClick}
        className="flex items-center w-full py-2 px-16 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
      >
        <h1 className="font-semibold px-2">Add new meal</h1>
        <Plus size={18} />
      </button>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-4">Upload Meal Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            {selectedFile && (
              <div className="mt-4">
                <p className="text-sm text-gray-700">
                  Selected file: {selectedFile.name}
                </p>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="mt-2 max-w-[200px] max-h-[200px] rounded-md shadow-md"
                />
              </div>
            )}
            <button
              onClick={handleImageUpload}
              className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
            {uploadSuccess && (
              <div className="mt-4 text-green-500">{uploadSuccess}</div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddMeal;