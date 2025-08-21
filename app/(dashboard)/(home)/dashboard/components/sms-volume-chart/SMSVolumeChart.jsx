"use client";
import React from "react";
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
import DashboardSelect from "@/components/dasboard-select";
import OptionsDropdown from "@/components/OptionsDropdown";

// ✅ Custom Tick Component with Tailwind classes
const CustomTick = ({ x, y, payload, mode, isYAxis = false }) => {
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
};

const SMSVolumeChart = ({ smsData, height = CHART_CONFIG.DEFAULT_HEIGHT }) => {
  const { theme: mode } = useTheme();

  const chartData = [
    { time: "10:00", total: 45000, delivered: 38000, failed: 7000, retry: 0 },
    { time: "11:00", total: 89000, delivered: 72000, failed: 17000, retry: 0 },
    {
      time: "12:00",
      total: smsData["12:00"]?.total || 0,
      delivered: smsData["12:00"]?.delivered || 0,
      failed: smsData["12:00"]?.failed || 0,
      retry: smsData["12:00"]?.retry || 0,
    },
    {
      time: "13:00",
      total: smsData["13:00"]?.total || 0,
      delivered: smsData["13:00"]?.delivered || 0,
      failed: smsData["13:00"]?.failed || 0,
      retry: smsData["13:00"]?.retry || 0,
    },
    {
      time: "14:00",
      total: smsData["14:00"]?.total || 0,
      delivered: smsData["14:00"]?.delivered || 0,
      failed: smsData["14:00"]?.failed || 0,
      retry: smsData["14:00"]?.retry || 0,
    },
    {
      time: "15:00",
      total: smsData["15:00"]?.total || 0,
      delivered: smsData["15:00"]?.delivered || 0,
      failed: smsData["15:00"]?.failed || 0,
      retry: smsData["15:00"]?.retry || 0,
    },
    {
      time: "16:00",
      total: 140000,
      delivered: 110000,
      failed: 30000,
      retry: 55121,
    },
    {
      time: "17:00",
      total: 95000,
      delivered: 78000,
      failed: 17000,
      retry: 12000,
    },
  ];

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

        <div className="relative" style={{ height: `${height}px` }}>
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

        <div className="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block mt-3">
          <p className="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">
            Peak traffic at 5 pm as expected
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SMSVolumeChart;
