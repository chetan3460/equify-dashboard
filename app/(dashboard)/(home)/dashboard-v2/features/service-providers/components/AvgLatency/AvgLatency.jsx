"use client";
/*
  Component: AvgLatency
  Purpose: Bar chart (triangle bars) of average latency by provider with custom ticks and themed tooltip.
  Notes: Supports pixel or full-height sizing and CSV export; shows Live badge; DnD handle via DragProvider.
  Data/Config: ./data (values, lastUpdated), ./config (gradients, axis styles).
*/
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
import OptionsDropdown from "@/app/(dashboard)/(home)/dashboard-v2/ui/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "@/ui/icons";

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
import { rawData, chartData } from "./data";
import { getChartConfig } from "./config";
import { exportCsv } from "@/lib/csv";

const CustomTick = ({
  x,
  y,
  payload,
  vertical = false,
  rotate = false,
  chartConfig,
}) => {
  if (rotate) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          transform="rotate(-90)"
          textAnchor="end"
          fill={chartConfig.axis.tick.fill}
          fontSize={chartConfig.axis.tick.fontSize}
          dx={-6}
        >
          {payload.value}
        </text>
      </g>
    );
  }

  return (
    <text
      x={x}
      y={y}
      dy={vertical ? 4 : 16}
      dx={vertical ? -10 : 0}
      textAnchor={vertical ? "end" : "middle"}
      fill={chartConfig.axis.tick.fill}
      fontSize={chartConfig.axis.tick.fontSize}
    >
      {vertical ? `${payload.value} ms` : payload.value}
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

export default function AvgLatency({ optionsMenuItems, height = 440 }) {
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
          <div className="flex items-center gap-2">
            <CardTitle>Avg latency by service provider</CardTitle>
            <Badge color="live">Live</Badge>
          </div>
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
              <OptionsDropdown
                items={optionsMenuItems}
                onAction={(id) => {
                  if (id === "export") exportCsv("avg-latency.csv", chartData);
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
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                stroke={chartConfig.grid.stroke}
                strokeDasharray="3 3"
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
