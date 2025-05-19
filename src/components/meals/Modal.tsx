"use client";
import { ReactNode, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
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
      const response = await fetch("http://localhost:8080/api/meal/classifier", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) throw new Error("Unexpected response from server.");

      const data = await response.json();
      alert(`Prediction: ${data.prediction}`);
    } catch (error) {
      console.error("Upload error", error);
      alert("An error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[500px] rounded-2xl shadow-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Upload Meal Image
        </h2>

        <div
          className={`w-full border-2 ${
            dragActive ? "border-green-400 bg-green-50" : "border-dashed border-gray-300"
          } rounded-lg p-6 text-center transition`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <p className="text-gray-700 mb-2">Drag and drop the file here or</p>
          <label className="inline-block cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Select File
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {file && (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-gray-600">Selected file: {file.name}</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="mt-2 max-w-[200px] max-h-[200px] rounded-md shadow-md"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleUpload}
          className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload & Classify"}
        </button>
      </div>
    </div>
  );
};

export default Modal;