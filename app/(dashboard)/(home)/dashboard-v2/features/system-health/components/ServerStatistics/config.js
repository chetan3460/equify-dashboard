/*
  Module: Config
  Purpose: Theme-aware chart/table configuration and constants for this component.
*/
// config.js
export function getTableConfig(theme) {
    const isDark = theme === "dark";

    return {
        headerBg: isDark ? "#1F2937" : "#F9FAFB",
        headerText: isDark ? "#E5E7EB" : "#111827",
        rowHover: isDark ? "#374151" : "#F3F4F6",
        exceededText: "#DC2626", // red for exceeded threshold
    };
}
