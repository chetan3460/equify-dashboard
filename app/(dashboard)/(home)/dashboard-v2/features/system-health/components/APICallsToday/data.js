/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
// Network statistics single-series dataset
// Replace this with live data as needed
export const networkRaw = {
    lastUpdated: "16:50:01",
    host: "equify-gcp-k1",
    "12:00": 0.188,
    "13:00": 23,
    "14:00": 200,
    "15:00": 350,
    "16:00": 1.2,
};

// Normalize into an array suitable for Recharts
export const networkData = Object.entries(networkRaw)
    .filter(([k]) => k !== "lastUpdated" && k !== "host")
    .map(([time, value]) => ({ time, value }));
