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
        bar: {
            size: 16,
            radius: [0, 4, 4, 0],
        },
        grid: {
            stroke: isDark ? "#666" : "#DADADA",
            strokeDasharray: "3 3",
            strokeWidth: 0.5,
        },
        tooltip: {
            cursor: { fill: "transparent" }, // no gray background
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
    };
}
