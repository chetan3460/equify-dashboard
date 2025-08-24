"use client";
import React, { useMemo, useState } from "react";
import TitleSection from "./ui/TitleSection";
import AnalyticCards from "./features/analytics/AnalyticCards";
import Tabs from "./Tabs";
// UI imports are now under ./ui (TitleSection, CustomizeIcon, etc.)
import SMSVolume from "./features/sms-volume/SMSVolume";
import ServiceProviders from "./features/service-providers/ServiceProviders";
import SystemHealth from "./features/system-health/SystemHealth";
import Applications from "./features/applications/Applications";

const tabs = ["SMS volume", "Service providers", "System health", "Applications"]; 

export default function DashboardV2() {
  const [activeTab, setActiveTab] = useState("SMS volume");


  const renderTabContent = () => {
    switch (activeTab) {
      case "SMS volume":
        return <SMSVolume />;
      case "Service providers":
        return <ServiceProviders />;
      case "System health":
        return <SystemHealth />;
      case "Applications":
        return <Applications />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <TitleSection />
      {/* Analytics cards row */}
      <AnalyticCards />

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />

      {/* Tab Content */}
      <div className="grid gap-5" role="tabpanel" aria-label="Dashboard V2 tabs">
        {renderTabContent()}
      </div>
    </div>
  );
}
