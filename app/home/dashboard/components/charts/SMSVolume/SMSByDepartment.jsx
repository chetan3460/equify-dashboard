/**
 * SMS By Department Chart Component
 *
 * Displays SMS volume by department using a pie chart with custom gradients.
 * Props: deptData?: Object with department keys and { success, failed, total }
 */
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { formatNumber } from "../../sms-volume-chart/utils";
import ChartInsight from "../../ChartInsight";

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
      className="inline-flex flex-col gap-1 p-[7.6px] rounded-[3.8px] border border-[#DADADA] bg-card"
      style={{ fontFamily: "Poppins, sans-serif", fontSize: "11.4px" }}
    >
      <p className="text-gray-900  text-xs font-normal mb-1">{data.name}</p>
      <div className="flex items-center justify-between gap-1  ">
        <span className="">Total:</span>
        <span className="font-bold">{formatNumber(data.value)}</span>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span>Success:</span>
        <span className="font-bold">{formatNumber(data.success)}</span>
      </div>
      <div className="flex items-center justify-between gap-1">
        <span>Failed:</span>
        <span className="font-bold">{formatNumber(data.failed)}</span>
      </div>
    </div>
  );
}

export default function SMSByDepartment({ deptData }) {
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
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-1">SMS Volume by Department</h3>
      <p className="text-xs text-gray-500 mb-4">Last updated: {lastUpdated}</p>
      <div className="flex items-center gap-6">
        {/* Pie Chart */}
        <div
          className="flex-shrink-0"
          style={{ width: "300px", height: "300px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {DEPT_GRADIENTS.map((grad) => {
                  if (grad.svgDefinition.includes("radial-gradient")) {
                    // Parse radial gradient
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
                    // Parse linear gradient
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
                outerRadius={120}
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
        <div className="flex-1 space-y-3">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ background: entry.cssGradient }}
              />
              <span className="text-sm font-medium text-default-900">
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ChartInsight
        message="R&D volume loading consistently for last 3 weeks"
        variant="success"
      />
    </div>
  );
}
