"use client";
import React, { useMemo, useState } from "react";
import { SortableContainer } from "@/components/draggable";
import { OverallSMSVolume, SMSByDepartment, SMSByProvider } from "./index";

export default function SMSVolume() {
  // demo data (kept local to this feature)
  const smsData = {
    lastUpdated: "15:15:45",
    "12:00": { total: 155130, delivered: 77434, failed: 22575, retry: 55121 },
    "13:00": { total: 155130, delivered: 77434, failed: 22575, retry: 55121 },
    "14:00": { total: 155130, delivered: 77434, failed: 22575, retry: 55121 },
    "15:00": { total: 155130, delivered: 77434, failed: 22575, retry: 55121 },
  };
  const providerData = {
    lastUpdated: "01:15:45",
    Airtel: { total: 25013 },
    Jio: { total: 55035 },
    VI: { total: 19971 },
    BSNL: { total: 25013 },
    Infobip: { total: 55035 },
    Tanla: { total: 19971 },
    Synch: { total: 55035 },
    Equence: { total: 19971 },
  };

  // selection states
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [deptSelectedPeriod, setDeptSelectedPeriod] = useState("Today");
  const [providerSelectedPeriod, setProviderSelectedPeriod] = useState("Today");

  const chartHeight = 300;

  // Shared per-chart dropdown configurations
  const smsSelectOptions = ["Today", "This week", "This month", "YTD"];
  const defaultMenu = [
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
            providerData={providerData}
            selectedPeriod={providerSelectedPeriod}
            onPeriodChange={setProviderSelectedPeriod}
            selectOptions={smsSelectOptions}
            optionsMenuItems={defaultMenu}
          />
        ),
      },
    ],
    [smsData, providerData, selectedPeriod, deptSelectedPeriod, providerSelectedPeriod]
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
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-y-2 gap-x-2">
          {gridItems.map((item, index) => SortableItem(item, index, item.className))}
        </div>
      )}
    </SortableContainer>
  );
}

