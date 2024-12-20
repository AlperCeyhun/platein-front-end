"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "@/components/meals/Modal";

const AddMeal = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () =>{
        setIsModalOpen(isModalOpen ? false : true);
    }
    return (
        <div className="py-6">
            <button onClick= {handleClick}
                    className="flex items-center w-full py-2 px-16 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none">
                <h1 className="font-semibold px-2">Add new meal</h1>
                <Plus size={18}/>
            </button>
            {isModalOpen? <Modal onClose = {() => setIsModalOpen(false)}/> : <></>}
        </div>
    );
};

export default AddMeal;
