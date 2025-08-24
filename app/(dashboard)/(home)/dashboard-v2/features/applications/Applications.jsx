"use client";
import React, { useMemo } from "react";
import { SortableContainer } from "@/components/draggable";
import KafkaStatus from "./components/KafkaStatus";
import DatabaseStatus from "./components/DatabaseStatus";
import RedisStatus from "./components/RedisStatus";
import WebserverStatus from "./components/WebserverStatus";

export default function Applications() {
  const items = useMemo(
    () => [
      { id: "kafka-status", className: "", component: <KafkaStatus /> },
      { id: "database-status", className: "", component: <DatabaseStatus /> },
      { id: "redis-status", className: "", component: <RedisStatus /> },
      { id: "webserver-status", className: "", component: <WebserverStatus /> },
    ],
    []
  );

  return (
    <SortableContainer
      containerId="v2-applications"
      items={items}
      storageKey="v2-applications-order"
      strategy="grid"
      restrictBySpan={false}
    >
      {(gridItems, SortableItem) => (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {gridItems.map((item, index) => SortableItem(item, index, item.className))}
        </div>
      )}
    </SortableContainer>
  );
}

