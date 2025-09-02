"use client";
import React from "react";
import GaugeComponent from "react-gauge-component";
import {
  parseNumericInput,
  formatShort,
  buildAgStyleSubArcs,
  buildGradientToValueSubArcs,
  applyFlatCapsForSemicircle,
} from "./gauge-helpers";

const GaugeChart = ({
  value = 5000,
  maxValue = 10000,
  // title = "Current Total TPS",
  width,
  height,
  // enableAnimation = true,
  // showRealTimeUpdate = false,
  centerLabelMode = "short",
  showCenterValue = true,
  centerLabel,
  formatCenterLabel,
  valueLabelFontSize = 24,
  subArcs,
  className = "",
  style,
  gaugeStyle,
  arcWidth = 0.14,
  showTicks = false,
  defaultTickLineConfig,
  tickLineWidth = 1,
  tickLineLength = 7,
  tickLineColor = "rgb(173 172 171)",
  tickLineDistanceFromArc = 3,
  tickLineHide = false,
  shape = "semicircle",
  flatCaps = true,
  useGradient = true,
  gradientColors = ["#22c55e", "#f5cd19", "#EA4228"],
  tailColor = "var(--gauge-tail-color)",
  tailFromValue = true,
  gradientSteps = 120,
  capTrimStartPercent = 0,
  capTrimEndPercent = 100,
}) => {
  const numeric = parseNumericInput(value);
  const max = Number(maxValue) || 100;
  const percent = Math.max(0, Math.min(100, (numeric / max) * 100));

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
      defaultLabel = formatShort(numeric);
  }

  const labelText =
    typeof centerLabel === "string"
      ? centerLabel
      : typeof formatCenterLabel === "function"
      ? formatCenterLabel({ numeric, percent, value })
      : defaultLabel;

  // Build subArcs
  const resolvedSubArcs = (() => {
    if (useGradient && tailFromValue) {
      const startTrim = capTrimStartPercent;
      const endTrim = capTrimEndPercent;
      return buildGradientToValueSubArcs({
        percent,
        startTrim,
        endTrim,
        gradientColors,
        gradientSteps,
        tailColor,
        joinGapPercent: 0,
      });
    }

    if (useGradient) {
      const startTrim = capTrimStartPercent;
      const endTrim = capTrimEndPercent;
      const arr = [];
      if (startTrim > 0)
        arr.push({ limit: startTrim, color: "rgba(0,0,0,0)", showTick: false });
      if (endTrim > (arr[arr.length - 1]?.limit ?? -Infinity)) {
        arr.push({ limit: endTrim, showTick: false });
      }
      if (endTrim < 100)
        arr.push({ limit: 100, color: "rgba(0,0,0,0)", showTick: false });
      return arr;
    }

    const defaultSubArcs = buildAgStyleSubArcs();
    let baseSubArcs = (
      Array.isArray(subArcs) && subArcs.length > 0 ? subArcs : defaultSubArcs
    ).map((s) => ({
      ...s,
      showTick:
        typeof s.showTick === "boolean"
          ? s.showTick
          : showTicks && !tickLineHide,
    }));

    if (!(flatCaps && shape === "semicircle")) return baseSubArcs;

    const startTrim = 2;
    const endTrim = 98;

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
    caps.push({ limit: startTrim, color: "rgba(0,0,0,0)", showTick: false });
    for (const s of mid) caps.push(s);
    if (caps[caps.length - 1]?.limit !== endTrim) {
      caps.push({
        limit: endTrim,
        color: lastColor,
        showTick: showTicks && !tickLineHide,
      });
    }
    caps.push({ limit: 100, color: "rgba(0,0,0,0)", showTick: false });
    return caps;
  })();

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
      className={["relative text-default-900 gc-no-minmax", className]
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
            formatTextValue: () => "",
            style: {
              fill: "currentColor",
              fontSize:
                typeof valueLabelFontSize === "number"
                  ? valueLabelFontSize
                  : parseFloat(String(valueLabelFontSize)) || 24,
              fontWeight: 600,
              textShadow: "none",
              filter: "none",
            },
          },
          tickLabels: { hide: true },
          minMaxLabel: { hide: true },
        }}
      />
      {/* Overlay center label controlled by valueLabelFontSize to ensure exact sizing */}
      {showCenterValue ? (
        <div className="pointer-events-none absolute bottom-0 left-0 end-0 flex items-center justify-center">
          <div
            className="font-semibold"
            style={{
              fontSize:
                typeof valueLabelFontSize === "number"
                  ? valueLabelFontSize
                  : parseFloat(String(valueLabelFontSize)) || 24,
            }}
          >
            {labelText}
          </div>
        </div>
      ) : null}
      <style jsx global>{`
        /* Hide tick numeric labels and tick lines from the gauge SVG */
        .gc-no-minmax .tick-value,
        .gc-no-minmax .tick-line,
        .gc-no-minmax svg text[text-anchor="start"],
        .gc-no-minmax svg text[text-anchor="end"],
        .gc-no-minmax svg text[text-anchor="middle"] {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default GaugeChart;
