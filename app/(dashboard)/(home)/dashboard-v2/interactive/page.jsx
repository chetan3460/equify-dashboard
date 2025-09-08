"use client";
import React, { useMemo, useState } from "react";
import Tabs from "../Tabs";
import Link from "next/link";
import { LineChart, Line, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// Simple interactive tab page to host docs/guides or playgrounds
export default function Interactive() {
  const tabs = [
    "Overview",
    "Service providers",
    "SMS volume",
    "System health",
    "Applications",
    "Analytics",
    "Playground",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Project overview</h2>
            <p className="text-sm text-default-700">
              This dashboard uses the Next.js App Router. Features are grouped under
              app/(dashboard)/(home)/dashboard-v2/features. Each card follows a consistent pattern:
              Component.jsx (UI), config.js (visuals), and data.js (mappers/mocks).
            </p>
            <div>
              <h3 className="text-sm font-semibold mb-1">Backend integration</h3>
              <ul className="list-disc pl-5 text-sm">
                <li>Option A: client fetch via /api route handlers (BFF). Add hooks per card.</li>
                <li>Option B: server-side fetch in page.jsx and pass props to client cards.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Common patterns</h3>
              <ul className="list-disc pl-5 text-sm">
                <li>Theme-aware visuals: getChartConfig(theme) from each config.js</li>
                <li>Height: number (px) or "auto"; parent must define height for "auto"</li>
                <li>Axes: CustomTick + tickMargin; tickFormatter for 1k/1M</li>
                <li>Gradients via defs in each card</li>
                <li>Tables: SortableHeaderCell + lib/sort for unified sorting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Guides</h3>
              <ul className="list-disc pl-5 text-sm">
                <li><Link href="/dashboard-v2/guides">Project Guide</Link></li>
                <li><Link href="/dashboard-v2/guides/service-providers">Service providers</Link></li>
                <li><Link href="/dashboard-v2/guides/sms-volume">SMS volume</Link></li>
                <li><Link href="/dashboard-v2/guides/system-health">System health</Link></li>
                <li><Link href="/dashboard-v2/guides/applications">Applications</Link></li>
                <li><Link href="/dashboard-v2/guides/analytics">Analytics</Link></li>
              </ul>
            </div>
          </div>
        );
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
      case "Playground":
        return <Playground />;
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

function Playground() {
  const baseData = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ time: String(i + 1), value: Math.round(Math.random() * 50000) })),
    []
  );
  const [height, setHeight] = useState(360);
  const [showGrid, setShowGrid] = useState(true);
  const [tickMargin, setTickMargin] = useState(8);
  const [showLabels, setShowLabels] = useState(true);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Chart playground</h2>
      <p className="text-sm text-default-700">Adjust common props and see how they affect the chart.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="text-sm flex items-center gap-2">
          Height (px)
          <input type="number" className="w-24 border rounded px-2 py-1" value={height} onChange={(e) => setHeight(parseInt(e.target.value || '0', 10))} />
        </label>
        <label className="text-sm flex items-center gap-2">
          Tick margin
          <input type="range" min={0} max={20} value={tickMargin} onChange={(e) => setTickMargin(parseInt(e.target.value, 10))} />
          <span className="text-xs">{tickMargin}px</span>
        </label>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
          Show grid
        </label>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} />
          Show labels
        </label>
      </div>

      <div style={{ height }} className="border rounded">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={baseData} margin={{ top: 8, right: 12, bottom: 24, left: 24 }}>
            {showGrid && <CartesianGrid stroke="#DADADA" strokeDasharray="3 3" />}
            <XAxis dataKey="time" tickMargin={tickMargin} hide={!showLabels} />
            <YAxis tickMargin={tickMargin} hide={!showLabels} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#B100AE" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
