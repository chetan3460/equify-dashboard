"use client";
import React from "react";
import { Refresh16 } from "./icons";

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
        <div className="flex items-center justify-center">
          <Refresh16 />
        </div>
        <span className="text-xs font-semibold text-purple dark:text-lightpurle">
          Refresh Data
        </span>
      </div>
    </div>
  );
};
export default TitleSection;
