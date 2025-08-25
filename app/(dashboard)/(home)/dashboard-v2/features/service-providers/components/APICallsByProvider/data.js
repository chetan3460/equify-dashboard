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
