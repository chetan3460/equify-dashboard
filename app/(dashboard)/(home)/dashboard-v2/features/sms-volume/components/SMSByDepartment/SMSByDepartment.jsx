"use client";
import React, { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import DashboardSelect from "@/components/dasboard-select";
import OptionsDropdown from "@/components/OptionsDropdown";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import { DragHandleDots16 as DragHandleIcon } from "../../../../ui/icons";
import { DEPT_GRADIENTS, CHART_CONFIG } from "./config";
import { getDeptChartData } from "./data";

const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
};

function DeptTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0]?.payload;
  if (!data) return null;
  return (
    <div
      className="inline-flex flex-col items-start gap-[5.7px] p-2 rounded-[4px] border border-[#DADADA] bg-white dark:bg-[#33445B] dark:border-[#4E6079] text-default-900"
      style={{ fontFamily: "Poppins, sans-serif", fontSize: "11.4px" }}
    >
      <p className="text-xs font-bold mb-1">{data.name}</p>
      <div className="flex items-center justify-between gap-1 ">
        <span>Total:</span>
        <span style={{ fontWeight: 700 }}>{formatNumber(data.value)}</span>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span>Success:</span>
        <span style={{ fontWeight: 700 }}>{formatNumber(data.success)}</span>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span>Failed:</span>
        <span style={{ fontWeight: 700 }}>{formatNumber(data.failed)}</span>
      </div>
    </div>
  );
}

export default function SMSByDepartment({
  deptData,
  selectedPeriod = "Today",
  onPeriodChange,
  height = CHART_CONFIG.DEFAULT_HEIGHT,
  selectOptions = ["Today", "This week", "This month"],
  optionsMenuItems,
}) {
  const [currentPeriod, setCurrentPeriod] = useState(selectedPeriod);
  const { isGlobalDragMode } = useDragContext();

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
    onPeriodChange?.(newPeriod);
  };

  const { chartData, lastUpdated } = useMemo(
    () => getDeptChartData(deptData),
    [deptData]
  );

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle> SMS Volume by Department</CardTitle>
          <CardDescription>Last updated ({lastUpdated})</CardDescription>
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
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="relative size-full">
          <div className="flex md:flex-row flex-col items-center gap-6 h-full">
            <div className="flex-1 w-full h-full ">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {DEPT_GRADIENTS.map((grad) => {
                      if (grad.svgDefinition.includes("radial-gradient")) {
                        const match = grad.svgDefinition.match(
                          /radial-gradient\(([^,]+),\s*([^\s]+)\s+([^,]+),\s*([^\s]+)\s+([^)]+)\)/
                        );
                        if (match) {
                          const [, , color1, , color2] = match;
                          return (
                            <radialGradient
                              key={grad.id}
                              id={grad.id}
                              cx="50%"
                              cy="50%"
                              r="50%"
                            >
                              <stop offset="0%" stopColor={color1} />
                              <stop offset="100%" stopColor={color2} />
                            </radialGradient>
                          );
                        }
                      } else {
                        const match = grad.svgDefinition.match(
                          /linear-gradient\([^,]*,\s*([^\s]+)\s+[^,]*,\s*([^\s]+)\s+[^)]*\)/
                        );
                        if (match) {
                          const [, color1, color2] = match;
                          return (
                            <linearGradient
                              key={grad.id}
                              id={grad.id}
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="8.37%" stopColor={color1} />
                              <stop offset="67.24%" stopColor={color2} />
                            </linearGradient>
                          );
                        }
                      }
                      return null;
                    })}
                  </defs>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius="90%"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#${entry.gradientId})`}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<DeptTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-none  md:w-32 grid md:grid-cols-1 grid-cols-3 md:gap-2 gap-3 md:mb-0 mb-3">
              {chartData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ background: entry.cssGradient }}
                  />
                  <span className="text-xs font-medium text-default-900">
                    {entry.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block mt-3 max-w-max">
          <p className="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">
            R&D volume loading consistently for last 3 weeks
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
