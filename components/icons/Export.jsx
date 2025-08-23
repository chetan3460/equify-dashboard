import React from 'react';

const Export = ({ 
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
      d="M5.49951 8.50098L6.49951 7.50098L5.49951 6.50098L6.49951 7.50098H3.49951"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.0005 4.99902V7.49902C11.0005 9.99902 10.0005 10.999 7.50049 10.999H4.50049C2.00049 10.999 1.00049 9.99902 1.00049 7.49902V4.49902C1.00049 1.99902 2.00049 0.999023 4.50049 0.999023H7.00049"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.0005 4.99902H9.00049C7.50049 4.99902 7.00049 4.49902 7.00049 2.99902V0.999023L11.0005 4.99902Z"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Export;
