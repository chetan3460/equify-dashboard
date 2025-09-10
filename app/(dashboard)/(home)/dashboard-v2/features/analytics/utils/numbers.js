export const getNumericValue = (valueStr) => {
  if (!valueStr) return 0;
  if (valueStr.endsWith('K')) return parseFloat(valueStr.replace('K', '')) * 1000;
  if (valueStr.endsWith('M')) return parseFloat(valueStr.replace('M', '')) * 1000000;
  if (valueStr.endsWith('%')) return parseFloat(valueStr.replace('%', ''));
  return parseFloat(valueStr) || 0;
};

// Friendly formatter for short metric display (kept close to getNumericValue for cohesion)
export function formatCardValue(value) {
  if (value == null) return "";
  const str = String(value).trim();
  if (str.endsWith("%")) return str;
  if (str.toLowerCase().endsWith("ms")) {
    const num = parseFloat(str.replace(/[^0-9.\-]/g, ""));
    if (!Number.isFinite(num)) return str;
    return `${Number(num.toFixed(1))} ms`;
  }
  const num = parseFloat(str.replace(/,/g, "").replace(/[^0-9.\-]/g, ""));
  if (!Number.isFinite(num)) return str;
  const abs = Math.abs(num);
  if (abs >= 1_000_000) return `${(num / 1_000_000).toFixed(3)}M`;
  if (abs >= 1_000) return `${Math.round(num / 1_000)}K`;
  return num.toLocaleString();
}

