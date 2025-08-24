/**
 * SMS By Department Chart Component
 *
 * Displays SMS volume by department using a pie chart with custom gradients.
 * Props: deptData?: Object with department keys and { success, failed, total }
 */
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
// import { formatNumber } from '../../sms-volume-chart/utils';
// import ChartInsight from '../../ChartInsight';

// Utility function for formatting numbers
const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
};

// Chart Insight component placeholder
const ChartInsight = ({ message, variant }) => (
  <div
    className={`py-1 px-2 bg-[#E2F5FD] dark:bg-[#0D475F] rounded-[8px] inline-block mt-3 max-w-max
`}
  >
    <div className="text-xs font-medium text-[#0067B1] dark:text-[#149BFC]">
      {message}
    </div>
  </div>
);

// Custom gradients for each department
const DEPT_GRADIENTS = [
  {
    id: "grad-marketing",
    svgDefinition:
      "radial-gradient(43.8% 43.8% at 106.45% 11.83%, #FF6A88 0%, #FF99AC 100%)",
    cssGradient:
      "radial-gradient(43.8% 43.8% at 106.45% 11.83%, #FF6A88 0%, #FF99AC 100%)",
    solid: "#FF6A88",
  },
  {
    id: "grad-support",
    svgDefinition: "linear-gradient(167deg, #FFE159 8.37%, #FBD217 67.24%)",
    cssGradient: "linear-gradient(167deg, #FFE159 8.37%, #FBD217 67.24%)",
    solid: "#FFE159",
  },
  {
    id: "grad-hr",
    svgDefinition: "linear-gradient(167deg, #A259FF 8.37%, #C084FC 67.24%)",
    cssGradient: "linear-gradient(167deg, #A259FF 8.37%, #C084FC 67.24%)",
    solid: "#A259FF",
  },
  {
    id: "grad-admin",
    svgDefinition: "linear-gradient(266deg, #42A5F5 3.87%, #00B4D8 54.38%)",
    cssGradient: "linear-gradient(266deg, #42A5F5 3.87%, #00B4D8 54.38%)",
    solid: "#42A5F5",
  },
  {
    id: "grad-credit",
    svgDefinition:
      "radial-gradient(83.28% 83.28% at 74.34% 33.13%, #FDBB2D 0%, #F77500 100%)",
    cssGradient:
      "radial-gradient(83.28% 83.28% at 74.34% 33.13%, #FDBB2D 0%, #F77500 100%)",
    solid: "#FDBB2D",
  },
  {
    id: "grad-loan",
    svgDefinition:
      "radial-gradient(121.35% 121.35% at 58.87% 77.15%, #3EECAC 0%, #42A5F5 100%)",
    cssGradient:
      "radial-gradient(121.35% 121.35% at 58.87% 77.15%, #3EECAC 0%, #42A5F5 100%)",
    solid: "#3EECAC",
  },
];

// Lightweight tooltip matching the overall style formatting
function DeptTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0]?.payload;
  if (!data) return null;

  return (
    <div
      className="
        inline-flex flex-col items-start gap-[5.7px]
        p-2 rounded-[4px] border border-[#DADADA]
        bg-white dark:bg-[#33445B] dark:border-[#4E6079] text-default-900"
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
  height = 384, // Default height matching line chart
  selectOptions = ["Today", "This week", "This month"],
  optionsMenuItems,
}) {
  const [currentPeriod, setCurrentPeriod] = useState(selectedPeriod);
  const { isGlobalDragMode } = useDragContext();

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
    if (onPeriodChange) {
      onPeriodChange(newPeriod);
    }
  };
  const { chartData, lastUpdated } = useMemo(() => {
    if (deptData && typeof deptData === "object") {
      const { lastUpdated, ...departments } = deptData;
      const data = Object.entries(departments).map(([name, stats], index) => ({
        name,
        value: stats.total,
        success: stats.success,
        failed: stats.failed,
        color: DEPT_GRADIENTS[index % DEPT_GRADIENTS.length].solid,
        gradientId: DEPT_GRADIENTS[index % DEPT_GRADIENTS.length].id,
        cssGradient: DEPT_GRADIENTS[index % DEPT_GRADIENTS.length].cssGradient,
      }));
      return { chartData: data, lastUpdated };
    }

    // Fallback dummy data
    return {
      chartData: [
        {
          name: "Marketing",
          value: 28000,
          success: 20000,
          failed: 8000,
          color: "#FF6A88",
          gradientId: "grad-marketing",
          cssGradient: DEPT_GRADIENTS[0].cssGradient,
        },
        {
          name: "Support",
          value: 35000,
          success: 30000,
          failed: 5000,
          color: "#FFE159",
          gradientId: "grad-support",
          cssGradient: DEPT_GRADIENTS[1].cssGradient,
        },
        {
          name: "HR",
          value: 22000,
          success: 18000,
          failed: 4000,
          color: "#A259FF",
          gradientId: "grad-hr",
          cssGradient: DEPT_GRADIENTS[2].cssGradient,
        },
        {
          name: "Admin",
          value: 18000,
          success: 15000,
          failed: 3000,
          color: "#42A5F5",
          gradientId: "grad-admin",
          cssGradient: DEPT_GRADIENTS[3].cssGradient,
        },
        {
          name: "Credit",
          value: 12000,
          success: 10000,
          failed: 2000,
          color: "#FDBB2D",
          gradientId: "grad-credit",
          cssGradient: DEPT_GRADIENTS[4].cssGradient,
        },
        {
          name: "Loan",
          value: 8000,
          success: 7000,
          failed: 1000,
          color: "#3EECAC",
          gradientId: "grad-loan",
          cssGradient: DEPT_GRADIENTS[5].cssGradient,
        },
      ],
      lastUpdated: "01:15:45",
    };
  }, [deptData]);

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle> SMS Volume by Department</CardTitle>
          <CardDescription>Last updated: {lastUpdated}</CardDescription>
        </CardHeader>
        {/* Dropdown Controls */}
        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="opacity-75 hover:opacity-100 transition-opacity cursor-grab flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clipPath="url(#clip0_376_3320)">
                  <path d="M5.75 4.5C6.16421 4.5 6.5 4.16421 6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75C5 4.16421 5.33579 4.5 5.75 4.5Z" fill="black" />
                  <path d="M10.25 4.5C10.6642 4.5 11 4.16421 11 3.75C11 3.33579 10.6642 3 10.25 3C9.83579 3 9.5 3.33579 9.5 3.75C9.5 4.16421 9.83579 4.5 10.25 4.5Z" fill="black" />
                  <path d="M5.75 8.75C6.16421 8.75 6.5 8.41421 6.5 8C6.5 7.58579 6.16421 7.25 5.75 7.25C5.33579 7.25 5 7.58579 5 8C5 8.41421 5.33579 8.75 5.75 8.75Z" fill="black" />
                  <path d="M10.25 8.75C10.6642 8.75 11 8.41421 11 8C11 7.58579 10.6642 7.25 10.25 7.25C9.83579 7.25 9.5 7.58579 9.5 8C9.5 8.41421 9.83579 8.75 10.25 8.75Z" fill="black" />
                  <path d="M5.75 13C6.16421 13 6.5 12.6642 6.5 12.25C6.5 11.8358 6.16421 11.5 5.75 11.5C5.33579 11.5 5 11.8358 5 12.25C5 12.6642 5.33579 13 5.75 13Z" fill="black" />
                  <path d="M10.25 13C10.6642 13 11 12.6642 11 12.25C11 11.8358 10.6642 11.5 10.25 11.5C9.83579 11.5 9.5 11.8358 9.5 12.25C9.5 12.6642 9.83579 13 10.25 13Z" fill="black" />
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
              <DashboardSelect value={currentPeriod} onChange={handlePeriodChange} options={selectOptions} />
              <OptionsDropdown items={optionsMenuItems} />
            </>
          )}
        </div>
      </div>

      <CardContent className="flex-1 flex flex-col">
        {/* Chart Container */}
        <div className="relative" style={{ height: `${height}px` }}>
          <div className="flex md:flex-row flex-col items-center gap-6 h-full">
            {/* Pie Chart */}
            <div className="flex-1 w-full h-full">
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
                    outerRadius="80%" // use percentage instead of fixed 120
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

            {/* Custom Legend */}
            <div className="md:flex-1 grid md:grid-cols-1 grid-cols-3 md:gap-1 gap-3 md:mb-0 mb-3">
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

        <ChartInsight message="R&D volume loading consistently for last 3 weeks" />
      </CardContent>
    </Card>
  );
}
