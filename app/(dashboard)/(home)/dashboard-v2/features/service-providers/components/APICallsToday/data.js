/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
// Raw data
export const rawData = {
    lastUpdated: "01:15:45",
    "12:00": 249495,
    "13:00": 4049392,
    "14:00": 232454,
    "15:00": 34545,
    "16:00": 155130,
};

// Convert object to array for Recharts
export const chartData = Object.entries(rawData)
    .filter(([key]) => key !== "lastUpdated")
    .map(([time, value]) => ({ time, value }));
