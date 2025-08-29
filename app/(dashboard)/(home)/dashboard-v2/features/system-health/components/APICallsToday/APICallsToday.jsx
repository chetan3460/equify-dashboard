/**
 * API Calls Today Metric Card Component (System Health)
 *
 * This component displays the total number of API calls for system health monitoring
 * Chart Type: Metric card with system health focus
 * Dummy Data: API calls with system health indicators
 */

"use client";
import React, { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { networkRaw, networkData } from "./data";
import { getChartConfig } from "./config";

// Format axis values (1K, 1M etc.)
const formatMs = (n) => {
  if (n == null || Number.isNaN(n)) return "-";
  if (n < 1) return `${n.toFixed(3)} ms`;
  if (n < 10) return `${n.toFixed(1)} ms`;
  return `${Math.round(n)} ms`;
};

const CustomTick = ({ x, y, payload, textAnchor = "end", chartConfig }) => (
  <text
    x={x}
    y={y}
    dy={4}
    textAnchor={textAnchor}
    fill={chartConfig.axis.tick.fill}
    fontSize={chartConfig.axis.tick.fontSize}
    className="text-xs font-normal"
  >
    {payload.value}
  </text>
);

export default function SuccessfulTransactions({
  height = 384,
  optionsMenuItems,
}) {
  const { theme } = useTheme();
  const { isGlobalDragMode } = useDragContext();
  const chartConfig = getChartConfig(theme);

  const data = networkData;

  return (
    <Card className="h-full flex flex-col">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>Network statistics</CardTitle>
            <CardDescription>
              Last updated: {networkRaw.lastUpdated}
            </CardDescription>
          </CardHeader>
          <div className="flex items-center gap-2">
            {isGlobalDragMode ? (
              <div className="opacity-75 hover:opacity-100 transition-opacity cursor-grab flex items-center">
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
                <OptionsDropdown items={optionsMenuItems} />
              </>
            )}
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col">
          <div style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 8, right: 30, left: 0, bottom: 8 }}
              >
                <CartesianGrid
                  stroke={chartConfig.grid.stroke}
                  strokeDasharray={chartConfig.grid.strokeDasharray}
                  strokeWidth={chartConfig.grid.strokeWidth}
                />

                <XAxis
                  dataKey="time"
                  axisLine={{ stroke: chartConfig.axis.stroke }}
                  tickLine={{ stroke: chartConfig.axis.stroke }}
                  tick={(props) => (
                    <CustomTick
                      {...props}
                      chartConfig={chartConfig}
                      textAnchor="middle"
                    />
                  )}
                />

                <YAxis
                  tickFormatter={(v) => formatMs(v)}
                  axisLine={{ stroke: chartConfig.axis.stroke }}
                  tickLine={{ stroke: chartConfig.axis.stroke }}
                  tick={(props) => (
                    <CustomTick {...props} chartConfig={chartConfig} />
                  )}
                />

                <Tooltip
                  cursor={chartConfig.tooltip.cursor}
                  contentStyle={chartConfig.tooltip.contentStyle}
                  labelStyle={chartConfig.tooltip.labelStyle}
                  itemStyle={chartConfig.tooltip.itemStyle}
                  formatter={(value) => [formatMs(value), "Latency"]}
                />

                <Area
                  type="monotone"
                  stackId="1"
                  dataKey="value"
                  stroke={chartConfig.series.network.stroke}
                  fill={chartConfig.series.network.fill}
                  fillOpacity={chartConfig.area.fillOpacity}
                  strokeWidth={chartConfig.area.strokeWidth}
                  dot={false}
                  activeDot={{ r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
