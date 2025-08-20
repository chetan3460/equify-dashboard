"use client";

import { useCallback } from "react";
import { Position } from "@unovis/ts";
import {
  VisXYContainer,
  VisStackedBar,
  VisAxis,
  VisTooltip,
} from "@unovis/react";
import { musicData } from "./data";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

const CrosshairStackedBar = ({ height = 400 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const labels = [
    {
      format: "vinyl",
      color: `hsl(${
        theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
      })`,
      icon: "vinyl-fill",
      label: "Vinyl",
    },
    {
      format: "cassette",
      color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,
      icon: "cassette-fill",
      label: "Cassette",
    },
    {
      format: "cd",
      color: `hsl(${
        theme?.cssVars[mode === "dark" ? "dark" : "light"].warning
      })`,
      icon: "disc-fill",
      label: "CD",
    },
    {
      format: "download",
      color: `hsl(${
        theme?.cssVars[mode === "dark" ? "dark" : "light"].success
      })`,
      icon: "music-player-fill",
      label: "Download",
    },
    {
      format: "streaming",
      color: `hsl(${
        theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
      })`,
      icon: "soundwave",
      label: "Streaming",
    },
  ];
  const getIcon = useCallback(
    (f) => (
      <>
        <span
          className={`bi bi-${f.icon}`}
          style={{ color: f.color, margin: "0 4px" }}
        ></span>
        {f.label}
      </>
    ),
    []
  );

  // Define callbacks at component level
  const xAccessor = useCallback((d) => d.year, []);
  
  // Create individual accessors for each format
  const vinylAccessor = useCallback((d) => d.vinyl, []);
  const cassetteAccessor = useCallback((d) => d.cassette, []);
  const cdAccessor = useCallback((d) => d.cd, []);
  const downloadAccessor = useCallback((d) => d.download, []);
  const streamingAccessor = useCallback((d) => d.streaming, []);
  
  const yAccessors = [vinylAccessor, cassetteAccessor, cdAccessor, downloadAccessor, streamingAccessor];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
      />
      {labels.map((l) => (
        <span key={l.label} style={{ marginRight: "10px" }}>
          {getIcon(l)}
        </span>
      ))}
      <VisXYContainer data={musicData} height={height}>
        <VisStackedBar
          x={xAccessor}
          y={yAccessors}
        />
        <VisTooltip
          verticalShift={height}
          horizontalPlacement={Position.Center}
        />
        <VisAxis
          type="x"
          tickTextColor={`hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`}
          labelColor={`hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`}
        />
      </VisXYContainer>
    </>
  );
};
export default CrosshairStackedBar;
