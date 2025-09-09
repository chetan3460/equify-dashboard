"use client";
import React, { useState, useEffect } from "react";
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
import { formatYAxis } from "../../utils/utils";
import { SMS_COLORS, LEGEND_ITEMS } from "../../utils/constants";
import { CHART_CONFIG, THEME_COLORS } from "./config";
import { getChartData } from "./data";
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
import { exportCsv } from "@/lib/csv";
import { useDragContext } from "@/components/draggable/DragProvider";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";

const CustomTick = ({ x, y, payload, mode, isYAxis = false }) => (
  <text
    x={x}
    y={isYAxis ? y : y + 10}
    textAnchor={isYAxis ? "end" : "middle"}
    className={`text-[11px] font-poppins ${
      mode === "dark" ? "fill-gray-300" : "fill-[#201D1A]"
    }`}
  >
    {isYAxis && typeof payload?.value === "number"
      ? formatYAxis(payload.value)
      : payload?.value}
  </text>
);

const OverallSMSVolume = ({
  smsData,
  height = CHART_CONFIG.DEFAULT_HEIGHT,
  selectedPeriod = "Today",
  onPeriodChange,
  selectOptions = ["Today", "This week", "This month"],
  optionsMenuItems,
}) => {
  const { theme: mode } = useTheme();
  const { isGlobalDragMode } = useDragContext();

  // Manage selected period: use parent-controlled value if handler provided, otherwise local state
  const [internalPeriod, setInternalPeriod] = useState(
    selectedPeriod || "Today"
  );
  useEffect(() => {
    setInternalPeriod(selectedPeriod || "Today");
  }, [selectedPeriod]);
  const effectivePeriod = onPeriodChange ? selectedPeriod : internalPeriod;

  const chartData = getChartData(effectivePeriod, smsData);

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
            <div className=" cursor-grab flex items-center">
              <DragHandleIcon />
            </div>
          ) : (
            <>
              <DashboardSelect
                value={effectivePeriod}
                onChange={(opt) =>
                  onPeriodChange ? onPeriodChange(opt) : setInternalPeriod(opt)
                }
                options={selectOptions}
              />
              <OptionsDropdown
                items={optionsMenuItems}
                onAction={(id) => {
                  if (id === "export") exportCsv("overall-sms-volume.csv", chartData);
                }}
              />
            </>
          )}
        </div>
      </div>
      <CardContent className="flex-1 flex flex-col justify-between">
        <SMSLegend />
        <div className="relative" style={{ height: `${height}px` }}>
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
              <XAxis
                dataKey="time"
                axisLine={{ stroke: "#666", strokeWidth: 1 }}
                tickLine={{ stroke: "#666", strokeWidth: 1 }}
                tick={(props) => <CustomTick {...props} mode={mode} />}
              />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={{ stroke: "#666", strokeWidth: 1 }}
                tickLine={{ stroke: "#666", strokeWidth: 1 }}
                tick={(props) => (
                  <CustomTick {...props} mode={mode} isYAxis={true} />
                )}
              />
              <Tooltip content={<CustomTooltip />} />
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
        <div className="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block max-w-max">
          <p className="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">
            Peak traffic at 5 pm as expected
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallSMSVolume;
