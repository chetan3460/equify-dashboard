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
  Cell,
} from "recharts";
import { rawData, chartData } from "./data";
import { getChartConfig } from "./config";
import { exportCsv } from "@/lib/csv";

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

export default function AvgLatency({ optionsMenuItems, height = 440 }) {
  const { isGlobalDragMode } = useDragContext();
  const { theme } = useTheme();
  const chartConfig = getChartConfig(theme);

  // Support number (pixels) or string (e.g., "auto" -> fill parent)
  const wrapperStyle =
    typeof height === "number" ? { height: `${height}px` } : { height: "100%" };

  const resolvedOptions = (optionsMenuItems && optionsMenuItems.length > 0)
    ? optionsMenuItems
    : [
        { id: "resize", label: "Resize" },
        { id: "export", label: "Export" },
        { id: "settings", label: "Settings" },
        { id: "refresh", label: "Refresh" },
      ];

  const optionsWithActions = resolvedOptions.map((opt) =>
    opt.id === "export"
      ? { ...opt, onClick: () => exportCsv("avg-latency.csv", chartData) }
      : opt
  );

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
                {optionsWithActions.map((item, idx) => (
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
