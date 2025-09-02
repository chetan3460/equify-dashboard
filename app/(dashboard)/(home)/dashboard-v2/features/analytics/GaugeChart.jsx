"use client";
import React from "react";
import GaugeComponent from "react-gauge-component";

function parseNumericInput(val) {
  if (typeof val === "number") return val;
  const s = String(val ?? "")
    .replace(/,/g, "")
    .trim();
  if (!s) return 0;
  const lower = s.toLowerCase();
  if (lower.endsWith("k")) return parseFloat(lower) * 1000;
  if (lower.endsWith("m")) return parseFloat(lower) * 1_000_000;
  if (lower.endsWith("%")) return parseFloat(lower);
  return parseFloat(lower) || 0;
}

// Build AG-like gradient subArcs by default
function lerpColor(c1, c2, t) {
  const a = parseInt(c1.slice(1), 16);
  const b = parseInt(c2.slice(1), 16);
  const r1 = (a >> 16) & 0xff,
    g1 = (a >> 8) & 0xff,
    b1 = a & 0xff;
  const r2 = (b >> 16) & 0xff,
    g2 = (b >> 8) & 0xff,
    b2 = b & 0xff;
  const r = Math.round(r1 + (r2 - r1) * t)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(g1 + (g2 - g1) * t)
    .toString(16)
    .padStart(2, "0");
  const bl = Math.round(b1 + (b2 - b1) * t)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${bl}`;
}

function buildAgStyleSubArcs() {
  // Smooth gradient: 0-60 green->yellow, 60-80 yellow->orange, 80-100 dark grey tail
  const segments = [];
  const addRange = (startP, endP, startC, endC, steps) => {
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const p = Math.round(startP + (endP - startP) * t);
      segments.push({ limit: p, color: lerpColor(startC, endC, t) });
    }
  };
  addRange(0, 60, "#4cd137", "#f5cd19", 12);
  addRange(60, 80, "#f5cd19", "#f59e0b", 6);
  segments.push({ limit: 100, color: "#2a3440" });
  // Ensure limits are strictly increasing and unique
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

const GaugeChart = ({
  value = 0,
  maxValue = 100,
  showCenterValue = true,
  centerLabelMode = "short", // 'short' | 'percent' | 'raw'
  centerLabel,
  formatCenterLabel,
  width,
  height,
  className = "",
  style,
  gaugeStyle,
  subArcs,
  // arc/ticks styling
  arcWidth = 0.2,
  showTicks = false,
  defaultTickLineConfig,
  tickLineWidth = 1,
  tickLineLength = 7,
  tickLineColor = "rgb(173 172 171)",
  tickLineDistanceFromArc = 3,
  tickLineHide = false,
  shape = "semicircle", // 'semicircle' | 'radial'
  secondaryLabel,
  agStyle = true,
  flatCaps = true,
  // gradient controls
  useGradient = true, // enable gradient rendering
  gradientColors = ["#22c55e", "#f5cd19", "#EA4228"],
  tailColor = "var(--gauge-tail-color)",
  tailFromValue = true, // if true, fill up to value and use tail color afterwards
  gradientSteps = 120, // for manual gradient fill to value
  capTrimStartPercent = 0,
  capTrimEndPercent = 100,
  valueLabelFontSize = 24,
}) => {
  const numeric = parseNumericInput(value);
  const max = Number(maxValue) || 100;
  const percent = Math.max(0, Math.min(100, (numeric / max) * 100));

  const toShort = (n) => {
    if (n >= 1_000_000) {
      const v = n / 1_000_000;
      return `${Number.isInteger(v) ? v : v.toFixed(1)}m`;
    }
    if (n >= 1_000) {
      const v = n / 1_000;
      return `${Number.isInteger(v) ? v : v.toFixed(1)}k`;
    }
    return n.toLocaleString();
  };

  let defaultLabel = "";
  switch (centerLabelMode) {
    case "percent":
      defaultLabel = `${percent.toFixed(0)}%`;
      break;
    case "raw":
      defaultLabel =
        typeof value === "string" ? value : numeric.toLocaleString();
      break;
    case "short":
    default:
      defaultLabel = toShort(numeric);
  }

  const labelText =
    typeof centerLabel === "string"
      ? centerLabel
      : typeof formatCenterLabel === "function"
      ? formatCenterLabel({ numeric, percent, value })
      : defaultLabel;

  // Build subArcs
  let resolvedSubArcs = [];
  const startTrim = capTrimStartPercent;
  const endTrim = capTrimEndPercent;
  const p = Math.max(0, Math.min(100, (numeric / max) * 100));

  if (useGradient && tailFromValue) {
    // Manual gradient fill using 'length' segments so we avoid strict 'limit' ordering constraints.
    const end = Math.min(endTrim, Math.max(startTrim, p));

    const arr = [];
    const add = (seg) => arr.push(seg);

    // Transparent start cap length
    if (startTrim > 0)
      add({ length: startTrim / 100, color: "rgba(0,0,0,0)", showTick: false });

    // Gradient portion from startTrim -> end split into many tiny segments
    const gradLength = Math.max(0, end - startTrim);
    if (gradLength > 0) {
      const steps = Math.max(1, gradientSteps);
      const stepLen = gradLength / 100 / steps;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const idx = Math.min(
          gradientColors.length - 2,
          Math.floor(t * (gradientColors.length - 1))
        );
        const localT = t * (gradientColors.length - 1) - idx;
        const c = lerpColor(
          gradientColors[idx],
          gradientColors[idx + 1],
          localT
        );
        add({ length: stepLen, color: c, showTick: false });
      }
    }

    // Tail portion from end -> endTrim
    const tailLen = Math.max(0, endTrim - end);
    if (tailLen > 0)
      add({ length: tailLen / 100, color: tailColor, showTick: false });

    // Transparent end cap to 100
    const endCap = Math.max(0, 100 - endTrim);
    if (endCap > 0)
      add({ length: endCap / 100, color: "rgba(0,0,0,0)", showTick: false });

    resolvedSubArcs = arr;
  } else {
    const defaultSubArcs = agStyle
      ? buildAgStyleSubArcs()
      : [
          { limit: 20, color: "#EA4228" },
          { limit: 40, color: "#F58B19" },
          { limit: 60, color: "#F5CD19" },
          { limit: 100, color: "#22c55e" },
        ];
    let baseSubArcs = (
      Array.isArray(subArcs) && subArcs.length > 0 ? subArcs : defaultSubArcs
    ).map((s) => ({
      ...s,
      showTick:
        typeof s.showTick === "boolean"
          ? s.showTick
          : showTicks && !tickLineHide,
    }));

    if (flatCaps && shape === "semicircle") {
      const startTrim = capTrimStartPercent; // percent
      const endTrim = capTrimEndPercent; // percent

      // Filter and ensure strictly increasing limits between trims
      const mid = [];
      let prev = startTrim;
      for (const s of baseSubArcs) {
        const lim = Number(s.limit);
        if (!(lim > startTrim && lim < endTrim)) continue;
        if (lim <= prev) continue;
        mid.push(s);
        prev = lim;
      }

      const lastColor = mid.length
        ? mid[mid.length - 1].color
        : baseSubArcs.find(
            (s) => Number(s.limit) > startTrim && Number(s.limit) < 100
          )?.color ||
          baseSubArcs[0]?.color ||
          "#4cd137";

      const caps = [];
      // Transparent start cap up to startTrim
      caps.push({ limit: startTrim, color: "rgba(0,0,0,0)", showTick: false });
      // Mid segments
      for (const s of mid) caps.push(s);
      // Ensure an exact endTrim segment using the last visible color
      if (caps[caps.length - 1]?.limit !== endTrim) {
        caps.push({
          limit: endTrim,
          color: lastColor,
          showTick: showTicks && !tickLineHide,
        });
      }
      // Transparent end cap to 100 only when endTrim < 100
      if (endTrim < 100) {
        caps.push({ limit: 100, color: "rgba(0,0,0,0)", showTick: false });
      }
      resolvedSubArcs = caps;
    } else {
      resolvedSubArcs = baseSubArcs;
    }
  }

  const resolvedTickLineConfig = {
    width: tickLineWidth,
    length: tickLineLength,
    color: tickLineColor,
    distanceFromArc: tickLineDistanceFromArc,
    hide: tickLineHide || !showTicks,
    ...(defaultTickLineConfig || {}),
  };

  const containerStyle = {
    ...(style || {}),
    ...(typeof width === "string" ? { width } : {}),
    ...(typeof height === "string" ? { height } : {}),
  };
  const gaugeSizedStyle = {
    display: "block",
    ...(gaugeStyle || {}),
    ...(typeof width === "number" ? { width } : {}),
    ...(typeof height === "number" ? { height } : {}),
  };

  return (
    <div
      className={["relative text-default-900", className]
        .filter(Boolean)
        .join(" ")}
      style={containerStyle}
    >
      <GaugeComponent
        style={gaugeSizedStyle}
        type={shape}
        value={percent}
        arc={{
          width: arcWidth,
          padding: 0,
          cornerRadius: 0,
          gradient: useGradient && !tailFromValue,
          colorArray:
            useGradient && !tailFromValue ? gradientColors : undefined,
          defaultTickLineConfig: resolvedTickLineConfig,
          subArcs: resolvedSubArcs,
        }}
        pointer={{ hide: true }}
        labels={{
          valueLabel: {
            formatTextValue: () => (showCenterValue ? labelText : ""),
            style: {
              fill: "currentColor",
              fontSize: typeof valueLabelFontSize === "number" ? valueLabelFontSize : parseFloat(String(valueLabelFontSize)) || 24,
              fontWeight: 700,
              letterSpacing: "-0.2px",
              textShadow: "none",
              filter: "none",
            },
          },
          tickLabels: { hide: true },
          minMaxLabel: { hide: true },
        }}
      />
      {secondaryLabel ? (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1 text-xs text-default-900">
          {secondaryLabel}
        </div>
      ) : null}
    </div>
  );
};

export default GaugeChart;
