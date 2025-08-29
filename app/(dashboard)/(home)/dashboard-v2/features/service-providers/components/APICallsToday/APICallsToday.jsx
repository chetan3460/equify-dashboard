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
import OptionsDropdown from "@/components/OptionsDropdown";
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

export default function APICallsToday({ optionsMenuItems }) {
  const { isGlobalDragMode } = useDragContext();
  const { theme } = useTheme();
  const chartConfig = getChartConfig(theme);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>Total API calls today</CardTitle>
          <CardDescription>
            Last updated : {rawData.lastUpdated}
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
              <OptionsDropdown items={optionsMenuItems} />
            </>
          )}
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col">
        <div className="h-64">
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
