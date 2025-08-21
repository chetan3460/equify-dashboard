"use client";
import React, { useEffect, useMemo, useState } from "react";
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

import CustomTooltip from "./CustomTooltip";
import CustomDot from "./CustomDot";
import ActiveDot from "./ActiveDot";
import { formatYAxis } from "./utils";
import {
  SMS_COLORS,
  LEGEND_ITEMS,
  CHART_CONFIG,
  THEME_COLORS,
} from "./constants";
import SMSLegend from "./SMSLegend";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import DashboardSelect from "../dasboard-select";
import OptionsDropdown from "../OptionsDropdown";
import ChartInsight, { PRESET_INSIGHTS } from "../ChartInsight";

// ✅ Custom Tick Component with Tailwind classes (memoized)
const CustomTick = React.memo(({ x, y, payload, mode, isYAxis = false }) => {
  return (
    <text
      x={x}
      y={isYAxis ? y : y + 10} // X axis shifted down slightly
      textAnchor={isYAxis ? "end" : "middle"} // align right for Y, center for X
      className={`text-[11px] font-poppins ${
        mode === "dark" ? "fill-gray-300" : "fill-[#201D1A]"
      }`}
    >
      {payload.value}
    </text>
  );
});
CustomTick.displayName = "CustomTick";

// Accept either normalized array via `data` or legacy keyed object via `smsData`
const SMSVolumeChart = ({ data, smsData, height = CHART_CONFIG.DEFAULT_HEIGHT }) => {
  const { theme: mode } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Derive chart data once per input change
  const chartData = useMemo(() => {
    if (Array.isArray(data) && data.length) {
      return data; // already normalized: [{ time, total, delivered, failed, retry }]
    }
    const safe = smsData || {};
    return [
      { time: "10:00", total: 45000, delivered: 38000, failed: 7000, retry: 0 },
      { time: "11:00", total: 89000, delivered: 72000, failed: 17000, retry: 0 },
      ...["12:00", "13:00", "14:00", "15:00"].map((t) => ({
        time: t,
        total: safe?.[t]?.total ?? 0,
        delivered: safe?.[t]?.delivered ?? 0,
        failed: safe?.[t]?.failed ?? 0,
        retry: safe?.[t]?.retry ?? 0,
      })),
      { time: "16:00", total: 140000, delivered: 110000, failed: 30000, retry: 55121 },
      { time: "17:00", total: 95000, delivered: 78000, failed: 17000, retry: 12200 },
    ];
  }, [data, smsData]);

  // Prevent potential theme hydration mismatch flicker
  if (!mounted) return null;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Overall SMS volume</CardTitle>
          <CardDescription>
            Last updated ({smsData?.lastUpdated || "N/A"})
          </CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2">
          <DashboardSelect />
          <OptionsDropdown />
        </div>
      </div>
      <CardContent>
        <SMSLegend />

        <div
          className="relative"
          style={{ height: `${height}px` }}
          aria-label="SMS volume over time"
          role="img"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: CHART_CONFIG.MARGIN.TOP,
                right: CHART_CONFIG.MARGIN.RIGHT, // 👈 extra space for last dot
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

              {/* ✅ Custom X Axis with Tailwind tick */}
              <XAxis
                dataKey="time"
                axisLine={{ stroke: "#666", strokeWidth: 0.475 }}
                tickLine={{ stroke: "#666", strokeWidth: 0.475 }}
                tick={(props) => <CustomTick {...props} mode={mode} />}
              />

              {/* ✅ Custom Y Axis with Tailwind tick */}
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={{ stroke: "#666", strokeWidth: 0.475 }}
                tickLine={{ stroke: "#666", strokeWidth: 0.475 }}
                tick={(props) => (
                  <CustomTick {...props} mode={mode} isYAxis={true} />
                )}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Gradients */}
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
                      <stop
                        key={i}
                        offset={stop.offset}
                        stopColor={stop.color}
                      />
                    ))}
                  </linearGradient>
                ))}
              </defs>

              {/* Lines */}
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

        <ChartInsight message={PRESET_INSIGHTS.peakTraffic} />
      </CardContent>
    </Card>
  );
};

export default SMSVolumeChart;
