"use client";
import React, { useState } from "react";
import Tabs from "../Tabs";
import Link from "next/link";

// Simple interactive tab page to host docs/guides or playgrounds
export default function Interactive() {
  const tabs = [
    "Service providers",
    "SMS volume",
    "System health",
    "Applications",
    "Analytics",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderContent = () => {
    switch (activeTab) {
      case "Service providers":
        return (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Service providers – interactive guide</h2>
            <p className="text-sm text-default-700">
              Explore provider-centric cards like API Calls, TPS, Avg Latency, and Delivery Reports. Use
              the height prop (number or "auto") and centralized config.js/data.js per component.
            </p>
            <ul className="list-disc pl-5 text-sm">
              <li>height: number | "auto" to control chart container</li>
              <li>tickMargin and CustomTick for axis spacing and styling</li>
              <li>Gradients via defs from config.js</li>
            </ul>
          </div>
        );
      case "SMS volume":
        return (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">SMS volume – interactive guide</h2>
            <p className="text-sm text-default-700">
              Overall trends and breakdowns by provider and department. Configure visuals in config.js and
              shape data in data.js.
            </p>
            <ul className="list-disc pl-5 text-sm">
              <li>Use outerRadius to adjust pie size in SMSByDepartment</li>
              <li>Use tickMargin for label spacing in SMSByProvider</li>
              <li>tickFormatter for compact axis labels (1K/1M)</li>
            </ul>
          </div>
        );
      case "System health":
        return (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">System health – interactive guide</h2>
            <p className="text-sm text-default-700">
              Network and server metrics. Adopt the same height wrapper pattern and theme-aware config.
            </p>
          </div>
        );
      case "Applications":
        return (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Applications – interactive guide</h2>
            <p className="text-sm text-default-700">
              App, DB, Kafka, Redis, and Webserver status views. Heavier on tabular UI: keep data shaping separate
              from presentation and ensure accessibility.
            </p>
          </div>
        );
      case "Analytics":
        return (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Analytics – interactive guide</h2>
            <p className="text-sm text-default-700">
              Reusable gauges and helpers. Keep rendering separate from math and export simple, pure helpers.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Interactive</h1>
        <p className="text-sm text-default-700">Learn and test patterns used across dashboard features.</p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        <Link href="/dashboard-v2/guides" className="text-sm text-primary hover:underline">
          View full guides
        </Link>
      </div>

      <div className="grid gap-5" role="tabpanel" aria-label="Interactive tabs">
        {renderContent()}
      </div>
    </div>
  );
}
