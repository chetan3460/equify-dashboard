/*
  Module: Config
  Purpose: Theme-aware chart/table configuration and constants for this component.
*/
/**
 * Returns chart config based on current theme
 * @param {"light"|"dark"} theme
 */
export function getChartConfig(theme) {
    const isDark = theme === "dark";

    return {
        axis: {
            stroke: isDark ? "#666" : "#666",
            tick: {
                fill: isDark ? "#E5E5E5" : "#111827",
                fontSize: 12,
            },
        },
        grid: {
            stroke: isDark ? "#374151" : "#DADADA",
        },
        tooltip: {
            cursor: { fill: "rgba(0,0,0,0.05)" },
            contentStyle: {
                backgroundColor: isDark ? "#33445B" : "#fff",
                borderRadius: "4px",
                border: isDark ? "1px solid #4E6079" : "1px solid #DADADA",
            },
            labelStyle: {
                color: isDark ? "#E5E2DF" : "#201D1A",
            },
            itemStyle: {
                color: isDark ? "#E5E2DF" : "#201D1A",
            },
        },
        gradients: [
            {
                id: "gradSuccess",
                type: "linearGradient",
                props: { x1: "0", y1: "0", x2: "1", y2: "0" },
                stops: [
                    { offset: "0%", color: "#3EECAC" },
                    { offset: "100%", color: "#42A5F5" },
                ],
            },
            {
                id: "gradFailed",
                type: "linearGradient",
                props: { x1: "0", y1: "0", x2: "1", y2: "0" },
                stops: [
                    { offset: "0%", color: "#FF6A88" },
                    { offset: "100%", color: "#FF99AC" },
                ],
            },
        ],
        legend: {
            successBg: "linear-gradient(269deg, #3EECAC 0.8%, #42A5F5 268.75%)",
            failedBg: "linear-gradient(115deg, #FF6A88 -0.89%, #FF99AC 83.78%)",
        },
    };
}
