/**
 * Utility functions for SMS Volume Chart
 */

/**
 * Format large numbers for display (e.g., 1000 -> 1K, 1000000 -> 1M)
 */
export const formatNumber = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return value.toString();
};

/**
 * Format Y-axis labels
 */
export const formatYAxis = (value) => {
  return formatNumber(value);
};
