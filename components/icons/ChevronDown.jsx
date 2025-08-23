import React from 'react';

const ChevronDown = ({ 
  width = 7, 
  height = 5, 
  className = "", 
  ...props 
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 7 5"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M0 0.5L3.5 4.5L7 0.5H0Z" />
  </svg>
);

export default ChevronDown;
