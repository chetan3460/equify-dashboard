// config.js
export const gradients = [
    {
        id: "grad0",
        type: "radialGradient",
        props: {
            cx: "50%",
            cy: "50%",
            r: "80%",
            fx: "50%",
            fy: "50%",
        },
        stops: [
            { offset: "0%", color: "#FF6A88" },
            { offset: "100%", color: "#FF99AC" },
        ],
    },
    {
        id: "grad1",
        type: "radialGradient",
        props: {
            cx: "50%",
            cy: "50%",
            r: "80%",
            fx: "50%",
            fy: "50%",
        },
        stops: [
            { offset: "0%", color: "#3EECAC" },
            { offset: "100%", color: "#42A5F5" },
        ],
    },
    {
        id: "grad2",
        type: "radialGradient",
        props: {
            cx: "50%",
            cy: "50%",
            r: "80%",
            fx: "50%",
            fy: "50%",
        },
        stops: [
            { offset: "0%", color: "#FDBB2D" },
            { offset: "100%", color: "#F77500" },
        ],
    },
    {
        id: "grad3",
        type: "linearGradient",
        props: {
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
        },
        stops: [
            { offset: "3.87%", color: "#42A5F5" },
            { offset: "54.38%", color: "#00B4D8" },
        ],
    },
    {
        id: "grad4",
        type: "linearGradient",
        props: {
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
        },
        stops: [
            { offset: "8.37%", color: "#A259FF" },
            { offset: "67.24%", color: "#C084FC" },
        ],
    },
    {
        id: "grad5",
        type: "linearGradient",
        props: {
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
        },
        stops: [
            { offset: "8.37%", color: "#FFE159" },
            { offset: "67.24%", color: "#FBD217" },
        ],
    },
    {
        id: "grad6",
        type: "linearGradient",
        props: {
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
        },
        stops: [
            { offset: "18.01%", color: "#60C345" },
            { offset: "86.89%", color: "#5CDA3A" },
        ],
    },
    {
        id: "grad7",
        type: "linearGradient",
        props: {
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
        },
        stops: [
            { offset: "4.86%", color: "#303CE1" },
            { offset: "92.05%", color: "#7880ED" },
        ],
    },
];

/**
 * Returns chart config based on current theme
 * @param {"light"|"dark"} theme
 */
export function getChartConfig(theme) {
    const isDark = theme === "dark";

    return {

        tooltip: {
            cursor: { fill: "rgba(0,0,0,0.05)" },
            contentStyle: {
                backgroundColor: isDark ? "#33445B" : "#fff",
                borderRadius: "0",
                border: isDark ? "1px solid #4E6079" : "1px solid #DADADA",
            },
            labelStyle: {
                color: isDark ? "#E5E2DF" : "#201D1A",
            },
            itemStyle: {
                color: isDark ? "#E5E2DF" : "#201D1A",
            },
        },
    };
}
