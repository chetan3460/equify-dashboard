"use client";
import React from "react";
import { useTheme } from "next-themes";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "../shared/CustomTooltip";
import CustomDot from "../shared/CustomDot";
import ActiveDot from "../shared/ActiveDot";
import { formatYAxis } from "../../utils/utils";
import { SMS_COLORS, LEGEND_ITEMS, CHART_CONFIG, THEME_COLORS } from "../../utils/constants";
import SMSLegend from "../shared/SMSLegend";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DashboardSelect from "@/components/dasboard-select";
import OptionsDropdown from "@/components/OptionsDropdown";
import { useDragContext } from "@/components/draggable/DragProvider";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";

const CustomTick = ({ x, y, payload, mode, isYAxis = false }) => (
  <text x={x} y={isYAxis ? y : y + 10} textAnchor={isYAxis ? "end" : "middle"} className={`text-[11px] font-poppins ${mode === "dark" ? "fill-gray-300" : "fill-[#201D1A]"}`}>
    {payload.value}
  </text>
);

const OverallSMSVolume = ({ smsData, height = CHART_CONFIG.DEFAULT_HEIGHT, selectedPeriod = "Today", onPeriodChange, selectOptions = ["Today", "This week", "This month"], optionsMenuItems, }) => {
  const { theme: mode } = useTheme();
  const { isGlobalDragMode } = useDragContext();

  const getChartData = (period) => {
    switch (period) {
      case "Today":
        return [
          { time: "10:00", total: 45000, delivered: 38000, failed: 7000, retry: 0 },
          { time: "11:00", total: 89000, delivered: 72000, failed: 17000, retry: 0 },
          { time: "12:00", total: smsData?.["12:00"]?.total || 155130, delivered: smsData?.["12:00"]?.delivered || 77434, failed: smsData?.["12:00"]?.failed || 22575, retry: smsData?.["12:00"]?.retry || 55121 },
          { time: "13:00", total: smsData?.["13:00"]?.total || 155130, delivered: smsData?.["13:00"]?.delivered || 77434, failed: smsData?.["13:00"]?.failed || 22575, retry: smsData?.["13:00"]?.retry || 55121 },
          { time: "14:00", total: smsData?.["14:00"]?.total || 155130, delivered: smsData?.["14:00"]?.delivered || 77434, failed: smsData?.["14:00"]?.failed || 22575, retry: smsData?.["14:00"]?.retry || 55121 },
          { time: "15:00", total: smsData?.["15:00"]?.total || 155130, delivered: smsData?.["15:00"]?.delivered || 77434, failed: smsData?.["15:00"]?.failed || 22575, retry: smsData?.["15:00"]?.retry || 55121 },
          { time: "16:00", total: 140000, delivered: 110000, failed: 30000, retry: 55121 },
          { time: "17:00", total: 95000, delivered: 78000, failed: 17000, retry: 12200 },
        ];
      case "This week":
        return [
          { time: "Mon", total: 280000, delivered: 260000, failed: 20000, retry: 15000 },
          { time: "Tue", total: 320000, delivered: 300000, failed: 20000, retry: 18000 },
          { time: "Wed", total: 290000, delivered: 270000, failed: 20000, retry: 16000 },
          { time: "Thu", total: 350000, delivered: 330000, failed: 20000, retry: 22000 },
          { time: "Fri", total: 420000, delivered: 400000, failed: 20000, retry: 28000 },
          { time: "Sat", total: 220000, delivered: 210000, failed: 10000, retry: 14000 },
          { time: "Sun", total: 180000, delivered: 170000, failed: 10000, retry: 12000 },
        ];
      case "This month":
        return [
          { time: "Week 1", total: 1850000, delivered: 1720000, failed: 130000, retry: 280000 },
          { time: "Week 2", total: 2120000, delivered: 1980000, failed: 140000, retry: 320000 },
          { time: "Week 3", total: 1980000, delivered: 1850000, failed: 130000, retry: 290000 },
          { time: "Week 4", total: 2350000, delivered: 2210000, failed: 140000, retry: 350000 },
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
          <CardDescription>Last updated ({smsData?.lastUpdated || "N/A"})</CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="opacity-75 hover:opacity-100 transition-opacity cursor-grab flex items-center">
              <DragHandleIcon />
            </div>
          ) : (
            <>
              <DashboardSelect value={selectedPeriod} onChange={onPeriodChange} options={selectOptions} />
              <OptionsDropdown items={optionsMenuItems} />
            </>
          )}
        </div>
      </div>
      <CardContent className="flex-1 flex flex-col">
        <SMSLegend />
        <div className="relative" style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: CHART_CONFIG.MARGIN.TOP, right: CHART_CONFIG.MARGIN.RIGHT, left: CHART_CONFIG.MARGIN.LEFT, bottom: CHART_CONFIG.MARGIN.BOTTOM }}>
              <CartesianGrid strokeDasharray={CHART_CONFIG.GRID_DASH} stroke={mode === "dark" ? THEME_COLORS.DARK.GRID : THEME_COLORS.LIGHT.GRID} horizontal vertical={true} />
              <XAxis dataKey="time" axisLine={{ stroke: "#666", strokeWidth: 0.475 }} tickLine={{ stroke: "#666", strokeWidth: 0.475 }} tick={(props) => <CustomTick {...props} mode={mode} />} />
              <YAxis tickFormatter={formatYAxis} axisLine={{ stroke: "#666", strokeWidth: 0.475 }} tickLine={{ stroke: "#666", strokeWidth: 0.475 }} tick={(props) => <CustomTick {...props} mode={mode} isYAxis={true} />} />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                {LEGEND_ITEMS.map(({ key }) => (
                  <linearGradient key={key} id={`${key}-gradient`} x1="0" y1="0" x2="1" y2="0">
                    {SMS_COLORS[key].stops.map((stop, i) => (
                      <stop key={i} offset={stop.offset} stopColor={stop.color} />
                    ))}
                  </linearGradient>
                ))}
              </defs>
              {LEGEND_ITEMS.map(({ key, dataKey, label }) => (
                <Line key={dataKey} type="monotone" dataKey={dataKey} name={label} stroke={`url(#${key}-gradient)`} strokeWidth={CHART_CONFIG.STROKE_WIDTH} dot={<CustomDot />} activeDot={(props) => <ActiveDot {...props} stroke={SMS_COLORS[key].solid} gradientId={`${key}-gradient`} />} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block mt-3 max-w-max">
          <p className="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">Peak traffic at 5 pm as expected</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallSMSVolume;

