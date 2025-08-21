// /**
//  * SMS Volume Chart Constants
//  * 
//  * Centralized configuration for colors, sizes, and other constants
//  * used throughout the SMS Volume Chart components.
//  */

// // EXACT COLORS AS SPECIFIED
// export const SMS_COLORS = {
//   TOTAL: '#00B6F1',      // Blue - Total SMS line
//   DELIVERED: '#318E33',  // Green - Delivered SMS line  
//   FAILED: '#FF4E98',     // Pink - Failed SMS line
// };
// // LEGEND CONFIGURATION
// export const LEGEND_ITEMS = [
//   {
//     color: SMS_COLORS.TOTAL,
//     label: 'Total SMS',
//     dataKey: 'total'
//   },
//   {
//     color: SMS_COLORS.DELIVERED,
//     label: 'Delivered',
//     dataKey: 'delivered'
//   },
//   {
//     color: SMS_COLORS.FAILED,
//     label: 'Failed',
//     dataKey: 'failed'
//   }
// ];

// // HOVER DIMENSIONS AS SPECIFIED
// export const DOT_SIZES = {
//   NORMAL: 4,             // Normal dot radius (8px diameter)
//   HOVER: 6.118,          // Hover dot radius (12.236px diameter)
//   HOVER_HEIGHT: 10.406,  // Hover dot height as specified
// };

// // CHART CONFIGURATION
// export const CHART_CONFIG = {
//   DEFAULT_HEIGHT: 384,   // Default chart height in pixels
//   STROKE_WIDTH: 2,       // Line stroke width
//   GRID_DASH: "3 3",      // Grid line dash pattern

//   // Chart margins
//   MARGIN: {
//     TOP: 20,
//     RIGHT: 30,
//     LEFT: 20,
//     BOTTOM: 20
//   }
// };

// // THEME COLORS
// export const THEME_COLORS = {
//   LIGHT: {
//     AXIS: '#333',
//     GRID: '#f0f0f0',
//     TEXT: '#666',
//   },
//   DARK: {
//     AXIS: '#fff',
//     GRID: '#374151',
//     TEXT: '#9CA3AF',
//   }
// };

// // DATA STRUCTURE TEMPLATE
// export const SMS_DATA_TEMPLATE = {
//   "lastUpdated": "15:15:45",
//   "12:00": {
//     "total": 155130,
//     "delivered": 77434,
//     "failed": 22575,
//     "retry": 55121
//   }
//   // ... more time periods
// };



// 

/**
 * SMS Volume Chart Constants
 *
 * Centralized configuration for colors, sizes, and other constants
 * used throughout the SMS Volume Chart components.
 */

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
    gradient: "linear-gradient(228deg, #FF8F80 11.9%, #E56464 94.13%)",
    stops: [
      { offset: "11.9%", color: "#FF8F80" },
      { offset: "94.13%", color: "#E56464" },
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

// LEGEND CONFIGURATION
export const LEGEND_ITEMS = [
  { key: "TOTAL", label: "Total SMS", dataKey: "total" },
  { key: "DELIVERED", label: "Delivered", dataKey: "delivered" },
  { key: "FAILED", label: "Failed", dataKey: "failed" },
  { key: "RETRY", label: "Retry", dataKey: "retry" },
];

// HOVER DIMENSIONS
export const DOT_SIZES = {
  NORMAL: 4,
  HOVER: 6.118,
  HOVER_HEIGHT: 10.406,
};

// CHART CONFIGURATION
export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 384,
  STROKE_WIDTH: 2,
  GRID_DASH: "3 3",
  MARGIN: { TOP: 20, RIGHT: 60, LEFT: 0, BOTTOM: 20 },
};

// THEME COLORS
export const THEME_COLORS = {
  LIGHT: { AXIS: "#333", GRID: "#f0f0f0", TEXT: "#666" },
  DARK: { AXIS: "#fff", GRID: "#374151", TEXT: "#9CA3AF" },
};



