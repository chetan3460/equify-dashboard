export const rawData = {
    lastUpdated: "01:15:45",
    Airtel: 90,
    Jio: 84,
    VI: 55,
    BSNL: 18,
    "Tata Tele": 32,
    Equence: 84,
    Tanla: 55,
    Infobip: 200,
    Synch: 32,
};

// Convert to array for Recharts
export const chartData = Object.keys(rawData)
    .filter((key) => key !== "lastUpdated")
    .map((key, index) => ({
        name: key,
        value: rawData[key],
        gradientId: `grad${index}`,
    }));
