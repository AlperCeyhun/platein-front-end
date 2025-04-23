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
        path: "/settings",
      },
      {
        name: "Diet Plan",
        path: "/settings/dietplan",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-white shadow-lg z-10 p-4">
      <div className="flex flex-col space-y-10 w-full">
        <h6 className="text-left text-2xl font-semibold text-indigo-500 font-mono py-5 ml-12">
          PlateIn
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