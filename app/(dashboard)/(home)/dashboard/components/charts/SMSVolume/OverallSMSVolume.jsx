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

import CustomTooltip from "./components/CustomTooltip";
import CustomDot from "./components/CustomDot";
import ActiveDot from "./components/ActiveDot";
import { formatYAxis } from "./utils/utils";
import {
  SMS_COLORS,
  LEGEND_ITEMS,
  CHART_CONFIG,
  THEME_COLORS,
} from "./utils/constants";
import SMSLegend from "./components/SMSLegend";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import DashboardSelect from "@/components/dasboard-select";
import OptionsDropdown from "@/components/OptionsDropdown";
import { useDragContext } from "@/components/draggable/DragProvider";

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

const OverallSMSVolume = ({
  smsData,
  height = CHART_CONFIG.DEFAULT_HEIGHT,
  selectedPeriod = "Today",
  onPeriodChange,
}) => {
  const { theme: mode } = useTheme();
  const { isGlobalDragMode } = useDragContext();

  // Generate chart data based on selected period
  const getChartData = (period) => {
    switch (period) {
      case "Today":
        return [
          {
            time: "10:00",
            total: 45000,
            delivered: 38000,
            failed: 7000,
            retry: 0,
          },
          {
            time: "11:00",
            total: 89000,
            delivered: 72000,
            failed: 17000,
            retry: 0,
          },
          {
            time: "12:00",
            total: smsData?.["12:00"]?.total || 155130,
            delivered: smsData?.["12:00"]?.delivered || 77434,
            failed: smsData?.["12:00"]?.failed || 22575,
            retry: smsData?.["12:00"]?.retry || 55121,
          },
          {
            time: "13:00",
            total: smsData?.["13:00"]?.total || 155130,
            delivered: smsData?.["13:00"]?.delivered || 77434,
            failed: smsData?.["13:00"]?.failed || 22575,
            retry: smsData?.["13:00"]?.retry || 55121,
          },
          {
            time: "14:00",
            total: smsData?.["14:00"]?.total || 155130,
            delivered: smsData?.["14:00"]?.delivered || 77434,
            failed: smsData?.["14:00"]?.failed || 22575,
            retry: smsData?.["14:00"]?.retry || 55121,
          },
          {
            time: "15:00",
            total: smsData?.["15:00"]?.total || 155130,
            delivered: smsData?.["15:00"]?.delivered || 77434,
            failed: smsData?.["15:00"]?.failed || 22575,
            retry: smsData?.["15:00"]?.retry || 55121,
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
            retry: 12200,
          },
        ];
      case "This week":
        return [
          {
            time: "Mon",
            total: 280000,
            delivered: 260000,
            failed: 20000,
            retry: 15000,
          },
          {
            time: "Tue",
            total: 320000,
            delivered: 300000,
            failed: 20000,
            retry: 18000,
          },
          {
            time: "Wed",
            total: 290000,
            delivered: 270000,
            failed: 20000,
            retry: 16000,
          },
          {
            time: "Thu",
            total: 350000,
            delivered: 330000,
            failed: 20000,
            retry: 22000,
          },
          {
            time: "Fri",
            total: 420000,
            delivered: 400000,
            failed: 20000,
            retry: 28000,
          },
          {
            time: "Sat",
            total: 220000,
            delivered: 210000,
            failed: 10000,
            retry: 14000,
          },
          {
            time: "Sun",
            total: 180000,
            delivered: 170000,
            failed: 10000,
            retry: 12000,
          },
        ];
      case "This month":
        return [
          {
            time: "Week 1",
            total: 1850000,
            delivered: 1720000,
            failed: 130000,
            retry: 280000,
          },
          {
            time: "Week 2",
            total: 2120000,
            delivered: 1980000,
            failed: 140000,
            retry: 320000,
          },
          {
            time: "Week 3",
            total: 1980000,
            delivered: 1850000,
            failed: 130000,
            retry: 290000,
          },
          {
            time: "Week 4",
            total: 2350000,
            delivered: 2210000,
            failed: 140000,
            retry: 350000,
          },
        ];
      default:
        return [];
    }
  };

  const chartData = getChartData(selectedPeriod);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Overall SMS volume</CardTitle>
          <CardDescription>
            Last updated ({smsData?.lastUpdated || "N/A"})
          </CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="opacity-75 hover:opacity-100 transition-opacity cursor-grab flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clipPath="url(#clip0_376_3320)">
                  <path d="M5.75 4.5C6.16421 4.5 6.5 4.16421 6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75C5 4.16421 5.33579 4.5 5.75 4.5Z" fill="black" />
                  <path d="M10.25 4.5C10.6642 4.5 11 4.16421 11 3.75C11 3.33579 10.6642 3 10.25 3C9.83579 3 9.5 3.33579 9.5 3.75C9.5 4.16421 9.83579 4.5 10.25 4.5Z" fill="black" />
                  <path d="M5.75 8.75C6.16421 8.75 6.5 8.41421 6.5 8C6.5 7.58579 6.16421 7.25 5.75 7.25C5.33579 7.25 5 7.58579 5 8C5 8.41421 5.33579 8.75 5.75 8.75Z" fill="black" />
                  <path d="M10.25 8.75C10.6642 8.75 11 8.41421 11 8C11 7.58579 10.6642 7.25 10.25 7.25C9.83579 7.25 9.5 7.58579 9.5 8C9.5 8.41421 9.83579 8.75 10.25 8.75Z" fill="black" />
                  <path d="M5.75 13C6.16421 13 6.5 12.6642 6.5 12.25C6.5 11.8358 6.16421 11.5 5.75 11.5C5.33579 11.5 5 11.8358 5 12.25C5 12.6642 5.33579 13 5.75 13Z" fill="black" />
                  <path d="M10.25 13C10.6642 13 11 12.6642 11 12.25C11 11.8358 10.6642 11.5 10.25 11.5C9.83579 11.5 9.5 11.8358 9.5 12.25C9.5 12.6642 9.83579 13 10.25 13Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_376_3320">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          ) : (
            <>
              <DashboardSelect value={selectedPeriod} onChange={onPeriodChange} />
              <OptionsDropdown />
            </>
          )}
        </div>
      </div>
      <CardContent className="flex-1 flex flex-col">
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

        <div
          className="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block mt-3 max-w-max
"
        >
          <p className="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">
            Peak traffic at 5 pm as expected
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallSMSVolume;
