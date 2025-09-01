"use client";
import React, { useMemo } from "react";
import { SortableContainer } from "@/components/draggable";
import KafkaStatus from "./components/Kafka/KafkaStatus";
import DatabaseStatus from "./components/DatabaseStatus/DatabaseStatus";
import RedisStatus from "./components/RedisStatus/RedisStatus";
import WebserverStatus from "./components/WebserverStatus/WebserverStatus";
import ApplicationsComponent from "./components/Applications/Applications";

export default function Applications() {
  const items = useMemo(
    () => [
      { id: "kafka-status", className: "", component: <KafkaStatus /> },
      { id: "database-status", className: "", component: <DatabaseStatus /> },
      { id: "redis-status", className: "", component: <RedisStatus /> },
      { id: "webserver-status", className: "", component: <WebserverStatus /> },
      { id: "applications-status", className: "", component: <ApplicationsComponent /> },
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
        <div className="grid grid-cols-1  gap-4">
          {gridItems.map((item, index) =>
            SortableItem(item, index, item.className)
          )}
        </div>
      )}
    </SortableContainer>
  );
}
