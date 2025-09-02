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
  ];
  return { chartData: fallback, lastUpdated: "01:15:45" };
}

