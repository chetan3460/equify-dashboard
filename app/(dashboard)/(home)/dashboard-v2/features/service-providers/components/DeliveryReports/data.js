/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
export const rawData = {
    lastUpdated: "01:15:45",
    Airtel: { msgSubmitted: 20822, dlrReceived: 20822 },
    Jio: { msgSubmitted: 10000, dlrReceived: 7500 },
    VI: { msgSubmitted: 50000, dlrReceived: 25000 },
    Infobip: { msgSubmitted: 0, dlrReceived: 0 },
    Equence: { msgSubmitted: 10000, dlrReceived: 7500 },
    Synch: { msgSubmitted: 50000, dlrReceived: 25000 },
};

// Convert to Recharts-compatible array
// data.js

export const chartData = Object.keys(rawData)
    .filter((key) => key !== "lastUpdated")
    .map(key => {
        const item = rawData[key];
        return {
            name: key,
            msgSubmitted: item.msgSubmitted ?? 0,
            dlrReceived: item.dlrReceived ?? 0
        };
    });
