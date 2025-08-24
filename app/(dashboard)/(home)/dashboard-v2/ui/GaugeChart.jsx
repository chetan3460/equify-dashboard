"use client";
import React from "react";
import GaugeComponent from "react-gauge-component";

const GaugeChart = ({
  value = 5000,
  maxValue = 10000,
  title = "Current Total TPS",
  height = 140,
}) => {
  const percentage = Math.max(0, Math.min(100, (value / maxValue) * 100));

  return (
    <div style={{ height }}>
      <GaugeComponent
        value={percentage}
        type="semicircle"
        arc={{
          width: 0.25,
          padding: 0.02,
          cornerRadius: 6,
          subArcs: [
            { limit: 60, color: "#22c55e" },
            { limit: 80, color: "#f59e0b" },
            { limit: 100, color: "#ef4444" },
          ],
        }}
        pointer={{ color: "#374151", length: 0.78, width: 6, elastic: true }}
        labels={{
          valueLabel: {
            formatTextValue: (v) => `${Math.round((v / 100) * maxValue).toLocaleString()}`,
            style: { fill: "#111827", fontSize: "14px", fontWeight: 700 },
          },
          tickLabels: {
            type: "outer",
            defaultTickValueConfig: {
              formatTextValue: (v) => Math.round((v / 100) * maxValue).toLocaleString(),
            },
          },
        }}
      />
      <div className="text-xs text-default-600 text-center mt-1">{title}</div>
    </div>
  );
};

export default GaugeChart;

