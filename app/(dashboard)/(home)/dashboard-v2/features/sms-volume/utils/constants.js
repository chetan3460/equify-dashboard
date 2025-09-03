export const SMS_COLORS = {
  TOTAL: {
    solid: "#00B6F1",
    gradient: "linear-gradient(189deg, #369CFE 22.7%, #1E5BE0 76.39%)",
    stops: [
      { offset: "22.7%", color: "#369CFE" },
      { offset: "76.39%", color: "#1E5BE0" },
    ],
  },
  DELIVERED: {
    solid: "#318E33",
    gradient: "linear-gradient(53deg, #318E33 8.75%, #8AF5A8 90.78%)",
    stops: [
      { offset: "8.75%", color: "#318E33" },
      { offset: "90.78%", color: "#8AF5A8" },
    ],
  },
  FAILED: {
    solid: "#FF4E98",
    gradient: "linear-gradient(228deg, #FF4E98 11.9%, #FF4E98 94.13%)",
    stops: [
      { offset: "11.9%", color: "#FF4E98" },
      { offset: "94.13%", color: "#FF4E98" },
    ],
  },
  RETRY: {
    solid: "#FDBB2D",
    gradient: "linear-gradient(270deg, #FDBB2D 1.67%, #F77500 117.65%)",
    stops: [
      { offset: "1.67%", color: "#FDBB2D" },
      { offset: "117.65%", color: "#F77500" },
    ],
  },
};

export const LEGEND_ITEMS = [
  { key: "TOTAL", label: "Total SMS", dataKey: "total" },
  { key: "DELIVERED", label: "Delivered", dataKey: "delivered" },
  { key: "FAILED", label: "Failed", dataKey: "failed" },
  { key: "RETRY", label: "Retry", dataKey: "retry" },
];

export const DOT_SIZES = {
  NORMAL: 4,
  HOVER: 6.118,
  HOVER_HEIGHT: 10.406,
};

export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 384,
  STROKE_WIDTH: 2,
  GRID_DASH: "3 3",
  MARGIN: { TOP: 20, RIGHT: 60, LEFT: 0, BOTTOM: 20 },
};

export const THEME_COLORS = {
  LIGHT: { AXIS: "#333", GRID: "#f0f0f0", TEXT: "#666" },
  DARK: { AXIS: "#fff", GRID: "#374151", TEXT: "#9CA3AF" },
};

