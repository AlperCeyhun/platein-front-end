"use client";
import React from "react";
import Image from "next/image";
import background1 from "@/assets/background/background1.jpg";
import background3 from "@/assets/background/background3.jpg";
import { usePathname } from "next/navigation";

export default function BackgroundContainer() {
  const pathname = usePathname();
  const isAltBackground = pathname.startsWith("/register") || pathname.startsWith("/login") || pathname.startsWith("/admin");

  return (
    <div className="absolute inset-0 -z-10">
      <Image src={isAltBackground ? background3 : background1} alt="Background" fill className="object-cover" priority />
    </div>
  );
}