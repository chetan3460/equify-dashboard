/*
  Component: APICallsByProvider
  Purpose: Bar chart comparing successful vs failed API calls across providers with gradient legend and rotated ticks.
  Notes: Exportable data, DnD handle, theme-aware tooltip; uses compact number formatting.
  Data/Config: ./data (chartData, rawData), ./config (gradients, axis styles).
*/
import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/app/(dashboard)/(home)/dashboard-v2/ui/OptionsDropdown";
import { exportCsv } from "@/lib/csv";
import { DragHandleDots16 as DragHandleIcon } from "@/ui/icons";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { chartData, rawData } from "./data"; // ⬅️ import rawData
import { getChartConfig } from "./config";
import { formatCompactNumber } from "@/lib/number";

const CustomTick = ({ x, y, payload, vertical = false, rotate = false, chartConfig }) => {
  const label = vertical && typeof payload.value === "number"
    ? formatCompactNumber(payload.value)
    : payload.value;

  if (rotate) {
    // Render vertical text (for crowded X-axis category labels)
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          transform="rotate(-90)"
          textAnchor="end"
          className="text-xs font-normal"
          fill={chartConfig.axis.tick.fill}
          dx={-6}
        >
          {label}
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
      {label}
    </text>
  );
};

const CustomTooltip = ({ active, payload, chartConfig }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-[4px] p-2 "
        style={{
          backgroundColor: chartConfig.tooltip.contentStyle.backgroundColor,
          border: chartConfig.tooltip.contentStyle.border,
        }}
      >
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between gap-2 items-center">
            <span
              className="text-xs font-normal"
              style={{ color: chartConfig.tooltip.labelStyle.color }}
            >
              {entry.name}:
            </span>
            <span
              className="text-xs font-normal"
              style={{ color: chartConfig.tooltip.itemStyle.color }}
            >
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ chartConfig }) => (
  <div className="flex items-center gap-4 mb-2">
    <div className="flex items-center gap-2">
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "1.9px",
          background:
            chartConfig.legend?.successBg ||
            "linear-gradient(269deg, #3EECAC 0.8%, #42A5F5 268.75%)",
        }}
      />
      <span className="text-xs text-default-900">Successful</span>
    </div>
    <div className="flex items-center gap-2">
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "1.9px",
          background:
            chartConfig.legend?.failedBg ||
            "linear-gradient(115deg, #FF6A88 -0.89%, #FF99AC 83.78%)",
        }}
      />
      <span className="text-xs text-default-900">Failed</span>
    </div>
  </div>
);

export default function APICallsByProvider({ optionsMenuItems }) {
  const { isGlobalDragMode } = useDragContext();
  const { theme } = useTheme();
  const chartConfig = getChartConfig(theme);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>API calls by service provider today</CardTitle>
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
            <OptionsDropdown
              items={optionsMenuItems}
              onAction={(id) => {
                if (id === "export")
                  exportCsv("api-calls-by-provider.csv", chartData);
              }}
            />
          )}
        </div>
      </div>

      <CardContent className="flex-1">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 0, left: 0, bottom: 24 }}
            >
              <CartesianGrid
                stroke={chartConfig.grid.stroke}
                strokeDasharray="3 3"
                vertical={true}
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

              {/* Define Gradients */}
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
                  ) : null
                )}
              </defs>

              {/* Bars */}
              <Bar
                barSize={16}
                dataKey="success"
                name="Successful"
                radius={[4, 4, 0, 0]}
                fill="url(#gradSuccess)"
              />
              <Bar
                barSize={16}
                dataKey="failed"
                name="Failed"
                radius={[4, 4, 0, 0]}
                fill="url(#gradFailed)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <CustomLegend chartConfig={chartConfig} />
      </CardContent>
    </Card>
  );
}
