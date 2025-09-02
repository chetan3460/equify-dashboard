import React from "react";
import { DOT_SIZES } from "../../utils/constants";

/**
 * Active (hover) dot — filled with gradient, slightly bigger.
 * Recharts automatically uses this when the point is active/hovered.
 */
export const ActiveDot = ({ cx, cy, stroke, gradientId }) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={DOT_SIZES.HOVER} // ~6.118 radius
      fill={`url(#${gradientId})`} // gradient fill
      stroke={`url(#${gradientId})`} // solid stroke to match series
      strokeWidth={0.95}
      style={{
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        transition: "all 0.15s ease-out",
      }}
    />
  );
};

export default ActiveDot;

