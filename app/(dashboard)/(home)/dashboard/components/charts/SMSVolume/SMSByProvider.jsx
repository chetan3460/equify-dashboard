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
import DashboardSelect from "@/components/dasboard-select";
import OptionsDropdown from "@/components/OptionsDropdown";

const ChartInsight = ({ message }) => (
  <div className="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block mt-3">
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

export default function SMSByProvider() {
  const { theme } = useTheme();

  const data = useMemo(() => {
    return Object.entries(providerObj)
      .filter(([k]) => k !== "lastUpdated")
      .map(([name, { total }]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);
  }, []);

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
    <Card>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>SMS volume by service provider</CardTitle>
            <CardDescription>
              Last updated (hh:mm:ss): {providerObj.lastUpdated}
            </CardDescription>
          </CardHeader>
          <div className="flex items-center gap-2">
            <DashboardSelect />
            <OptionsDropdown />
          </div>
        </div>

        <CardContent>
          <div style={{ height: 384 }}>
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
