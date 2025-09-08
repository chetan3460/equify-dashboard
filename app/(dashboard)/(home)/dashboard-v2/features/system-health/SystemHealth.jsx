"use client";
import React, { useMemo } from "react";
import { SortableContainer } from "@/components/draggable";
import ServerStatistics from "./components/ServerStatistics/ServerStatistics";
import APICallsToday from "./components/APICallsToday/APICallsToday";

export default function SystemHealth() {
  const items = useMemo(
    () => [
      { id: "server-stats", className: "", component: <ServerStatistics /> },
      {
        id: "system-api-calls-today",
        className: "",
        component: <APICallsToday />,
      },
    ],
    []
  );

  return (
    <SortableContainer
      containerId="v2-system-health"
      items={items}
      storageKey="v2-system-health-order"
      strategy="grid"
      restrictBySpan={false}
      moveMode="swap"
    >
      {(gridItems, SortableItem) => (
        <div className="grid grid-cols-1  gap-6">
          {gridItems.map((item, index) =>
            SortableItem(item, index, item.className)
          )}
        </div>
      )}
    </SortableContainer>
  );
}
