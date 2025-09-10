/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
import { DEPT_GRADIENTS } from "./config";

/**
 * Returns chart data and lastUpdated for the Department pie chart.
 * If deptData is provided, it builds data from it; otherwise returns defaults.
 */
export function getDeptChartData(deptData) {
  if (deptData && typeof deptData === "object") {
    const { lastUpdated, ...departments } = deptData;
    const chartData = Object.entries(departments).map(([name, stats], index) => ({
      name,
      value: stats.total,
      success: stats.success,
      failed: stats.failed,
      color: DEPT_GRADIENTS[index % DEPT_GRADIENTS.length].solid,
      gradientId: DEPT_GRADIENTS[index % DEPT_GRADIENTS.length].id,
      cssGradient: DEPT_GRADIENTS[index % DEPT_GRADIENTS.length].cssGradient,
    }));
    return { chartData, lastUpdated };
  }

  // Fallback demo data
  const fallback = [
    { name: "Marketing", value: 28000, success: 20000, failed: 8000 },
    { name: "Support", value: 35000, success: 30000, failed: 5000 },
    { name: "HR", value: 22000, success: 18000, failed: 4000 },
    { name: "Admin", value: 18000, success: 15000, failed: 3000 },
    { name: "Credit", value: 12000, success: 10000, failed: 2000 },
    { name: "Loan", value: 8000, success: 7000, failed: 1000 },
    // Additional dummy departments
    { name: "Sales", value: 26000, success: 22000, failed: 4000 },
    { name: "Finance", value: 14000, success: 12000, failed: 2000 },
    { name: "Compliance", value: 9000, success: 8000, failed: 1000 },
    { name: "IT", value: 20000, success: 18000, failed: 2000 },
    { name: "Operations", value: 30000, success: 26000, failed: 4000 },
    { name: "Legal", value: 6000, success: 5200, failed: 800 },
    { name: "Product", value: 24000, success: 21000, failed: 3000 },
    { name: "Engineering", value: 27000, success: 23000, failed: 4000 },
    { name: "QA", value: 11000, success: 9500, failed: 1500 },
    { name: "Procurement", value: 13000, success: 11000, failed: 2000 },
  ];
  return { chartData: fallback, lastUpdated: "01:15:45" };
}

