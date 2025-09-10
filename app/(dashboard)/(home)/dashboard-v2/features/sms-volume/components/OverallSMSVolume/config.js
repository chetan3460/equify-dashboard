
/*
  Module: Config
  Purpose: Theme-aware chart/table configuration and constants for this component.
*/
/**
 * OverallSMSVolume chart configuration and theme.
 * Localized to this chart to keep concerns scoped to the component folder.
 */

export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 300,
  STROKE_WIDTH: 1,
  GRID_DASH: "3 3",
  MARGIN: { TOP: 20, RIGHT: 60, LEFT: 0, BOTTOM: 20 },
};

export const THEME_COLORS = {
  LIGHT: { AXIS: "#333", GRID: "#f0f0f0", TEXT: "#666" },
  DARK: { AXIS: "#fff", GRID: "#374151", TEXT: "#9CA3AF" },
};

