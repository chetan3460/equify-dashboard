import React, { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import DashboardSelect from "@/components/dasboard-select";
import OptionsDropdown from "@/components/OptionsDropdown";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { data, rawData } from "./data";

import { gradients } from "./config";
import { getChartConfig } from "./config";

const CustomTooltip = ({ active, payload, label, chartConfig }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="p-2 rounded-[4px] flex flex-col gap-1"
        style={{
          backgroundColor: chartConfig.tooltip.contentStyle.backgroundColor,
          border: chartConfig.tooltip.contentStyle.border,
        }}
      >
        {/* Show label (x-axis or nameKey) */}

        {/* Show each value with its series name */}
        {payload.map((entry, index) => (
          <div
            key={`tooltip-item-${index}`}
            className="flex  items-center justify-between gap-1"
          >
            {/* Series name */}
            <span
              className="text-xs font-normal"
              style={{ color: chartConfig.tooltip.labelStyle.color }}
            >
              {entry.name}:
            </span>

            {/* Value */}
            <span
              className="font-semibold text-base"
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

// Custom Legend with gradient circles
const CustomLegend = ({ payload }) => {
  return (
    <ul className="grid grid-cols-2  justify-center self-center items-center gap-2  text-default-900 text-sm">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          {/* SVG circle for gradient swatch */}
          <svg width="14" height="14">
            <circle
              cx="7"
              cy="7"
              r="6"
              fill={entry.color} // supports solid + gradient (url(#gradX))
            />
          </svg>
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default function ProviderTraffic({
  deptData,
  selectedPeriod = "Today",
  onPeriodChange,
  height = 384,
  selectOptions = ["Today", "This week", "This month"],
  optionsMenuItems,
}) {
  const { isGlobalDragMode } = useDragContext();
  const { theme } = useTheme();
  const [currentPeriod, setCurrentPeriod] = useState(selectedPeriod);

  const chartConfig = getChartConfig(theme);
  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
    onPeriodChange?.(newPeriod);
  };

  // Responsive legend placement
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <div className="flex lg:items-center justify-between lg:flex-row flex-col gap-2">
        <CardHeader>
          <CardTitle>Service Provider Traffic</CardTitle>
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
              <DashboardSelect
                value={currentPeriod}
                onChange={handlePeriodChange}
                options={selectOptions}
              />
              <OptionsDropdown items={optionsMenuItems} />
            </>
          )}
        </div>
      </div>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              margin={{ right: isMobile ? 0 : 0, bottom: isMobile ? 24 : 0 }}
            >
              {/* Gradient defs */}
              <defs>
                {gradients.map((grad) =>
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

              {/* Pie */}
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="80%"
                paddingAngle={0}
                stroke="none" // ⬅ removes white border
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#grad${index % gradients.length})`}
                    stroke="none"
                  />
                ))}
              </Pie>

              {/* Tooltip + Legend */}
              <Tooltip
                cursor={chartConfig.tooltip.cursor}
                content={<CustomTooltip chartConfig={chartConfig} />}
              />
              <Legend
                content={<CustomLegend />}
                layout={isMobile ? "horizontal" : "vertical"}
                verticalAlign={isMobile ? "bottom" : "middle"}
                align={isMobile ? "center" : "right"}
                wrapperStyle={isMobile ? { width: "100%" } : undefined}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
