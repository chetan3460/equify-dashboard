"use client";

import { useState } from "react";
import Tabs from "./components/Tabs";

// SMS Volume Components
import OverallSMSVolume from "./components/charts/SMSVolume/OverallSMSVolume";
import SMSByDepartment from "./components/charts/SMSVolume/SMSByDepartment";
import SMSByProvider from "./components/charts/SMSVolume/SMSByProvider";
import SMSVolumeChart from "./components/sms-volume-chart/SMSVolumeChart";

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
import { SMS_COLORS } from "./components/sms-volume-chart/constants";

const tabs = ["SMS volume", "Service providers", "System health", "Applications"];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("SMS volume");

  // SMS Volume data from the original dashboard
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

  // Department data for pie chart
  const departmentData = {
    lastUpdated: "01:15:45",
    Marketing: {
      success: 77442,
      failed: 77704,
      total: 155146
    },
    Support: {
      success: 16606,
      failed: 3362,
      total: 19968
    },
    HR: {
      success: 20818,
      failed: 4191,
      total: 25009
    },
    Admin: {
      success: 77442,
      failed: 77704,
      total: 155146
    },
    Credit: {
      success: 16606,
      failed: 3362,
      total: 19968
    },
    Loan: {
      success: 20818,
      failed: 4191,
      total: 25009
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "SMS volume":
        // Use shared gradient stops for consistency
        const providerGradientStops = SMS_COLORS.TOTAL.stops; // blue gradient
        const deptGradientStops = SMS_COLORS.DELIVERED.stops; // green gradient
        return (
          <div className="space-y-6">
            {/* Original SMS Volume Chart */}
            <SMSVolumeChart smsData={smsData} height={400} />
            
            {/* Additional SMS Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <OverallSMSVolume />
              </div>
              <div>
                <SMSByProvider gradientId="provider-gradient-1" gradientStops={providerGradientStops} />
              </div>
              <div className="lg:col-span-2 xl:col-span-3">
                <SMSByDepartment deptData={departmentData} />
              </div>
            </div>
          </div>
        );
      case "Service providers":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="lg:col-span-2 xl:col-span-4">
              <ProviderStatus />
            </div>
            <div className="lg:col-span-2 xl:col-span-2">
              <ProviderTraffic />
            </div>
            <div className="lg:col-span-2 xl:col-span-2">
              <DeliveryReports />
            </div>
            <div>
              <APICallsToday />
            </div>
            <div>
              <OngoingTPS />
            </div>
            <div>
              <AvgLatency />
            </div>
            <div>
              <SuccessfulTransactions />
            </div>
            <div className="lg:col-span-2 xl:col-span-4">
              <APICallsByProvider />
            </div>
          </div>
        );
      case "System health":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ServerStatistics />
            </div>
            <div>
              <SystemHealthAPICallsToday />
            </div>
          </div>
        );
      case "Applications":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <div>
              <KafkaStatus />
            </div>
            <div>
              <DatabaseStatus />
            </div>
            <div>
              <RedisStatus />
            </div>
            <div>
              <WebserverStatus />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] dark:bg-background">
      <div className="container p-4 md:p-6 lg:p-8">
        {/* Tab Navigation */}
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabClick={setActiveTab} 
        />

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
}
