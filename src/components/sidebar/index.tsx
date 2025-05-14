"use client";
import { 
  LucideIcon, 
  House, 
  CircleUserRound, 
  Settings, 
  Beef, 
  ChartLine, 
  UtensilsCrossed } from "lucide-react";
import SidebarItem from "./item";
import backgroundImg from "@/assets/background/background2.jpg";
interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] = [
  {
    name: "Home",
    path: "/home",
    icon: House,
  },
  {
    name: "Account",
    path: "/account",
    icon: CircleUserRound,
  },
  {
    name: "My Meals",
    path: "/mymeals",
    icon: Beef,
  },
  {
    name: "My Nutrition",
    path: "/mynutrition",
    icon: ChartLine,
  },
  {
    name: "Diet Plan",
    path: "/dietplan",
    icon: UtensilsCrossed,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    items: [
      {
        name: "General",
        path: "/settings/account",
      },
      {
        name: "Diet Plan",
        path: "/settings/healthpreferences",
      },
    ],
  },
];

const Sidebar = () => {
    return (
      <div
      className="relative h-full w-64 bg-cover bg-left shadow-lg z-10"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}>
      
      <div className="absolute inset-0 bg-black/10" />
    
      <div className="relative flex flex-col space-y-10 w-full backdrop-blur-sm bg-white/70 p-4 rounded-xl z-10">
        <h6 className="text-left text-2xl font-semibold text-indigo-500 font-mono py-5 ml-12">
          Tabaq
        </h6>
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
    
    );
};

export default Sidebar;