"use client";
import React from "react";

export const TitleSection = () => {
  return (
    <div className="flex items-center flex-wrap justify-between gap-4">
      {/* Left side */}
      <div className="flex flex-col gap-1">
        <div className="text-2xl font-semibold text-dark dark:text-[#E5E2DF]">
          Welcome back, Rahul!
        </div>
        <p className="text-base font-normal text-midGray dark:text-darkGray">
          Your SMS operations are performing well today with steady traffic
          growth across all channels
        </p>
      </div>

      {/* Right side (Refresh Button) */}
      <div className="flex items-center gap-1 cursor-pointer text-purple dark:text-lightpurle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M14.6673 8C14.6673 11.68 11.6807 14.6667 8.00065 14.6667C4.32065 14.6667 2.07398 10.96 2.07398 10.96M2.07398 10.96H5.08732M2.07398 10.96V14.2933M1.33398 8C1.33398 4.32 4.29398 1.33334 8.00065 1.33334C12.4473 1.33334 14.6673 5.04 14.6673 5.04M14.6673 5.04V1.70667M14.6673 5.04H11.7073"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs font-semibold text-purple dark:text-lightpurle">
          Refresh Data
        </span>
      </div>
    </div>
  );
};
export default TitleSection;
