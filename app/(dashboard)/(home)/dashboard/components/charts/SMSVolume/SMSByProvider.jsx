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

const ChartInsight = ({ message }) => (
  <div
    className="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block mt-3 max-w-max
"
  >
    <div className="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">
      {message}
    </div>
  </div>
);

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  CartesianGrid,
  Cell,
} from "recharts";

const providerObj = {
  lastUpdated: "01:15:45",
  Airtel: { total: 25013 },
  Jio: { total: 55035 },
  VI: { total: 19971 },
  Bsnl: { total: 25013 },
  Infobip: { total: 55035 },
  Tanla: { total: 19971 },
  Synch: { total: 55035 },
  Equence: { total: 19971 },
};

const formatAxis = (n) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "K";
  return n.toLocaleString();
};

const gradientSpecByName = {
  Airtel: {
    type: "radial",
    stops: [
      ["0%", "#FF6A88"],
      ["100%", "#FF99AC"],
    ],
  },
  Jio: {
    type: "linear",
    angle: 268,
    stops: [
      ["0%", "#3EECAC"],
      ["100%", "#42A5F5"],
    ],
  },
  VI: {
    type: "linear",
    angle: 270,
    stops: [
      ["0%", "#FDBB2D"],
      ["100%", "#F77500"],
    ],
  },
  Bsnl: {
    type: "linear",
    angle: 79,
    stops: [
      ["0%", "#42A5F5"],
      ["100%", "#18C9EC"],
    ],
  },
  Infobip: {
    type: "linear",
    angle: 104,
    stops: [
      ["0%", "#A259FF"],
      ["100%", "#C084FC"],
    ],
  },
  Tanla: {
    type: "linear",
    angle: 167,
    stops: [
      ["0%", "#FFE159"],
      ["100%", "#FBD217"],
    ],
  },
  Synch: {
    type: "linear",
    angle: 104,
    stops: [
      ["0%", "#60C345"],
      ["100%", "#5CDA3A"],
    ],
  },
  Equence: {
    type: "linear",
    angle: 268,
    stops: [
      ["0%", "#3EECAC"],
      ["100%", "#42A5F5"],
    ],
  },
};

// Custom tick (X/Y axes) with theme-based color
const CustomTick = ({ x, y, payload, textAnchor = "end", theme }) => {
  const fillColor = theme === "dark" ? "#E5E5E5" : "#111827";
  return (
    <text
      x={x}
      y={y}
      dy={4}
      textAnchor={textAnchor}
      fill={fillColor}
      className="text-xs font-normal"
    >
      {payload.value}
    </text>
  );
};

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

  const data = useMemo(() => {
    const obj = providerData || providerObj;
    return Object.entries(obj)
      .filter(([k]) => k !== "lastUpdated")
      .map(([name, val]) => {
        const total =
          typeof val === "object" && val !== null ? val.total ?? 0 : 0;
        return { name, total };
      })
      .sort((a, b) => b.total - a.total);
  }, [providerData]);

  const EndLabel = (props) => {
    const { x, y, width, height, value } = props;
    const fillColor = theme === "dark" ? "#E5E5E5" : "#111827";
    return (
      <text
        x={x + width + 8}
        y={y + height / 2 + 4}
        textAnchor="start"
        fontSize={12}
        fill={fillColor}
        className="font-medium"
      >
        {value.toLocaleString()}
      </text>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>SMS volume by service provider</CardTitle>
            <CardDescription>
              Last updated (hh:mm:ss):{" "}
              {(providerData && providerData.lastUpdated) ||
                providerObj.lastUpdated}
            </CardDescription>
          </CardHeader>
          <div className="flex items-center gap-2">
            {isGlobalDragMode ? (
              <div className="opacity-75 hover:opacity-100 transition-opacity cursor-grab flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_376_3320)">
                    <path
                      d="M5.75 4.5C6.16421 4.5 6.5 4.16421 6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75C5 4.16421 5.33579 4.5 5.75 4.5Z"
                      fill="black"
                    />
                    <path
                      d="M10.25 4.5C10.6642 4.5 11 4.16421 11 3.75C11 3.33579 10.6642 3 10.25 3C9.83579 3 9.5 3.33579 9.5 3.75C9.5 4.16421 9.83579 4.5 10.25 4.5Z"
                      fill="black"
                    />
                    <path
                      d="M5.75 8.75C6.16421 8.75 6.5 8.41421 6.5 8C6.5 7.58579 6.16421 7.25 5.75 7.25C5.33579 7.25 5 7.58579 5 8C5 8.41421 5.33579 8.75 5.75 8.75Z"
                      fill="black"
                    />
                    <path
                      d="M10.25 8.75C10.6642 8.75 11 8.41421 11 8C11 7.58579 10.6642 7.25 10.25 7.25C9.83579 7.25 9.5 7.58579 9.5 8C9.5 8.41421 9.83579 8.75 10.25 8.75Z"
                      fill="black"
                    />
                    <path
                      d="M5.75 13C6.16421 13 6.5 12.6642 6.5 12.25C6.5 11.8358 6.16421 11.5 5.75 11.5C5.33579 11.5 5 11.8358 5 12.25C5 12.6642 5.33579 13 5.75 13Z"
                      fill="black"
                    />
                    <path
                      d="M10.25 13C10.6642 13 11 12.6642 11 12.25C11 11.8358 10.6642 11.5 10.25 11.5C9.83579 11.5 9.5 11.8358 9.5 12.25C9.5 12.6642 9.83579 13 10.25 13Z"
                      fill="black"
                    />
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
                data={data}
                layout="vertical"
                barCategoryGap="10%" // <-- sets 12px gap approximately
                margin={{ top: 8, right: 30, left: 0, bottom: 8 }}
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
                  stroke={theme === "dark" ? "#666" : "#DADADA"}
                  strokeDasharray="3 3"
                  strokeWidth={0.5}
                />

                <XAxis
                  type="number"
                  tickFormatter={formatAxis}
                  axisLine={{ stroke: "#666" }}
                  tickLine={{ stroke: "#666" }}
                  tick={(props) => (
                    <CustomTick {...props} theme={theme} textAnchor="middle" />
                  )}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={{ stroke: "#666" }}
                  tickLine={{ stroke: "#666" }}
                  tick={(props) => <CustomTick {...props} theme={theme} />}
                />

                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#33445B" : "#fff",
                    borderRadius: "4px",
                    border: "1px solid #4E6079",
                    border:
                      theme === "dark" ? "1px solid #4E6079" : "1px solid #fff", // <-- dynamic border
                  }}
                  labelStyle={{
                    color: theme === "dark" ? "#E5E2DF" : "#201D1A",
                  }}
                  itemStyle={{
                    color: theme === "dark" ? "#E5E2DF" : "#201D1A",
                  }}
                />

                <Bar dataKey="total" barSize={20} radius={[0, 4, 4, 0]}>
                  {data.map((d, i) => (
                    <Cell key={d.name} fill={`url(#grad-${i})`} />
                  ))}
                  {/* <LabelList dataKey="total" content={EndLabel} /> */}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <ChartInsight message="Overall volume 10% higher than last week" />
        </CardContent>
      </div>
    </Card>
  );
}
