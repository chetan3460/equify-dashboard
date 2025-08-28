"use client";
import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { chartData } from "./data";
import { getChartConfig } from "./config";

const CustomTick = ({ x, y, payload, vertical = false, chartConfig }) => (
  // <text
  //   x={x}
  //   y={y + (vertical ? 0 : 10)}
  //   textAnchor={vertical ? "end" : "middle"}
  //   className="text-xs font-normal"
  //   fill={chartConfig.axis.tick.fill}
  // >
  //   {payload.value}
  // </text>
  <text
    x={x}
    y={y}
    dy={vertical ? 4 : 16}
    dx={vertical ? -10 : 0}
    textAnchor={vertical ? "end" : "middle"}
    fill={chartConfig.axis.tick.fill}
    fontSize={chartConfig.axis.tick.fontSize}
  >
    {payload.value}ms
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
        {payload.map((entry, i) => (
          <div key={i} className="flex justify-between gap-2">
            <span style={{ color: chartConfig.tooltip.labelStyle.color }}>
              {entry.name}:
            </span>
            <span style={{ color: chartConfig.tooltip.itemStyle.color }}>
              {entry.value} ms
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ---------- Custom Shape (Triangle Bar) ----------
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
          ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
    y + height
  }
          ${x + width}, ${y + height}
          Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function AvgLatency({ optionsMenuItems }) {
  const { isGlobalDragMode } = useDragContext();
  const { theme } = useTheme();
  const chartConfig = getChartConfig(theme);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Avg latency by service provider</CardTitle>
            <Badge color="live">Live</Badge>
          </div>
          <CardDescription>
            Last updated: {new Date().toLocaleTimeString()}
          </CardDescription>
        </CardHeader>

        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="cursor-grab flex items-center">
              <DragHandleIcon />
            </div>
          ) : (
            <OptionsDropdown items={optionsMenuItems} />
          )}
        </div>
      </div>

      <CardContent className="flex-1">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                stroke={chartConfig.grid.stroke}
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="name"
                interval={0}
                tick={<CustomTick chartConfig={chartConfig} />}
                height={40}
              />
              <YAxis
                // tick={<CustomTick chartConfig={chartConfig} vertical />}
                // tickFormatter={(value) => `${value}ms`}
                // stroke={chartConfig.axis.stroke}
                stroke={chartConfig.axis.stroke}
                tick={<CustomTick chartConfig={chartConfig} vertical />}
                // label={{ value: "ms", position: "insideLeft", angle: -90 }}
              />
              <Tooltip
                content={<CustomTooltip chartConfig={chartConfig} />}
                cursor={false}
              />

              {/* Gradients */}
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
                  ) : (
                    <radialGradient key={grad.id} id={grad.id} {...grad.props}>
                      {grad.stops.map((stop, i) => (
                        <stop
                          key={i}
                          offset={stop.offset}
                          stopColor={stop.color}
                        />
                      ))}
                    </radialGradient>
                  )
                )}
              </defs>

              <Bar dataKey="value" shape={<TriangleBar />}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={`url(#${entry.gradientId})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
