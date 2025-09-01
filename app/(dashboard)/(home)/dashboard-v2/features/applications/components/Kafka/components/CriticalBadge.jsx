import React from "react";

export default function CriticalBadge({ size = 12, className = "", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`inline-block ${className}`}
      {...props}
    >
      <path
        d="M6 11C8.75 11 11 8.75 11 6C11 3.25 8.75 1 6 1C3.25 1 1 3.25 1 6C1 8.75 3.25 11 6 11Z"
        fill="#E14761"
        fillOpacity="0.3"
        stroke="#E14761"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 4V6.5" stroke="#B12F00" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.99609 8H6.00058" stroke="#B12F00" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

