/*
  Module: SMS Volume utils
  Purpose: Numeric format helpers for Y-axis and generic number formatting.
*/
export const formatYAxis = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 0)}K`;
  return value.toString();
};

export const formatNumber = (value) => value?.toLocaleString() || "0";

