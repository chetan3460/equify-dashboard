/**
 * Provider Status Component
 *
 * This component displays the operational status of various SMS service providers
 * Chart Type: Status cards with Active/Inactive states
 * Data: 1 = Active, 0 = Inactive
 */

"use client";
import React from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useDragContext } from "@/components/draggable/DragProvider";
import OptionsDropdown from "@/components/OptionsDropdown";
import { providerStatus, getStatusList } from "./data";
import { PROVIDER_STATUS_CONFIG } from "./config";
import { exportCsv } from "@/lib/csv";

export default function ProviderStatus({ optionsMenuItems }) {
  const { theme } = useTheme();
  const { isGlobalDragMode } = useDragContext();

  // Build export rows once per render
  const exportRows = getStatusList(providerStatus).map(({ name, status }) => ({
    provider: name,
    status: status === 1 ? PROVIDER_STATUS_CONFIG.statusLabels.active : PROVIDER_STATUS_CONFIG.statusLabels.inactive,
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
              {/* drag icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clipPath="url(#clip0_376_3320)">
                  <path
                    d="M5.75 4.5C6.16421 4.5 6.5 4.16421 6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75C5 4.16421 5.33579 4.5 5.75 4.5Z"
                    fill="black"
                  />
                  <path
                    d="M10.25 4.5C10.6642 4.5 11 4.16421 11 3.75C11 3.33579 10.6642 3 10.25 3C9.83579 3 9.5 3.33579 9.5 3.75C9.5 4.16421 9.83579 4.5 10.25 4.5Z"
                    fill="black"
                  />
                  <path
                    d="M5.75 8.75C6.16421 8.75 6.5 8.41421 6.5 8C6.5 7.58579 6.16421 7.25 5.75 7.25C5.33579 7.25 5 7.58579 5 8C5 8.41421 5.33579 8.75 5.75 8.75Z"
                    fill="black"
                  />
                  <path
                    d="M10.25 8.75C10.6642 8.75 11 8.41421 11 8C11 7.58579 10.6642 7.25 10.25 7.25C9.83579 7.25 9.5 7.58579 9.5 8C9.5 8.41421 9.83579 8.75 10.25 8.75Z"
                    fill="black"
                  />
                  <path
                    d="M5.75 13C6.16421 13 6.5 12.6642 6.5 12.25C6.5 11.8358 6.16421 11.5 5.75 11.5C5.33579 11.5 5 11.8358 5 12.25C5 12.6642 5.33579 13 5.75 13Z"
                    fill="black"
                  />
                  <path
                    d="M10.25 13C10.6642 13 11 12.6642 11 12.25C11 11.8358 10.6642 11.5 10.25 11.5C9.83579 11.5 9.5 11.8358 9.5 12.25C9.5 12.6642 9.83579 13 10.25 13Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_376_3320">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          ) : (
            <OptionsDropdown
              items={optionsMenuItems}
              onAction={(id) => {
                if (id === "export") exportCsv("provider-status.csv", exportRows);
              }}
            />
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
