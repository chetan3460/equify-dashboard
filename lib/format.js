// lib/format.js
// Shared number formatting helpers for consistent display across tables.

/** Format a number with fixed digits. Falls back to '-' when not finite. */
export function formatFixed(value, digits = 2) {
  return Number.isFinite(value) ? Number(value).toFixed(digits) : "-";
}

/** Format an integer with locale separators. Falls back to '-' when not finite. */
export function formatInteger(value) {
  return Number.isFinite(value) ? Number(value).toLocaleString() : "-";
}

