import React from 'react';

const Refresh = ({ 
  width = 12, 
  height = 12, 
  className = "", 
  ...props 
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 12 12"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M11 6C11 8.76 8.76 11 6 11C3.24 11 1.555 8.22 1.555 8.22M1.555 8.22H3.815M1.555 8.22V10.72M1 6C1 3.24 3.22 1 6 1C9.335 1 11 3.78 11 3.78M11 3.78V1.28M11 3.78H8.78"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Refresh;
