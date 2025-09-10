/*
  Module: Data
  Purpose: Mock/demo data and mapping helpers for this component (suitable for charts/tables).
*/
// Default mock data (success only)
export const providerObj = {
    lastUpdated: "01:15:45",
    Airtel: { success: 20822 },
    Jio: { success: 40011 },
    VI: { success: 16609 },
    Bsnl: { success: 20822 },
    Infobip: { success: 40011 },
    Tanla: { success: 16609 },
    Synch: { success: 40011 },
    Equence: { success: 16609 },
};

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
};
