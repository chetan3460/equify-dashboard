/**
 * Successful Transactions Metric Card Component
 *
 * This component displays the total count of successful transactions today
 * Chart Type: Horizontal bar chart with success count
 */

"use client";
import React, { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import DashboardSelect from "@/components/dasboard-select";
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import { providerObj, gradientSpecByName } from "./data";
import { getChartConfig } from "./config";
import { exportCsv } from "@/lib/csv";

// Format axis values (e.g., 15k, 1.2M)
const formatAxis = (n) => {
  if (n == null || n === "") return "";
  const v = Number(n);
  if (!Number.isFinite(v)) return String(n);
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + "M";
  if (v >= 1_000) return Math.round(v / 1_000) + "k";
  return v.toLocaleString();
};

const CustomTick = ({
  x,
  y,
  payload,
  textAnchor = "end",
  chartConfig,
  formatFn,
}) => {
  const raw = payload?.value;
  const display = typeof formatFn === "function" ? formatFn(raw) : raw;
  return (
    <text
      x={x}
      y={y}
      dy={4}
      textAnchor={textAnchor}
      fill={chartConfig.axis.tick.fill}
      fontSize={chartConfig.axis.tick.fontSize}
      className="text-xs font-normal"
    >
      {display}
    </text>
  );
};

export default function SuccessfulTransactions({
  height = 384,
  providerData,

  optionsMenuItems,
}) {
  const { theme } = useTheme();
  const { isGlobalDragMode } = useDragContext();
  const chartConfig = getChartConfig(theme);

  const data = useMemo(() => {
    const obj = providerData || providerObj;
    return Object.entries(obj)
      .filter(([k]) => k !== "lastUpdated")
      .map(([name, val]) => ({
        name,
        success: typeof val === "object" && val !== null ? val.success ?? 0 : 0,
      }))
      .sort((a, b) => b.success - a.success);
  }, [providerData]);

  return (
    <Card className="h-full flex flex-col">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>Successful transactions today</CardTitle>
            <CardDescription>
              Last updated (
              {(providerData && providerData.lastUpdated) ||
                providerObj.lastUpdated}
              )
            </CardDescription>
          </CardHeader>
          <div className="flex items-center gap-2">
            {isGlobalDragMode ? (
              <div className="opacity-75 hover:opacity-100 transition-opacity cursor-grab flex items-center">
                <DragHandleIcon />
              </div>
            ) : (
              <>
                <OptionsDropdown
                  items={optionsMenuItems}
                  onAction={(id) => {
                    if (id === "export")
                      exportCsv("successful-transactions.csv", data);
                  }}
                />
              </>
            )}
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col">
          <div style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                barCategoryGap="10%"
                margin={{ top: 8, right: 30, left: 10, bottom: 8 }}
              >
                <defs>
                  {data.map((d, i) => {
                    const spec =
                      gradientSpecByName[d.name] || gradientSpecByName.Airtel;
                    const id = `grad-${i}`;
                    if (spec.type === "radial") {
                      return (
                        <radialGradient
                          key={id}
                          id={id}
                          cx="50%"
                          cy="50%"
                          r="70%"
                        >
                          {spec.stops.map(([offset, color]) => (
                            <stop
                              key={offset}
                              offset={offset}
                              stopColor={color}
                            />
                          ))}
                        </radialGradient>
                      );
                    }
                    return (
                      <linearGradient
                        key={id}
                        id={id}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        gradientTransform={`rotate(${
                          spec.angle || 0
                        }, 0.5, 0.5)`}
                      >
                        {spec.stops.map(([offset, color]) => (
                          <stop
                            key={offset}
                            offset={offset}
                            stopColor={color}
                          />
                        ))}
                      </linearGradient>
                    );
                  })}
                </defs>

                <CartesianGrid
                  stroke={chartConfig.grid.stroke}
                  strokeDasharray={chartConfig.grid.strokeDasharray}
                  strokeWidth={chartConfig.grid.strokeWidth}
                />

                <XAxis
                  type="number"
                  tickFormatter={formatAxis}
                  axisLine={{ stroke: chartConfig.axis.stroke }}
                  tickLine={{ stroke: chartConfig.axis.stroke }}
                  tickMargin={10}
                  tick={(props) => (
                    <CustomTick
                      {...props}
                      chartConfig={chartConfig}
                      textAnchor="middle"
                      formatFn={formatAxis}
                    />
                  )}
                />

                <YAxis
                  type="category"
                  dataKey="name"
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
                />

                <Bar
                  dataKey="success"
                  barSize={chartConfig.bar.size}
                  radius={chartConfig.bar.radius}
                >
                  {data.map((d, i) => (
                    <Cell key={d.name} fill={`url(#grad-${i})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
