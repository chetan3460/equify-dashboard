/*
  Component: DeliveryReports
  Purpose: Stacked bar chart for messages sent vs delivery reports with custom legend and tooltip.
  Notes: Period selector, export action, and DragProvider handle; theme-aware colors via config.
  Data/Config: ./data (series, lastUpdated), ./config (legend colors, axis styling).
*/
import React, { useState } from "react";

import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import DashboardSelect from "@/app/(dashboard)/(home)/dashboard-v2/ui/dashboard-select";
import OptionsDropdown from "@/app/(dashboard)/(home)/dashboard-v2/ui/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "@/ui/icons";
import { exportCsv } from "@/lib/csv";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { rawData, chartData } from "./data";
import { getChartConfig } from "./config";
import { formatCompactNumber } from "@/lib/number";

const CustomTick = ({
  x,
  y,
  payload,
  vertical = false,
  rotate = false,
  chartConfig,
}) => {
  const value =
    vertical && typeof payload.value === "number"
      ? formatCompactNumber(payload.value)
      : payload.value;

  if (rotate) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          transform="rotate(-90)"
          textAnchor="end"
          className="text-xs font-normal"
          fill={chartConfig.axis.tick.fill}
          dx={-6}
        >
          {value}
        </text>
      </g>
    );
  }

  return (
    <text
      x={x}
      y={y + (vertical ? 0 : 10)}
      textAnchor={vertical ? "end" : "middle"}
      className="text-xs font-normal"
      fill={chartConfig.axis.tick.fill}
    >
      {value}
    </text>
  );
};

const CustomTooltip = ({ active, payload, chartConfig }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-[4px] p-2"
        style={{
          backgroundColor: chartConfig.tooltip.contentStyle.backgroundColor,
          border: chartConfig.tooltip.contentStyle.border,
        }}
      >
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between gap-2 items-center">
            <span
              className="text-xs font-normal"
              style={{ color: chartConfig.tooltip.labelStyle.color }}
            >
              {entry.name}:
            </span>
            <span
              className="text-xs font-normal"
              style={{ color: chartConfig.tooltip.itemStyle.color }}
            >
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ chartConfig }) => (
  <div className="flex items-center gap-4 mb-2">
    <div className="flex items-center gap-2">
      <span
        style={{
          width: 23,
          height: 8,
          borderRadius: "1.9px",
          background: chartConfig.legend.msgSubmittedBg,
        }}
      />
      <span className="text-xs text-default-900">Messages Sent</span>
    </div>
    <div className="flex items-center gap-2">
      <span
        style={{
          width: 23,
          height: 8,
          borderRadius: "1.9px",
          background: chartConfig.legend.dlrReceivedBg,
        }}
      />
      <span className="text-xs text-default-900">Delivery Reports</span>
    </div>
  </div>
);

export default function DeliveryReports({
  deptData,
  selectedPeriod = "Today",
  onPeriodChange,
  height = 384,
  selectOptions = ["Today", "This week", "This month"],
  optionsMenuItems,
}) {
  const { isGlobalDragMode } = useDragContext();
  const { theme } = useTheme();
  const chartConfig = getChartConfig(theme);


  const wrapperStyle =
    typeof height === "number" ? { height: `${height}px` } : { height: "100%" };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Delivery Reports Received</CardTitle>
          <CardDescription>
            {" "}
            Last updated ({rawData.lastUpdated})
          </CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="cursor-grab flex items-center">
              <DragHandleIcon />
            </div>
          ) : (
            <>
              <DashboardSelect
                value={selectedPeriod}
                onChange={onPeriodChange}
                options={selectOptions}
              />
              <OptionsDropdown
                items={optionsMenuItems}
                onAction={(id) => {
                  if (id === "export") exportCsv("delivery-reports.csv", chartData);
                }}
              />
            </>
          )}
        </div>
      </div>

      <CardContent className="flex-1">
        <div style={wrapperStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 24 }}
            >
              <CartesianGrid
                stroke={chartConfig.grid.stroke}
                strokeDasharray="3 3"
                vertical={true}
              />
              <XAxis
                dataKey="name"
                interval={0}
                tickMargin={4}
                height={100}
                tick={(props) => (
                  <CustomTick {...props} chartConfig={chartConfig} rotate />
                )}
              />
              <YAxis tick={<CustomTick chartConfig={chartConfig} vertical />} />
              <Tooltip
                content={<CustomTooltip chartConfig={chartConfig} />}
                cursor={false}
              />

              {/* Define Gradients */}
              <defs>
                {chartConfig.gradients.map((grad) =>
                  grad.type === "linearGradient" ? (
                    <linearGradient key={grad.id} id={grad.id} {...grad.props}>
                      {grad.stops.map((stop, i) => (
                        <stop
                          key={i}
                          offset={stop.offset}
                          stopColor={stop.color}
                        />
                      ))}
                    </linearGradient>
                  ) : grad.type === "radialGradient" ? (
                    <radialGradient key={grad.id} id={grad.id} {...grad.props}>
                      {grad.stops.map((stop, i) => (
                        <stop
                          key={i}
                          offset={stop.offset}
                          stopColor={stop.color}
                        />
                      ))}
                    </radialGradient>
                  ) : null
                )}
              </defs>

              {/* Bars */}
              <Bar
                barSize={16}
                dataKey="msgSubmitted"
                radius={[4, 4, 0, 0]}
                fill="url(#gradMsg)"
              />
              <Bar
                barSize={16}
                dataKey="dlrReceived"
                radius={[4, 4, 0, 0]}
                fill="url(#gradDlr)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <CustomLegend chartConfig={chartConfig} />
      </CardContent>
    </Card>
  );
}
