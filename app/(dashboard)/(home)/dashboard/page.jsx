"use client";
import React from "react";
import { useState, useMemo } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// SMS Volume Chart Components - Organized Structure
// import { SMSVolumeChart } from "./components/sms-volume-chart";

import TitleSection from "./components/TitleSection";
import EcommerceCardsNew from "./components/EcommerceCardsNew";

import Tabs from "./Tabs";

// SMS Volume Components
import OverallSMSVolume from "./components/charts/SMSVolume/OverallSMSVolume";
import SMSByDepartment from "./components/charts/SMSVolume/SMSByDepartment";
import SMSByProvider from "./components/charts/SMSVolume/SMSByProvider";

// Service Provider Components
import ProviderStatus from "./components/charts/ServiceProviders/ProviderStatus";
import ProviderTraffic from "./components/charts/ServiceProviders/ProviderTraffic";
import APICallsToday from "./components/charts/ServiceProviders/APICallsToday";
import APICallsByProvider from "./components/charts/ServiceProviders/APICallsByProvider";
import OngoingTPS from "./components/charts/ServiceProviders/OngoingTPS";
import AvgLatency from "./components/charts/ServiceProviders/AvgLatency";
import DeliveryReports from "./components/charts/ServiceProviders/DeliveryReports";
import SuccessfulTransactions from "./components/charts/ServiceProviders/SuccessfulTransactions";

// System Health Components
import ServerStatistics from "./components/charts/SystemHealth/ServerStatistics";
import SystemHealthAPICallsToday from "./components/charts/SystemHealth/APICallsToday";

// Application Components
import KafkaStatus from "./components/charts/Applications/KafkaStatus";
import DatabaseStatus from "./components/charts/Applications/DatabaseStatus";
import RedisStatus from "./components/charts/Applications/RedisStatus";
import WebserverStatus from "./components/charts/Applications/WebserverStatus";
import { SortableContainer } from "@/components/draggable";
const tabs = [
  "SMS volume",
  "Service providers",
  "System health",
  "Applications",
];

const Dashboard = () => {
  // Your provided SMS Volume data - CLEAN AND ORGANIZED
  const smsData = {
    lastUpdated: "15:15:45",
    "12:00": {
      total: 155130,
      delivered: 77434,
      failed: 22575,
      retry: 55121,
    },
    "13:00": {
      total: 155130,
      delivered: 77434,
      failed: 22575,
      retry: 55121,
    },
    "14:00": {
      total: 155130,
      delivered: 77434,
      failed: 22575,
      retry: 55121,
    },
    "15:00": {
      total: 155130,
      delivered: 77434,
      failed: 22575,
      retry: 55121,
    },
  };

  // Provider data based on your specification
  const providerData = {
    lastUpdated: "01:15:45",
    Airtel: {
      success: 20822,
      failed: 4191,
      total: 25013,
    },
    Jio: {
      success: 40011,
      failed: 15024,
      total: 55035,
    },
    VI: {
      success: 16609,
      failed: 3362,
      total: 19971,
    },
    BSNL: {
      success: 20822,
      failed: 4191,
      total: 25013,
    },
    Infobip: {
      success: 40011,
      failed: 15024,
      total: 55035,
    },
    Tanla: {
      success: 16609,
      failed: 3362,
      total: 19971,
    },
    Synch: {
      success: 40011,
      failed: 15024,
      total: 55035,
    },
    Equence: {
      success: 16609,
      failed: 3362,
      total: 19971,
    },
  };

  const [activeTab, setActiveTab] = useState("SMS volume");
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [deptSelectedPeriod, setDeptSelectedPeriod] = useState("Today");
  const [providerSelectedPeriod, setProviderSelectedPeriod] = useState("Today");

  const chartHeight = 300;

  // Build draggable items for SMS volume tab
  const smsChartItems = useMemo(
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
          />
        ),
      },
    ],
    [
      smsData,
      selectedPeriod,
      deptSelectedPeriod,
      providerSelectedPeriod,
      providerData,
    ]
  );

  const serviceProviderItems = useMemo(
    () => [
      {
        id: "provider-status",
        className: "lg:col-span-2 xl:col-span-4",
        component: <ProviderStatus />,
      },
      {
        id: "provider-traffic",
        className: "lg:col-span-2 xl:col-span-2",
        component: <ProviderTraffic />,
      },
      {
        id: "delivery-reports",
        className: "lg:col-span-2 xl:col-span-2",
        component: <DeliveryReports />,
      },
      { id: "api-calls-today", className: "", component: <APICallsToday /> },
      { id: "ongoing-tps", className: "", component: <OngoingTPS /> },
      { id: "avg-latency", className: "", component: <AvgLatency /> },
      {
        id: "successful-transactions",
        className: "",
        component: <SuccessfulTransactions />,
      },
      {
        id: "api-calls-by-provider",
        className: "lg:col-span-2 xl:col-span-4",
        component: <APICallsByProvider />,
      },
    ],
    []
  );

  const systemHealthItems = useMemo(
    () => [
      { id: "server-stats", className: "", component: <ServerStatistics /> },
      {
        id: "system-api-calls-today",
        className: "",
        component: <SystemHealthAPICallsToday />,
      },
    ],
    []
  );

  const applicationItems = useMemo(
    () => [
      { id: "kafka-status", className: "", component: <KafkaStatus /> },
      { id: "database-status", className: "", component: <DatabaseStatus /> },
      { id: "redis-status", className: "", component: <RedisStatus /> },
      { id: "webserver-status", className: "", component: <WebserverStatus /> },
    ],
    []
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "SMS volume":
        return (
          <div className="space-y-6">
            {/* Original SMS Volume Chart */}

            {/* Additional SMS Charts */}
            <SortableContainer
              containerId="sms-volume-charts"
              items={smsChartItems}
              storageKey="sms-volume-charts-order"
              strategy="grid"
              renderOverlay={(activeItem) => (
                <div className="scale-105 rotate-3">
                  {activeItem.component || activeItem}
                </div>
              )}
            >
              {(items, SortableItem) => (
                <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-y-2 gap-x-2">
                  {items.map((item, index) =>
                    SortableItem(item, index, item.className)
                  )}
                </div>
              )}
            </SortableContainer>
          </div>
        );
      case "Service providers":
        return (
          <SortableContainer
            containerId="service-provider-cards"
            items={serviceProviderItems}
            storageKey="service-provider-cards-order"
            strategy="grid"
            renderOverlay={(activeItem) => (
              <div className="scale-105 rotate-3">
                {activeItem.component || activeItem}
              </div>
            )}
          >
            {(items, SortableItem) => (
              <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                {items.map((item, index) =>
                  SortableItem(item, index, item.className)
                )}
              </div>
            )}
          </SortableContainer>
        );
      case "System health":
        return (
          <SortableContainer
            containerId="system-health-cards"
            items={systemHealthItems}
            storageKey="system-health-cards-order"
            strategy="grid"
            renderOverlay={(activeItem) => (
              <div className="scale-105 rotate-3">
                {activeItem.component || activeItem}
              </div>
            )}
          >
            {(items, SortableItem) => (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {items.map((item, index) =>
                  SortableItem(item, index, item.className)
                )}
              </div>
            )}
          </SortableContainer>
        );
      case "Applications":
        return (
          <SortableContainer
            containerId="application-cards"
            items={applicationItems}
            storageKey="application-cards-order"
            strategy="grid"
            renderOverlay={(activeItem) => (
              <div className="scale-105 rotate-3">
                {activeItem.component || activeItem}
              </div>
            )}
          >
            {(items, SortableItem) => (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {items.map((item, index) =>
                  SortableItem(item, index, item.className)
                )}
              </div>
            )}
          </SortableContainer>
        );
      default:
        return null;
    }
  };
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <TitleSection />
      {/* Draggable SMS Stats Cards */}
      <EcommerceCardsNew />

      <div className="">
        {/* Tab Navigation */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />

        {/* Tab Content */}
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="grid gap-5"
        >
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
