export const formatCompactNumber = (value) => {
  if (value == null || value === "") return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);

  const abs = Math.abs(n);
  if (abs >= 1_000_000) {
    const v = n / 1_000_000;
    return (Number.isInteger(v) ? v.toFixed(0) : v.toFixed(1)) + "M";
  }
  if (abs >= 1_000) {
    const v = n / 1_000;
    // For K, prefer whole numbers (e.g., 120K). Round to nearest int.
    return Math.round(v) + "K";
  }
  return n.toLocaleString();
};

