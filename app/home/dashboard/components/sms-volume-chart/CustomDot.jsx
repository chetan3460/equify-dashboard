import React from "react";
import { DOT_SIZES } from "./constants";

/**
 * Custom Dot Component for SMS Volume Chart
 *
 * - Normal: Hollow (white fill + colored stroke)
 * - Hover: Filled with stroke color (or gradient if you prefer later)
 * - Smooth pulse animation
 */
export const CustomDot = ({ cx, cy, stroke, payload, dataKey }) => {
  // Handle mouse enter - expand + fill with stroke color
  const handleMouseEnter = (e) => {
    const element = e.target;

    // Set exact hover dimensions as specified
    element.setAttribute("r", DOT_SIZES.HOVER.toString());
    element.setAttribute("rx", (DOT_SIZES.HOVER * 1.176).toString());
    element.setAttribute("ry", (DOT_SIZES.HOVER * 0.85).toString());

    // Change fill color on hover
    element.setAttribute("fill", stroke);

    // Add effects
    element.style.transform = "scale(1.05)";
    element.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.1))";
    element.style.animation = "pulse 0.3s ease-in-out";
  };

  // Handle mouse leave - return to hollow dot
  const handleMouseLeave = (e) => {
    const element = e.target;

    // Reset to normal size
    element.setAttribute("r", DOT_SIZES.NORMAL.toString());
    element.removeAttribute("rx");
    element.removeAttribute("ry");

    // Back to hollow
    element.setAttribute("fill", "white");

    // Remove effects
    element.style.transform = "scale(1)";
    element.style.filter = "none";
    element.style.animation = "none";
  };

  return (
    <>
      {/* Pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1.05);
          }
        }
      `}</style>

      <circle
        cx={cx}
        cy={cy}
        r={DOT_SIZES.NORMAL}
        fill="white" // default hollow
        stroke={stroke}
        strokeWidth={2}
        style={{
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`Data point: ${dataKey} value ${
          payload?.[dataKey] || "unknown"
        }`}
      />
    </>
  );
};

export default CustomDot;
