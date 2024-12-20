"use client";
import { X } from "lucide-react";
import GridItem from "../charts/GridItem";

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose,children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[800px] h-[450px]">
        <GridItem title="List of input types" bgColor="bg-white">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
          {children}
        </GridItem>
      </div>
    </div>
  );
};

export default Modal;
