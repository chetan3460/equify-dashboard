/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
// data.js
export const rawData = {
    lastUpdated: "01:15:45",
    Airtel: { success: 20822, failed: 4191, total: 25013 },
    Jio: { success: 40011, failed: 15024, total: 55035 },
    VI: { success: 16609, failed: 3362, total: 19971 },
    Bsnl: { success: 20822, failed: 4191, total: 25013 },
    Infobip: { success: 40011, failed: 15024, total: 55035 },
    Tanla: { success: 16609, failed: 3362, total: 19971 },
    Synch: { success: 40011, failed: 15024, total: 55035 },
    Equence: { success: 16609, failed: 3362, total: 19971 },
    RouteMobile: { success: 25678, failed: 556, total: 26234 },
    Kaleyra: { success: 23112, failed: 1788, total: 24900 },
    Twilio: { success: 35123, failed: 8000, total: 43123 },
    Nexmo: { success: 18900, failed: 3865, total: 22765 },
    TataTeleservices: { success: 16700, failed: 3176, total: 19876 },
    Sify: { success: 22600, failed: 2832, total: 25432 },
    MyOperator: { success: 13800, failed: 2743, total: 16543 },
    MSG91: { success: 32100, failed: 6801, total: 38901 },
};

// Convert to Recharts-compatible array
export const chartData = Object.keys(rawData)
    .filter((key) => key !== "lastUpdated")
    .map((key) => {
        const item = rawData[key];
        return {
            name: key,
            success: item.success ?? 0,
            failed: item.failed ?? 0,
        };
    });

