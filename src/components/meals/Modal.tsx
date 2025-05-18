"use client";
import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import GridItem from "../charts/GridItem";

const Modal = ({ onClose }: { onClose: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const response = await axios.post("http://localhost:8080/api/meal/classifier", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      alert(`Prediction: ${response.data.prediction}`);
    } catch (error) {
      console.error("Upload error", error);
      alert("An error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[800px] h-[450px]">
        <GridItem title="Upload Meal Image" bgColor="bg-white">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center justify-center h-full space-y-6 mt-6">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {file && <p className="text-sm text-gray-600">Selected file: {file.name}</p>}

            <button
              onClick={handleUpload}
              className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload & Classify"}
            </button>
          </div>
        </GridItem>
      </div>
    </div>
  );
};

export default Modal;