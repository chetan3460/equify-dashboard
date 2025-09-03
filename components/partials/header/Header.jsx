"use client";
import React from "react";
import { cn } from "@/lib/utils";

const Header = ({ children, className }) => {
  return <header className={cn("z-50", className)}>{children}</header>;
};

export default Header;
