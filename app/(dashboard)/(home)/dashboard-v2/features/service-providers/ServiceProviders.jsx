"use client";
import React, { useMemo } from "react";
import { SortableContainer } from "@/components/draggable";
import ProviderStatus from "./components/ProviderStatus/ProviderStatus";
import ProviderTraffic from "./components/ProviderTraffic/ProviderTraffic";
import APICallsToday from "./components/APICallsToday/APICallsToday";
import APICallsByProvider from "./components/APICallsByProvider/APICallsByProvider";
import OngoingTPS from "./components/OngoingTPS/OngoingTPS";
import AvgLatency from "./components/AvgLatency/AvgLatency";
import DeliveryReports from "./components/DeliveryReports/DeliveryReports";
import SuccessfulTransactions from "./components/SuccessfulTransactions/SuccessfulTransactions";

export default function ServiceProviders() {
  const items = useMemo(
    () => [
      { id: "provider-status", className: "lg:col-span-2 xl:col-span-4", component: <ProviderStatus /> },
      { id: "provider-traffic", className: "lg:col-span-2 xl:col-span-2", component: <ProviderTraffic /> },
      { id: "delivery-reports", className: "lg:col-span-2 xl:col-span-2", component: <DeliveryReports /> },
      { id: "api-calls-today", className: "", component: <APICallsToday /> },
      { id: "ongoing-tps", className: "", component: <OngoingTPS /> },
      { id: "avg-latency", className: "", component: <AvgLatency /> },
      { id: "successful-transactions", className: "", component: <SuccessfulTransactions /> },
      { id: "api-calls-by-provider", className: "lg:col-span-2 xl:col-span-4", component: <APICallsByProvider /> },
    ],
    []
  );

  return (
    <SortableContainer
      containerId="v2-service-providers"
      items={items}
      storageKey="v2-service-providers-order"
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

