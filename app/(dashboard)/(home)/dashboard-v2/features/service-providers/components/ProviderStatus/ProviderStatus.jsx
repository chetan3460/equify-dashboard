/**
 * Provider Status Component
 *
 * This component displays the operational status of various SMS service providers
 * Chart Type: Status cards with Active/Inactive states
 * Data: 1 = Active, 0 = Inactive
 */

"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import DashboardSelect from "@/app/(dashboard)/(home)/dashboard-v2/ui/dashboard-select";
import OptionsDropdown from "@/app/(dashboard)/(home)/dashboard-v2/ui/OptionsDropdown";
import { providerStatus, getStatusList } from "./data";
import { PROVIDER_STATUS_CONFIG } from "./config";
import { exportCsv } from "@/lib/csv";
import { DragHandleDots16 as DragHandleIcon } from "@/ui/icons";

export default function ProviderStatus({
  optionsMenuItems,
  selectedPeriod = "Today",
  onPeriodChange,
  selectOptions = ["Today", "This week", "This month"],
}) {
  const { theme } = useTheme();
  const { isGlobalDragMode } = useDragContext();

  // Local period state (like ProviderTraffic)
  const [currentPeriod, setCurrentPeriod] = useState(selectedPeriod);
  useEffect(() => {
    setCurrentPeriod(selectedPeriod);
  }, [selectedPeriod]);
  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
    onPeriodChange?.(newPeriod);
  };

  // Build export rows once per render
  const exportRows = getStatusList(providerStatus).map(({ name, status }) => ({
    provider: name,
    status:
      status === 1
        ? PROVIDER_STATUS_CONFIG.statusLabels.active
        : PROVIDER_STATUS_CONFIG.statusLabels.inactive,
    status_code: status,
  }));

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <CardHeader>
          <CardTitle>Service provider status</CardTitle>
          <CardDescription>
            Last updated ({providerStatus.lastUpdated})
          </CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2">
          {isGlobalDragMode ? (
            <div className="cursor-grab flex items-center">
              <DragHandleIcon />
            </div>
          ) : (
            <>
              <DashboardSelect
                value={currentPeriod}
                onChange={handlePeriodChange}
                options={selectOptions}
              />
              <OptionsDropdown
                items={optionsMenuItems}
                onAction={(id) => {
                  if (id === "export")
                    exportCsv("provider-status.csv", exportRows);
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Providers with custom scrollbar */}
      <CardContent className="flex-1 flex flex-col">
        <div
          className="overflow-y-auto space-y-3 pr-2"
          style={{ maxHeight: `${PROVIDER_STATUS_CONFIG.scrollMaxHeight}px` }}
        >
          {getStatusList(providerStatus).map(({ name, status }, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 gap-5 border-b border-b-[#F1F1F1] dark:border-b-[#374151] last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-[6px] h-[6px] rounded-full ${
                    status === 1
                      ? PROVIDER_STATUS_CONFIG.dot.active
                      : PROVIDER_STATUS_CONFIG.dot.inactive
                  }`}
                ></div>
                <span className="font-medium text-sm text-default-900">
                  {name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 rounded-[8px] text-xs font-medium ${
                    status === 1
                      ? PROVIDER_STATUS_CONFIG.badge.active
                      : PROVIDER_STATUS_CONFIG.badge.inactive
                  }`}
                >
                  {status === 1
                    ? PROVIDER_STATUS_CONFIG.statusLabels.active
                    : PROVIDER_STATUS_CONFIG.statusLabels.inactive}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
