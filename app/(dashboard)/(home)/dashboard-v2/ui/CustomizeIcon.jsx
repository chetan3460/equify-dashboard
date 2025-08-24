"use client";
import React from "react";

const CustomizeIcon = ({ className = "", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_376_4230)">
        <path d="M13.5 8V11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 9.5H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 2.5V5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.5 4H6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5 11.5V13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 12.5H11.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 5L11 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.3537 2.64634L2.64652 11.3535C2.45126 11.5487 2.45126 11.8653 2.64652 12.0606L3.9392 13.3533C4.13446 13.5485 4.45105 13.5485 4.64631 13.3533L13.3534 4.64613C13.5487 4.45087 13.5487 4.13428 13.3534 3.93902L12.0608 2.64634C11.8655 2.45108 11.5489 2.45108 11.3537 2.64634Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_376_4230">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CustomizeIcon;

