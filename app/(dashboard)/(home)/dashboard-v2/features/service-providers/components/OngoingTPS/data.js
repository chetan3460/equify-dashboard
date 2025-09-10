/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
export const rawData = {
    lastUpdated: "01:15:45",
    Airtel: 1253,
    Jio: 2739,
    VI: 1002,
    Bsnl: 1253,
    Tata: 2739,
    Equence: 1002,
    Tanla: 1253,
    Synch: 2739,
    Infpbip: 1002,
};

// Convert to array for Recharts
export const chartData = Object.keys(rawData)
    .filter((key) => key !== "lastUpdated")
    .map((key, index) => ({
        name: key,
        value: rawData[key],
        gradientId: `grad${index}`,
    }));
