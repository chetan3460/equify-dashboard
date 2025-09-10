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
            tick: { fill: isDark ? "#E5E5E5" : "#111827", fontSize: 12 },
        },
        grid: {
            stroke: isDark ? "#374151" : "#DADADA",
        },
        tooltip: {
            // cursor: { fill: "rgba(0,0,0,0.05)" },
            contentStyle: {
                backgroundColor: isDark ? "#33445B" : "#fff",
                borderRadius: "4px",
                border: isDark ? "1px solid #4E6079" : "1px solid #DADADA",
            },
            labelStyle: { color: isDark ? "#E5E2DF" : "#201D1A" },
            itemStyle: { color: isDark ? "#E5E2DF" : "#201D1A" },
        },
        gradients: [
            {
                id: "gradMsg",
                type: "radialGradient",
                props: { cx: "87.68%", cy: "34.49%", r: "139.09%" },
                stops: [
                    { offset: "0%", color: "#FDBB2D" },
                    { offset: "100%", color: "#F77500" },
                ],
            },
            {
                id: "gradDlr",
                type: "linearGradient",
                props: { x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                stops: [
                    { offset: "18.01%", color: "#A259FF" },
                    { offset: "86.89%", color: "#C084FC" },
                ],
            },
        ],
        legend: {
            msgSubmittedBg:
                "radial-gradient(138.42% 139.09% at 87.68% 34.49%, #FDBB2D 0%, #F77500 100%)",
            dlrReceivedBg:
                "linear-gradient(104deg, #A259FF 18.01%, #C084FC 86.89%)",
        },
    };
}
