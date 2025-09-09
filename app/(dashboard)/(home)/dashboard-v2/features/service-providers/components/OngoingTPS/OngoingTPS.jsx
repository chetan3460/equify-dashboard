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
import { formatCompactNumber } from "@/lib/number";
import { exportCsv } from "@/lib/csv";

const CustomTick = ({ x, y, payload, vertical = false, rotate = false, chartConfig }) => {
  const value =
    vertical && typeof payload.value === "number"
      ? formatCompactNumber(payload.value)
      : payload.value;

  if (rotate) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          transform="rotate(-90)"
          textAnchor="end"
          className="text-xs font-normal"
          fill={chartConfig.axis.tick.fill}
          dx={-6}
        >
          {value}
        </text>
      </g>
    );
  }

  return (
    <text
      x={x}
      y={y + (vertical ? 0 : 10)}
      textAnchor={vertical ? "end" : "middle"}
      className="text-xs font-normal"
      fill={chartConfig.axis.tick.fill}
    >
      {value}
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
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function OngoingTPS({ optionsMenuItems, height = 340 }) {
  const { isGlobalDragMode } = useDragContext();
  const { theme } = useTheme();
  const chartConfig = getChartConfig(theme);

  // Support number (pixels) or string CSS values (e.g., "340px", "24rem", "50vh", "auto")
  const wrapperStyle =
    typeof height === "number"
      ? { height: `${height}px` }
      : height === "auto" || height === "100%"
      ? { height: "100%" }
      : { height };


  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Ongoing TPS by Service Provider</CardTitle>
            <Badge color="live">
              <div></div> Live
            </Badge>
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
                  if (id === "export") exportCsv("ongoing-tps.csv", chartData);
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
              <YAxis tick={<CustomTick chartConfig={chartConfig} vertical />} />
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

              <Bar dataKey="value" barSize={16} radius={[4, 4, 0, 0]}>
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
