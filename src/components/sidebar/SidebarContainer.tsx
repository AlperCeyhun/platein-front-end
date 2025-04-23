"use client";
import { useState } from "react";
import Sidebar from "./index";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function SidebarContainer() {
  const pathname = usePathname();
  const ShouldRender = !pathname.startsWith("/register") && !pathname.startsWith("/login") && !pathname.startsWith("/admin");
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!ShouldRender) return null;

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`absolute top-8 left-4 z-50 p-2 bg-white rounded-md transform transition-transform duration-150
          ${isOpen ? 'rotate-180' : 'border shadow-md'}`}>
        <Menu/>
      </button>

      <div className={`fixed top-0 left-0 h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          transition-transform duration-300 ease-in-out`}>
        <Sidebar/>
      </div>
    </div>
  );
}