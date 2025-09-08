import React from "react";

export default function ChartTooltip({ active, payload, label, chartConfig, formatValue }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="rounded-[4px] p-2"
      style={{
        backgroundColor: chartConfig.tooltip.contentStyle.backgroundColor,
        border: chartConfig.tooltip.contentStyle.border,
      }}
    >
      {label != null && (
        <p className="text-xs font-medium mb-1" style={{ color: chartConfig.tooltip.labelStyle.color }}>
          {label}
        </p>
      )}
      {payload.map((entry, i) => (
        <p key={i} className="text-xs font-bold" style={{ color: chartConfig.tooltip.itemStyle.color }}>
          {formatValue ? formatValue(entry.value) : entry.value?.toLocaleString?.() ?? entry.value}
        </p>
      ))}
    </div>
  );
}
