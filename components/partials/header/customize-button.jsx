"use client";
import React from "react";
import { useDragContext } from "@/components/draggable/DragProvider";
import CustomizeIcon from "@/app/(dashboard)/(home)/dashboard-v2/ui/CustomizeIcon";

const CustomizeButton = () => {
  const { isGlobalDragMode, toggleDragMode } = useDragContext();

  if (isGlobalDragMode === undefined || !toggleDragMode) return null;

  return (
    <button
      onClick={toggleDragMode}
      title={isGlobalDragMode ? "Done Customizing" : "Customize Layout"}
      className={`flex items-center justify-center gap-2 h-6 w-6 p-0 rounded-md border-none transition-colors
        ${
          isGlobalDragMode
            ? "bg-primary-100 text-primary dark:bg-transparent  dark:text-darkGray"
            : "text-lightGray hover:text-primary hover:bg-transparent dark:text-[#ADADAD]  dark:hover:bg-[#1F2937]"
        }`}
    >
      <CustomizeIcon className="h-4 w-4" />
    </button>
  );
};

export default CustomizeButton;
