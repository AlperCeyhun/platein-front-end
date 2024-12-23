"use client"

interface EditButtonProps{
    label: string;
    onClick?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({label,onClick}) => {
    
    return (
        <button className="flex items-center w-full py-2 px-16 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
                onClick={onClick}>
            {label}
        </button>
    )
}
export default EditButton;