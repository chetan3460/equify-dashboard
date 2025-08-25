export function getChartConfig(theme) {
    const isDark = theme === "dark";

    const gradients = [
        {
            id: "grad0",
            type: "linearGradient",
            props: { x1: "0", y1: "0", x2: "0", y2: "1" },
            stops: [
                { offset: "0%", color: "#FF6A88" },
                { offset: "100%", color: "#FF99AC" },
            ],
        },
        {
            id: "grad1",
            type: "linearGradient",
            props: { x1: "0", y1: "0", x2: "0", y2: "1" },
            stops: [
                { offset: "0%", color: "#3EECAC" },
                { offset: "100%", color: "#42A5F5" },
            ],
        },
        {
            id: "grad2",
            type: "radialGradient",
            props: { cx: "50%", cy: "50%", r: "50%" },
            stops: [
                { offset: "0%", color: "#FDBB2D" },
                { offset: "100%", color: "#F77500" },
            ],
        },
        {
            id: "grad3",
            type: "linearGradient",
            props: { x1: "0", y1: "0", x2: "0", y2: "1" },
            stops: [
                { offset: "0%", color: "#42A5F5" },
                { offset: "100%", color: "#18C9EC" },
            ],
        },
        {
            id: "grad4",
            type: "linearGradient",
            props: { x1: "0", y1: "0", x2: "0", y2: "1" },
            stops: [
                { offset: "0%", color: "#A259FF" },
                { offset: "100%", color: "#C084FC" },
            ],
        },
        {
            id: "grad5",
            type: "linearGradient",
            props: { x1: "0", y1: "0", x2: "0", y2: "1" },
            stops: [
                { offset: "0%", color: "#60C345" },
                { offset: "100%", color: "#5CDA3A" },
            ],
        },
        {
            id: "grad6",
            type: "linearGradient",
            props: { x1: "0", y1: "0", x2: "0", y2: "1" },
            stops: [
                { offset: "0%", color: "#FFE159" },
                { offset: "100%", color: "#FBD217" },
            ],
        },
        {
            id: "grad7",
            type: "linearGradient",
            props: { x1: "0", y1: "0", x2: "0", y2: "1" },
            stops: [
                { offset: "0%", color: "#303CE1" },
                { offset: "100%", color: "#7880ED" },
            ],
        },
        {
            id: "grad8",
            type: "linearGradient",
            props: { x1: "0", y1: "0", x2: "0", y2: "1" },
            stops: [
                { offset: "0%", color: "#A259FF" },
                { offset: "100%", color: "#C084FC" },
            ],
        },
    ];

    return {
        axis: {
            stroke: isDark ? "#666" : "#666",
            tick: { fill: isDark ? "#E5E5E5" : "#111827", fontSize: 12 },
        },
        grid: { stroke: isDark ? "#374151" : "#DADADA" },
        tooltip: {
            cursor: false,
            contentStyle: {
                backgroundColor: isDark ? "#33445B" : "#fff",
                borderRadius: "4px",
                border: isDark ? "1px solid #4E6079" : "1px solid #DADADA",
            },
            labelStyle: { color: isDark ? "#E5E2DF" : "#201D1A" },
            itemStyle: { color: isDark ? "#E5E2DF" : "#201D1A" },
        },
        gradients,
    };
}
