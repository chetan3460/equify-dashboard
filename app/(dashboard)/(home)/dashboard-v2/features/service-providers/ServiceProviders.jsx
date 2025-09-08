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
import { chartData as apiCallsChartData } from "./components/APICallsByProvider/data";
import { chartData as ongoingTPSChartData } from "./components/OngoingTPS/data";

export default function ServiceProviders() {
  const items = useMemo(
    () => {
      const spanApiTwoCols = apiCallsChartData.length > 6 ? "lg:col-span-2 h-full" : "";
      const spanOngoingTPSTwoCols = ongoingTPSChartData.length > 6 ? "lg:col-span-2 h-full" : "";
      return [
        {
          id: "provider-status",
          className: "",
          component: <ProviderStatus />,
        },
        {
          id: "provider-traffic",
          className: "",
          component: <ProviderTraffic />,
        },
        { id: "api-calls-today", className: "", component: <APICallsToday /> },

        { id: "delivery-reports", className: "", component: <DeliveryReports /> },
      { id: "ongoing-tps", className: spanOngoingTPSTwoCols, component: <OngoingTPS /> },
        {
          id: "avg-latency",
          className: "lg:col-span-2 h-full",
          component: <AvgLatency />,
        },
        {
          id: "successful-transactions",
          className: "lg:col-span-2 h-full",
          component: <SuccessfulTransactions />,
        },
        {
          id: "api-calls-by-provider",
          className: spanApiTwoCols,
          component: <APICallsByProvider />,
        },
      ];
    },
    []
  );

  return (
    <SortableContainer
      containerId="v2-service-providers"
      items={items}
      storageKey="v2-service-providers-order"
      strategy="grid"
      restrictBySpan={false}
      moveMode="swap"
    >
      {(gridItems, SortableItem) => (
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
          {gridItems.map((item, index) =>
            SortableItem(item, index, item.className)
          )}
        </div>
      )}
    </SortableContainer>
  );
}
