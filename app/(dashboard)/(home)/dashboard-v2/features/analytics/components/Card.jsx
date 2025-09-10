"use client";
import React from "react";
import { DragHandleDots16 as DragHandle } from "@/ui/icons";
import { useDragContext } from "@/components/draggable/DragProvider";
import GaugeCard from "./GaugeCard";
import MetricCard from "./MetricCard";

/**
 * Small, presentational card.
 * Shows a gauge or a metric based on the data.type field.
 * All drag/persist concerns live outside; this only renders UI.
 */
export default function Card({ data }) {
  const { isGlobalDragMode } = useDragContext();
  const isGauge = data?.type === "gauge";

  return (
    <div className="rounded-20 p-4 bg-card shadow transition-all duration-300 group relative">
      {/* Drag handle, visible only in customize mode. Placed absolutely to avoid layout shifts. */}
      {isGlobalDragMode && (
        <div className="absolute top-2 right-2 z-10 opacity-75 hover:opacity-100 transition-opacity cursor-grab">
          <DragHandle />
        </div>
      )}

      {/* Title */}
      <div className="text-xs font-semibold text-default-600">{data.title}</div>

      {/* Main content */}
      {isGauge ? (
        <GaugeCard title={data.title} value={data.value} />
      ) : (
        <MetricCard value={data.value} trend={data.trend} change={data.change} color={data.color} />
      )}
    </div>
  );
}

