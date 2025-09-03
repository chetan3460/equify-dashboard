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

import { getProviderChartData, gradientSpecByName } from "./data";
import { getChartConfig } from "./config";

// Format axis values (1K, 1M etc.)
const formatAxis = (n) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "K";
  return n.toLocaleString();
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

export default function SMSByProvider({
  height = 384,
  providerData,
  selectedPeriod,
  onPeriodChange,
  selectOptions = ["Today", "This week", "This month"],
  optionsMenuItems,
}) {
  const { theme } = useTheme();
  const { isGlobalDragMode } = useDragContext();
  const chartConfig = getChartConfig(theme);

  const { chartData, lastUpdated } = useMemo(
    () => getProviderChartData(providerData),
    [providerData]
  );

  return (
    <Card className="h-full flex flex-col">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>SMS volume by service provider</CardTitle>
            <CardDescription>Last updated ({lastUpdated})</CardDescription>
          </CardHeader>
          <div className="flex items-center gap-2">
            {isGlobalDragMode ? (
              <div className="opacity-75 hover:opacity-100 transition-opacity cursor-grab flex items-center">
                <DragHandleIcon />
              </div>
            ) : (
              <>
                <DashboardSelect
                  value={selectedPeriod}
                  onChange={onPeriodChange}
                  options={selectOptions}
                />
                <OptionsDropdown items={optionsMenuItems} />
              </>
            )}
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col">
          <div style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                barCategoryGap="10%"
                margin={{ top: 8, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  {chartData.map((d, i) => {
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
                  tickMargin={10}
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
                  type="category"
                  dataKey="name"
                  tickMargin={10}
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

                <Bar dataKey="total" barSize={20} radius={[0, 4, 4, 0]}>
                  {chartData.map((d, i) => (
                    <Cell key={d.name} fill={`url(#grad-${i})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block mt-3 max-w-max">
            <p className="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">
              Overall volume 10% higher than last week
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
