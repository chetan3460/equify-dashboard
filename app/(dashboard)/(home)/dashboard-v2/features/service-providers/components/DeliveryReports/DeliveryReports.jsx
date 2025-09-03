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
import DashboardSelect from "@/components/dasboard-select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/plain-dropdown-menu";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";

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

const CustomTick = ({ x, y, payload, vertical = false, chartConfig }) => (
  <text
    x={x}
    y={y + (vertical ? 0 : 10)}
    textAnchor={vertical ? "end" : "middle"}
    className="text-xs font-normal"
    fill={chartConfig.axis.tick.fill}
  >
    {payload.value}
  </text>
);

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
  const [currentPeriod, setCurrentPeriod] = useState(selectedPeriod);

  const resolvedOptions = (optionsMenuItems && optionsMenuItems.length > 0)
    ? optionsMenuItems
    : [
        { id: "resize", label: "Resize" },
        { id: "export", label: "Export" },
        { id: "settings", label: "Settings" },
        { id: "refresh", label: "Refresh" },
      ];

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
    onPeriodChange?.(newPeriod);
  };
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
                value={currentPeriod}
                onChange={handlePeriodChange}
                options={selectOptions}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label="Open options"
                    className="text-default-900 inline-flex items-center justify-center h-8 w-8 rounded hover:bg-default-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_621_439)">
                        <path
                          d="M8 9.25C8.41421 9.25 8.75 8.91421 8.75 8.5C8.75 8.08579 8.41421 7.75 8 7.75C7.58579 7.75 7.25 8.08579 7.25 8.5C7.25 8.91421 7.58579 9.25 8 9.25Z"
                          fill="currentColor"
                        />
                        <path
                          d="M8 5C8.41421 5 8.75 4.66421 8.75 4.25C8.75 3.83579 8.41421 3.5 8 3.5C7.58579 3.5 7.25 3.83579 7.25 4.25C7.25 4.66421 7.58579 5 8 5Z"
                          fill="currentColor"
                        />
                        <path
                          d="M8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75C8.75 12.3358 8.41421 12 8 12C7.58579 12 7.25 12.3358 7.25 12.75C7.25 13.1642 7.58579 13.5 8 13.5Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_621_439">
                          <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  {resolvedOptions.map((item, idx) => (
                    <DropdownMenuItem
                      key={item.id || idx}
                      className="px-2 py-1.5 text-sm"
                      onClick={item.onClick}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      <CardContent className="flex-1">
        <div className="h-80">
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
                tickMargin={8}
                height={40}
                tick={<CustomTick chartConfig={chartConfig} />}
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
                dataKey="msgSubmitted"
                radius={[4, 4, 0, 0]}
                fill="url(#gradMsg)"
              />
              <Bar
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
