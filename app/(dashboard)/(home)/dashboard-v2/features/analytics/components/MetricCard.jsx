"use client";
import React from "react";
import { ArrowUpTriangle16 as GreenArrow, ArrowDownTriangle16 as RedArrow } from "@/ui/icons";
import { formatCardValue } from "../utils/numbers";

/**
 * Metric-only content extracted to make intent obvious.
 */
export default function MetricCard({ value, trend, change, color }) {
  return (
    <>
      <div className="flex items-center gap-1">
        <div className="text-2xl font-bold text-default-900">
          {formatCardValue(value)}
        </div>
        {trend === "up" && <GreenArrow />}
        {trend === "down" && <RedArrow />}
      </div>
      {change && (
        <div className={`flex items-center gap-1 mt-3 text-[11px] ${color}`}>
          <span className="font-medium">{change}</span>
        </div>
      )}
    </>
  );
}

