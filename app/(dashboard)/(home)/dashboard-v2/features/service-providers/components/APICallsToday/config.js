/**
 * Returns chart config based on current theme
 * @param {"light"|"dark"} theme
 */
export function getChartConfig(theme) {
    const isDark = theme === "dark";

    return {
        lineColor: isDark ? "#E879F9" : "#B100AE",
        strokeWidth: 0.5,
        dot: {
            r: 4,
            fill: isDark ? "#111827" : "#fff",
            stroke: isDark ? "#E879F9" : "#B100AE",
            strokeWidth: 1,
        },
        activeDot: {
            r: 6,
            fill: isDark ? "#E879F9" : "#B100AE",
        },
        axis: {
            stroke: "#666",
            tick: { fill: isDark ? "#E5E5E5" : "#111827" },
        },
        grid: {
            stroke: isDark ? "#374151" : "#DADADA",
        },
        tooltip: {
            cursor: { fill: "rgba(0,0,0,0.05)" },
            contentStyle: {
                backgroundColor: isDark ? "#33445B" : "#fff",
                borderRadius: "4px",
                border: isDark ? "1px solid #4E6079" : "1px solid #fff",
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
