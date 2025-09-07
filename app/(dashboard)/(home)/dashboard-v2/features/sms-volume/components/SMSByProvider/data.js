// Default mock data
export const providerObj = {
    lastUpdated: "01:15:45",
    Airtel: { total: 25013 },
    Jio: { total: 55035 },
    VI: { total: 19971 },
    Bsnl: { total: 25013 },
    Infobip: { total: 55035 },
    Tanla: { total: 19971 },
    Synch: { total: 55035 },
    Equence: { total: 19971 },
    RouteMobile: { total: 31234 },
    Kaleyra: { total: 27890 },
    Twilio: { total: 43123 },
    Nexmo: { total: 22765 },
    TataTeleservices: { total: 19876 },
    Sify: { total: 25432 },
    MyOperator: { total: 16543 },
    MSG91: { total: 38901 },
};

/**
 * Build chart data and lastUpdated for the provider bar chart.
 */
export function getProviderChartData(providerData) {
  const obj = providerData || providerObj;
  const chartData = Object.entries(obj)
    .filter(([k]) => k !== "lastUpdated")
    .map(([name, val]) => ({
      name,
      total: typeof val === "object" && val !== null ? val.total ?? 0 : 0,
    }))
    .sort((a, b) => b.total - a.total);

  const lastUpdated = (providerData && providerData.lastUpdated) || providerObj.lastUpdated;
  return { chartData, lastUpdated };
}

// Gradient definitions for each provider
export const gradientSpecByName = {
    Airtel: {
        type: "radial",
        stops: [
            ["0%", "#FF6A88"],
            ["100%", "#FF99AC"],
        ],
    },
    Jio: {
        type: "linear",
        angle: 268,
        stops: [
            ["0%", "#3EECAC"],
            ["100%", "#42A5F5"],
        ],
    },
    VI: {
        type: "linear",
        angle: 270,
        stops: [
            ["0%", "#FDBB2D"],
            ["100%", "#F77500"],
        ],
    },
    Bsnl: {
        type: "linear",
        angle: 79,
        stops: [
            ["0%", "#42A5F5"],
            ["100%", "#18C9EC"],
        ],
    },
    Infobip: {
        type: "linear",
        angle: 104,
        stops: [
            ["0%", "#A259FF"],
            ["100%", "#C084FC"],
        ],
    },
    Tanla: {
        type: "linear",
        angle: 167,
        stops: [
            ["0%", "#FFE159"],
            ["100%", "#FBD217"],
        ],
    },
    Synch: {
        type: "linear",
        angle: 104,
        stops: [
            ["0%", "#60C345"],
            ["100%", "#5CDA3A"],
        ],
    },
    Equence: {
        type: "linear",
        angle: 268,
        stops: [
            ["0%", "#3EECAC"],
            ["100%", "#42A5F5"],
        ],
    },
    RouteMobile: {
        type: "linear",
        angle: 45,
        stops: [["0%", "#FF9A9E"], ["100%", "#FAD0C4"]],
    },
    Kaleyra: {
        type: "linear",
        angle: 135,
        stops: [["0%", "#84FAB0"], ["100%", "#8FD3F4"]],
    },
    Twilio: {
        type: "linear",
        angle: 225,
        stops: [["0%", "#F5576C"], ["100%", "#F093FB"]],
    },
    Nexmo: {
        type: "linear",
        angle: 315,
        stops: [["0%", "#4FACFE"], ["100%", "#00F2FE"]],
    },
    TataTeleservices: {
        type: "linear",
        angle: 200,
        stops: [["0%", "#FCCF31"], ["100%", "#F55555"]],
    },
    Sify: {
        type: "linear",
        angle: 160,
        stops: [["0%", "#43E97B"], ["100%", "#38F9D7"]],
    },
    MyOperator: {
        type: "linear",
        angle: 20,
        stops: [["0%", "#A18CD1"], ["100%", "#FBC2EB"]],
    },
    MSG91: {
        type: "linear",
        angle: 250,
        stops: [["0%", "#F6D365"], ["100%", "#FDA085"]],
    },
};
