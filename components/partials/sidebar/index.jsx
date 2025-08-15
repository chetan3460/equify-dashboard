"use client";
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import ClassicSidebar from "./classic";
import MobileSidebar from "./mobile-sidebar";

const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  // Always use classic sidebar for desktop, mobile sidebar for mobile
  const selectedSidebar = isDesktop ? <ClassicSidebar /> : <MobileSidebar />;

  return <div>{selectedSidebar}</div>;
};

export default Sidebar;
