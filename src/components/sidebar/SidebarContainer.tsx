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
    <div className="">
      <button onClick={handleClick} className={`absolute top-8 left-4 z-50 p-2 bg-white rounded-md transform transition-transform duration-150
        ${isOpen ? 'rotate-180' : 'border shadow-md'}`}>
        <Menu/>
      </button>
      {isOpen ? <Sidebar/>: <></>}
    </div>
  );
}
