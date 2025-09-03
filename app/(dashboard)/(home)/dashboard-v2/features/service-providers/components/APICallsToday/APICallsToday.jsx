/**
 * Total API Calls Today Chart
 *
 * Single line chart showing API call counts over time.
 */
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChevronDown from "@/components/icons/ChevronDown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/plain-dropdown-menu";
import { useDragContext } from "@/components/draggable/DragProvider";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useTheme } from "next-themes";
import { rawData, chartData } from "./data";
import { getChartConfig } from "./config";

const CustomTick = ({ x, y, payload, vertical = false, chartConfig }) => {
  return (
    <text
      x={x}
      y={y + (vertical ? 0 : 10)} // push X-axis ticks down
      textAnchor={vertical ? "end" : "middle"}
      className="text-xs font-normal"
      fill={chartConfig.axis.tick.fill}
    >
      {payload.value}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label, chartConfig }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-[4px] p-2 "
        style={{
          backgroundColor: chartConfig.tooltip.contentStyle.backgroundColor,
          border: chartConfig.tooltip.contentStyle.border,
        }}
      >
        <p
          className="text-xs font-medium mb-1"
          style={{ color: chartConfig.tooltip.labelStyle.color }}
        >
          {label}
        </p>
        {payload.map((entry, index) => (
          <p
            key={`tooltip-item-${index}`}
            className="text-xs font-bold"
            style={{ color: chartConfig.tooltip.itemStyle.color }}
          >
            {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function APICallsToday({ optionsMenuItems, height = "100%" }) {
  const { isGlobalDragMode } = useDragContext();
  const { theme } = useTheme();
  const chartConfig = getChartConfig(theme);

  // Support number (pixels) or string (e.g., "auto" -> fill parent)
  const wrapperStyle =
    typeof height === "number" ? { height: `${height}px` } : { height: "100%" };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Total API calls today</CardTitle>
          <CardDescription>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    color="secondary"
                    size="xs"
                    className="inline-flex items-center gap-1"
                  >
                    Server 1
                    <ChevronDown className="ml-1" width={10} height={6} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Select server</DropdownMenuLabel>
                  <DropdownMenuItem>Server 1</DropdownMenuItem>
                  <DropdownMenuItem>Server 2</DropdownMenuItem>
                  <DropdownMenuItem>Server 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    color="secondary"
                    size="xs"
                    className="inline-flex items-center gap-1"
                  >
                    Percentage
                    <ChevronDown className="ml-1" width={10} height={6} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Display</DropdownMenuLabel>
                  <DropdownMenuItem>Percentage</DropdownMenuItem>
                  <DropdownMenuItem>Count</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* 3-dots options menu using custom plain-dropdown-menu */}
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
                <DropdownMenuContent align="end" className="bg-white rounded-[4px] shadow-md p-2 w-40">
                  <DropdownMenuLabel className="px-2 py-1 text-xs text-default-700">Options</DropdownMenuLabel>
                  {((items) => (
                    (items && items.length > 0 ? items : [
                      { id: "resize", label: "Resize" },
                      { id: "export", label: "Export" },
                      { id: "settings", label: "Settings" },
                      { id: "refresh", label: "Refresh" },
                    ]).map((item, idx) => (
                      <DropdownMenuItem
                        key={item.id || idx}
                        className="px-2 py-1.5 text-sm"
                        onClick={item.onClick}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    ))
                  ))(optionsMenuItems)}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col">
        <div style={wrapperStyle}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                stroke={chartConfig.grid.stroke}
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="time"
                stroke={chartConfig.axis.stroke}
                tick={<CustomTick chartConfig={chartConfig} />}
              />
              <YAxis
                stroke={chartConfig.axis.stroke}
                tick={<CustomTick chartConfig={chartConfig} vertical />}
              />
              <Tooltip
                cursor={chartConfig.tooltip.cursor}
                content={
                  <CustomTooltip chartConfig={chartConfig} cursor={false} />
                }
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartConfig.lineColor}
                strokeWidth={chartConfig.strokeWidth}
                dot={chartConfig.dot}
                activeDot={chartConfig.activeDot}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
