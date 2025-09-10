"use client";
import React from "react";
import GaugeChart from "../components/GaugeChart";
import { GAUGE_MAX, GAUGE_ARC_WIDTH, GAUGE_VALUE_FONT, GAUGE_HEIGHT } from "../utils/config";
import { getNumericValue } from "../utils/numbers";

/**
 * Gauge-only content extracted to keep Card small and readable.
 */
export default function GaugeCard({ title, value }) {
  return (
    <div className="mt-0 w-full h-[65px] flex items-center justify-center overflow-hidden">
      <GaugeChart
        value={getNumericValue(value)}
        maxValue={GAUGE_MAX}
        title={title}
        enableAnimation={true}
        showRealTimeUpdate={false}
        width={"100%"}
        height={GAUGE_HEIGHT}
        arcWidth={GAUGE_ARC_WIDTH}
        centerLabelMode="short"
        showCenterValue={true}
        flatCaps={true}
        showTicks={false}
        valueLabelFontSize={GAUGE_VALUE_FONT}
        marginInPercent={0.01}
        className=" text-default-900 dark:text-white"
      />
    </div>
  );
}

