"use client";
import React from "react";
import { useDragContext } from "@/components/draggable/DragProvider";
import CustomizeIcon from "@/app/(dashboard)/(home)/dashboard/components/CustomizeIcon";

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

<div
  class="
        rounded-20 p-4 bg-card transition-all duration-300 relative group
        border-2
        border-dashed border-gray-400 hover:border-blue-400
      "
>
  <div className="moveable-item p-4">
    <div class="text-xs font-semibold text-default-600 relative z-10">
      Total SMS sent today
    </div>
    <div class="flex items-center gap-1">
      <div class="text-2xl font-bold text-default-900">24.588M</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M8.89971 3.01375L14.366 12.5056C14.7491 13.1744 14.2541 14 13.4653 14H2.53284C1.74409 14 1.24909 13.1744 1.63221 12.5056L7.09846 3.01375C7.49221 2.32875 8.50596 2.32875 8.89971 3.01375Z"
            fill="#47E16B"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0 0.5)"
            ></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="flex items-center gap-1 mt-1 text-[11px] text-success">
      <span>12% higher than yesterday</span>
    </div>
  </div>
</div>;
