/**
 * Overall SMS Volume Chart Component
 *
 * This component displays SMS volume trends over time with multiple series
 * Chart Type: Multi-line Chart (Recharts LineChart) with custom gradients
 * Props: smsData?: Object with time keys and { total, delivered, failed, retry }
 */
"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartInsight, { PRESET_INSIGHTS } from "../../ChartInsight";
import { formatNumber } from "./utils";
import {
  SMS_COLORS,
  LEGEND_ITEMS,
  CHART_CONFIG,
  THEME_COLORS,
} from "./constants";
import CustomDot from "./CustomDot";
import ActiveDot from "./ActiveDot";

// Add CSS for gradients
const gradientStyles = `
  .recharts-line-curve {
    filter: url(#line-gradient);
  }
  .total-line { stroke: url(#total-gradient) !important; }
  .delivered-line { stroke: url(#delivered-gradient) !important; }
  .failed-line { stroke: url(#failed-gradient) !important; }
  .retry-line { stroke: url(#retry-gradient) !important; }
`;

// Custom tooltip matching SMS style
function SMSTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="inline-flex flex-col gap-1 p-[7.6px] rounded-[3.8px] border border-[#DADADA] bg-white shadow-md"
      style={{ fontFamily: "Poppins, sans-serif", fontSize: "11.4px" }}
    >
      <p className="text-gray-900 font-medium mb-1">Time: {label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-1">
          <span style={{ color: entry.color }}>{entry.name}:</span>
          <span style={{ color: entry.color }}>
            {formatNumber(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// Custom Legend Component matching SMSVolumeChart pattern
function SMSLegend() {
  return (
    <div className="flex flex-wrap items-center gap-6 mb-6">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.dataKey} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: SMS_COLORS[item.key].gradient }}
          />
          <span className="text-sm text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Custom Line component with CSS gradient stroke
const GradientLine = ({
  dataKey,
  name,
  gradientColors,
  strokeWidth,
  ...props
}) => {
  const gradientId = `gradient-${dataKey}`;

  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientColors[0]} />
          <stop offset="100%" stopColor={gradientColors[1]} />
        </linearGradient>
      </defs>
      <Line
        type="monotone"
        dataKey={dataKey}
        name={name}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        dot={<CustomDot />}
        {...props}
      />
    </>
  );
};

export default function OverallSMSVolume({ smsData }) {
  const { theme: mode } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { chartData, lastUpdated } = useMemo(() => {
    if (smsData && typeof smsData === "object") {
      const { lastUpdated, ...timePoints } = smsData;
      const data = Object.entries(timePoints).map(([time, stats]) => ({
        time,
        total: stats.total,
        delivered: stats.delivered,
        failed: stats.failed,
        retry: stats.retry,
      }));
      return { chartData: data, lastUpdated };
    }

    // Fallback dummy data
    return {
      chartData: [
        {
          time: "10:00",
          total: 45000,
          delivered: 38000,
          failed: 7000,
          retry: 0,
        },
        {
          time: "11:00",
          total: 52000,
          delivered: 42000,
          failed: 10000,
          retry: 0,
        },
        {
          time: "12:00",
          total: 48000,
          delivered: 40000,
          failed: 8000,
          retry: 0,
        },
        {
          time: "13:00",
          total: 61000,
          delivered: 50000,
          failed: 11000,
          retry: 0,
        },
        {
          time: "14:00",
          total: 55000,
          delivered: 45000,
          failed: 10000,
          retry: 0,
        },
        {
          time: "15:00",
          total: 67000,
          delivered: 55000,
          failed: 12000,
          retry: 0,
        },
      ],
      lastUpdated: "15:15:45",
    };
  }, [smsData]);

  // Prevent potential theme hydration mismatch flicker
  if (!mounted) return null;

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-1">
        {" "}
        Overall SMS Volume adasdsa
      </h3>
      <p className="text-xs text-gray-500 mb-4">Last updated: {lastUpdated}</p>

      {/* Custom Legend */}
      <SMSLegend />

      <div
        className="h-80"
        aria-label="Overall SMS volume over time"
        role="img"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: CHART_CONFIG.MARGIN.TOP,
              right: CHART_CONFIG.MARGIN.RIGHT,
              left: CHART_CONFIG.MARGIN.LEFT,
              bottom: CHART_CONFIG.MARGIN.BOTTOM,
            }}
          >
            {/* Grid */}
            <CartesianGrid
              strokeDasharray={CHART_CONFIG.GRID_DASH}
              stroke={
                mode === "dark"
                  ? THEME_COLORS.DARK.GRID
                  : THEME_COLORS.LIGHT.GRID
              }
              horizontal
              vertical={true}
            />

            {/* X Axis */}
            <XAxis
              dataKey="time"
              axisLine={{ stroke: "#666", strokeWidth: 0.475 }}
              tickLine={{ stroke: "#666", strokeWidth: 0.475 }}
            />

            {/* Y Axis */}
            <YAxis
              tickFormatter={formatNumber}
              axisLine={{ stroke: "#666", strokeWidth: 0.475 }}
              tickLine={{ stroke: "#666", strokeWidth: 0.475 }}
            />

            <Tooltip content={<SMSTooltip />} />

            {/* Gradients - same as working SMSVolumeChart */}
            <defs>
              {LEGEND_ITEMS.map(({ key }) => (
                <linearGradient
                  key={key}
                  id={`${key}-gradient`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  {SMS_COLORS[key].stops.map((stop, i) => (
                    <stop key={i} offset={stop.offset} stopColor={stop.color} />
                  ))}
                </linearGradient>
              ))}
            </defs>

            {/* Lines - same as working SMSVolumeChart */}
            {LEGEND_ITEMS.map(({ key, dataKey, label }) => (
              <Line
                key={dataKey}
                type="monotone"
                dataKey={dataKey}
                name={label}
                stroke={`url(#${key}-gradient)`}
                strokeWidth={CHART_CONFIG.STROKE_WIDTH}
                dot={<CustomDot />}
                activeDot={(props) => (
                  <ActiveDot
                    {...props}
                    stroke={SMS_COLORS[key].solid}
                    gradientId={`${key}-gradient`}
                  />
                )}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ChartInsight message={PRESET_INSIGHTS.increasingTrend} />
    </div>
  );
}
