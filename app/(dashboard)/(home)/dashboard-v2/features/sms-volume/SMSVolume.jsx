"use client";
import React, { useMemo, useState } from "react";
import { SortableContainer } from "@/components/draggable";
import { OverallSMSVolume, SMSByDepartment, SMSByProvider } from "./index";

export default function SMSVolume() {
  // demo data (kept local to this feature)
  // Keep only lastUpdated; series values use component defaults
  const smsData = {
    lastUpdated: "15:15:45",
  };

  // selection states
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [deptSelectedPeriod, setDeptSelectedPeriod] = useState("Today");
  const [providerSelectedPeriod, setProviderSelectedPeriod] = useState("Today");

  const chartHeight = 300;

  // Shared per-chart dropdown configurations
  const smsSelectOptions = ["Today", "This week", "This month", "YTD"];
  const defaultMenu = [
    { id: "Resize", label: "Resize" },
    { id: "export", label: "Export" },
    { id: "settings", label: "Settings" },
    { id: "refresh", label: "Refresh" },
  ];

  const items = useMemo(
    () => [
      {
        id: "overall-sms",
        className: "h-full",
        component: (
          <OverallSMSVolume
            smsData={smsData}
            height={chartHeight}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            selectOptions={smsSelectOptions}
            optionsMenuItems={defaultMenu}
          />
        ),
      },
      {
        id: "dept-sms",
        className: "h-full",
        component: (
          <SMSByDepartment
            height={chartHeight}
            selectedPeriod={deptSelectedPeriod}
            onPeriodChange={setDeptSelectedPeriod}
            selectOptions={smsSelectOptions}
            optionsMenuItems={defaultMenu}
          />
        ),
      },
      {
        id: "provider-sms",
        className: "lg:col-span-2 h-full",
        component: (
          <SMSByProvider
            height={chartHeight}
            selectedPeriod={providerSelectedPeriod}
            onPeriodChange={setProviderSelectedPeriod}
            selectOptions={smsSelectOptions}
            optionsMenuItems={defaultMenu}
          />
        ),
      },
    ],
    [
      smsData,
      selectedPeriod,
      deptSelectedPeriod,
      providerSelectedPeriod,
    ]
  );

  return (
    <SortableContainer
      containerId="v2-sms-volume"
      items={items}
      storageKey="v2-sms-volume-order"
      strategy="grid"
      restrictBySpan={false}
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
