/*
  Gauge helpers shared by GaugeChart
  - Number parsing
  - Color interpolation
  - Label formatting
  - Sub-arc builders (AG-style and gradient-to-value)
*/

// Parse numbers like "5,000", "7.2k", "50%" into a numeric value.
export function parseNumericInput(val) {
  if (typeof val === "number") return val;
  const s = String(val ?? "").replace(/,/g, "").trim().toLowerCase();
  if (!s) return 0;
  if (s.endsWith("k")) return (parseFloat(s) || 0) * 1_000;
  if (s.endsWith("m")) return (parseFloat(s) || 0) * 1_000_000;
  if (s.endsWith("%")) return parseFloat(s) || 0;
  return parseFloat(s) || 0;
}

// Linear interpolation between two hex colors (e.g. #22c55e -> #f5cd19)
export function lerpHexColor(c1, c2, t) {
  const a = parseInt(c1.slice(1), 16);
  const b = parseInt(c2.slice(1), 16);
  const r1 = (a >> 16) & 0xff, g1 = (a >> 8) & 0xff, b1 = a & 0xff;
  const r2 = (b >> 16) & 0xff, g2 = (b >> 8) & 0xff, b2 = b & 0xff;
  const r = Math.round(r1 + (r2 - r1) * t).toString(16).padStart(2, "0");
  const g = Math.round(g1 + (g2 - g1) * t).toString(16).padStart(2, "0");
  const bl = Math.round(b1 + (b2 - b1) * t).toString(16).padStart(2, "0");
  return `#${r}${g}${bl}`;
}

// Human short format: 1.2k, 3.4m, or locale string for smaller numbers
export function formatShort(n) {
  const v = Number(n) || 0;
  if (v >= 1_000_000) return `${Number.isInteger(v / 1_000_000) ? v / 1_000_000 : (v / 1_000_000).toFixed(1)}m`;
  if (v >= 1_000) return `${Number.isInteger(v / 1_000) ? v / 1_000 : (v / 1_000).toFixed(1)}k`;
  return v.toLocaleString();
}

// Default AG-like gradient subArcs with discrete limits
export function buildAgStyleSubArcs() {
  const segments = [];
  const addRange = (startP, endP, startC, endC, steps) => {
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const p = Math.round(startP + (endP - startP) * t);
      segments.push({ limit: p, color: lerpHexColor(startC, endC, t) });
    }
  };
  // 0-60 green->yellow, 60-80 yellow->orange, 80-100 dark grey
  addRange(0, 60, "#4cd137", "#f5cd19", 12);
  addRange(60, 80, "#f5cd19", "#f59e0b", 6);
  segments.push({ limit: 100, color: "#2a3440" });

  // Ensure strictly increasing limits
  const dedup = [];
  let last = -1;
  for (const s of segments) {
    if (s.limit > last) {
      dedup.push(s);
      last = s.limit;
    }
  }
  return dedup;
}

// Build a smooth gradient up to `percent`, then a tail color to the end.
export function buildGradientToValueSubArcs({
  percent,
  startTrim = 0,
  endTrim = 100,
  gradientColors,
  gradientSteps,
  tailColor,
  joinGapPercent = 1, // small white gap between colored arc and tail
}) {
  const result = [];
  const add = (seg) => result.push(seg);

  // Start: transparent cap up to startTrim
  if (startTrim > 0) add({ length: startTrim / 100, color: "rgba(0,0,0,0)", showTick: false });

  // Gradient portion (startTrim -> min(endTrim, percent)) split into many tiny segments
  const end = Math.min(endTrim, Math.max(startTrim, percent));
  const gradLength = Math.max(0, end - startTrim);
  if (gradLength > 0) {
    const steps = Math.max(1, gradientSteps);
    const stepLen = gradLength / 100 / steps;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const idx = Math.min(gradientColors.length - 2, Math.floor(t * (gradientColors.length - 1)));
      const localT = t * (gradientColors.length - 1) - idx;
      const c = lerpHexColor(gradientColors[idx], gradientColors[idx + 1], localT);
      add({ length: stepLen, color: c, showTick: false });
    }
  }

  // Optional small gap between colored arc and tail
  const gap = Math.max(0, Math.min(joinGapPercent, endTrim - end));
  if (gap > 0) add({ length: gap / 100, color: "rgba(255,255,255,1)", showTick: false });

  // Tail portion (end+gap -> endTrim)
  const tailLen = Math.max(0, endTrim - (end + gap));
  if (tailLen > 0) add({ length: tailLen / 100, color: tailColor, showTick: false });

  // End: transparent cap to 100
  const endCap = Math.max(0, 100 - endTrim);
  if (endCap > 0) add({ length: endCap / 100, color: "rgba(0,0,0,0)", showTick: false });

  return result;
}

// Trim caps for a semi-circle so the ends are flat/transparent
export function applyFlatCapsForSemicircle(baseSubArcs, { startTrim, endTrim, showTicks }) {
  const within = [];
  let prev = startTrim;
  for (const s of baseSubArcs) {
    const lim = Number(s.limit);
    if (!(lim > startTrim && lim < endTrim)) continue;
    if (lim <= prev) continue;
    within.push(s);
    prev = lim;
  }

  const lastColor = within.length
    ? within[within.length - 1].color
    : baseSubArcs.find((s) => Number(s.limit) > startTrim && Number(s.limit) < 100)?.color ||
      baseSubArcs[0]?.color ||
      "#4cd137";

  const caps = [];
  // Transparent start cap up to startTrim
  caps.push({ limit: startTrim, color: "rgba(0,0,0,0)", showTick: false });
  // Mid segments
  for (const s of within) caps.push(s);
  // Ensure an exact endTrim segment using the last visible color
  if (caps[caps.length - 1]?.limit !== endTrim) {
    caps.push({ limit: endTrim, color: lastColor, showTick: !!showTicks });
  }
  // Transparent end cap to 100 only when endTrim < 100
  if (endTrim < 100) {
    caps.push({ limit: 100, color: "rgba(0,0,0,0)", showTick: false });
  }
  return caps;
}

