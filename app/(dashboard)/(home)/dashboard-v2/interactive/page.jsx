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
            {/* Guides section removed */}
          </div>
        );
      case "Service providers":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Service providers – cards architecture and data</h2>
            <p className="text-sm text-default-700">
              Provider-focused metrics with consistent component patterns: each folder groups a presentational component with
              config and data modules. The container arranges them in a drag-and-drop grid with persisted order.
            </p>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">What’s used</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Container:</strong> <code>features/service-providers/ServiceProviders.jsx</code> wires items into <code>SortableContainer</code>.</li>
                <li><strong>Cards:</strong> ProviderStatus, ProviderTraffic, APICallsToday, APICallsByProvider, OngoingTPS, AvgLatency, DeliveryReports, SuccessfulTransactions.</li>
                <li><strong>Per-card modules:</strong> <code>config.js</code> for theming/gradients/axes; <code>data.js</code> for demo data and mapping.</li>
                <li><strong>Global:</strong> DragProvider provides a global customize mode and drag handle behavior.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Folder structure</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><code>features/service-providers/ServiceProviders.jsx</code> — container.</li>
                <li><code>features/service-providers/components/&lt;CardName&gt;/&lt;CardName&gt;.jsx</code> — presentational card.</li>
                <li><code>features/service-providers/components/&lt;CardName&gt;/config.js</code> — chart/theme constants.</li>
                <li><code>features/service-providers/components/&lt;CardName&gt;/data.js</code> — demo or mapped data.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Container wiring (snippet)</h3>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// features/service-providers/ServiceProviders.jsx
<SortableContainer
  containerId="v2-service-providers"
  items={items}
  storageKey="v2-service-providers-order"
  strategy="grid"
  moveMode="swap"
>
  {(gridItems, SortableItem) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {gridItems.map((item, index) => SortableItem(item, index, item.className))}
    </div>
  )}
</SortableContainer>`}</code></pre>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Backend API: recommended shape</h3>
              <p className="text-sm text-default-700">Start with an aggregate endpoint to hydrate all cards efficiently:</p>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// GET /api/providers/overview -> { status, traffic, apiCallsToday, apiCallsByProvider, tps, avgLatency, deliveryReports }
// POST /api/providers/order -> { ok: true } (body: { order: string[] })`}</code></pre>
              <p className="text-sm text-default-700">You can also split into granular endpoints per card if needed for independent refresh.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Additional briefing points</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Performance:</strong> Memoize ticks and tooltips; avoid re-computing gradients on every render.</li>
                <li><strong>A11y:</strong> Provide aria-labels on drag handles; ensure legend and bars have sufficient contrast.</li>
                <li><strong>Export:</strong> All cards support CSV exports; keep data mappers in <code>data.js</code> for consistency.</li>
                <li><strong>Layout:</strong> Use <code>className</code> on item definitions to span cols when datasets are large.</li>
              </ul>
            </div>
          </div>
        );
      case "SMS volume":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">SMS volume – components and utilities</h2>
            <p className="text-sm text-default-700">
              Three charts: overall SMS trend, department pie, and provider bar chart. Shared constants and utils
              live under <code>features/sms-volume/utils</code>.
            </p>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">What’s used</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Container:</strong> <code>features/sms-volume/SMSVolume.jsx</code> provides shared state and DnD grid.</li>
                <li><strong>Charts:</strong> OverallSMSVolume, SMSByDepartment, SMSByProvider.</li>
                <li><strong>Utils:</strong> <code>utils/constants.js</code> (colors, legend, sizes), <code>utils/utils.js</code> (formatters).</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Folder structure</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><code>features/sms-volume/SMSVolume.jsx</code> — container.</li>
                <li><code>features/sms-volume/components/OverallSMSVolume/*</code> — line chart and subcomponents.</li>
                <li><code>features/sms-volume/components/SMSByDepartment/*</code> — pie chart by department.</li>
                <li><code>features/sms-volume/components/SMSByProvider/*</code> — vertical bar chart by provider.</li>
                <li><code>features/sms-volume/utils/*</code> — shared constants and helpers.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">API and data</h3>
              <p className="text-sm text-default-700">Aggregate or granular endpoints work well:</p>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// GET /api/sms/overview -> { overall, byDepartment, byProvider }
// POST /api/sms/order -> { ok: true } (body: { order: string[] })`}</code></pre>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li>Use compact formatters for axis labels and tooltips (K/M).</li>
                <li>Keep lastUpdated near the data source for consistent headers.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Additional briefing points</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Performance:</strong> Avoid re-creating gradients; memoize legend lists; defer heavy computations.</li>
                <li><strong>A11y:</strong> Titles/labels with aria and sufficient contrast; hover tooltips with readable font sizes.</li>
                <li><strong>Responsiveness:</strong> Guard label widths and Y-axis width; scroll long provider lists.</li>
              </ul>
            </div>
          </div>
        );
      case "System health":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">System health – tables and metrics</h2>
            <p className="text-sm text-default-700">Server table and a network time-series card, both consistent with the shared DnD/grid pattern.</p>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">What’s used</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Container:</strong> <code>features/system-health/SystemHealth.jsx</code>.</li>
                <li><strong>Cards:</strong> ServerStatistics (table), APICallsToday (network area chart).</li>
                <li><strong>Helpers:</strong> Generic sorting for tables; themed chart config for network chart.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">API suggestions</h3>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// GET /api/health/servers -> ServerRow[]
// GET /api/health/network -> { lastUpdated, points: Array<{ time: string, value: number }> }
// POST /api/health/order -> { ok: true }`}</code></pre>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li>Normalize time-series for charts (arrays of <code>{`{ time, value }`}</code>).</li>
                <li>Keep timestamps on rows for deriving lastUpdated.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Additional briefing points</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Tables:</strong> Sticky headers, internal scroll past a threshold, per-column sort.</li>
                <li><strong>Charts:</strong> Minimal tooltip noise; consistent ms formatting.</li>
                <li><strong>Export:</strong> Provide CSVs for both servers and network stats.</li>
              </ul>
            </div>
          </div>
        );
      case "Applications":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Applications – modules, tables, and dialogs</h2>
            <p className="text-sm text-default-700">Five cards: Kafka, Database, Redis, Webserver, and an Applications table — all sortable within the grid.</p>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">What’s used</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Container:</strong> <code>features/applications/Applications.jsx</code>.</li>
                <li><strong>Kafka:</strong> Table with expandable row dialog and toast alerts driven by thresholds; infinite scroll for topics.</li>
                <li><strong>Database/Redis/Webserver:</strong> Tables with column sorting and CSV export.</li>
                <li><strong>Applications:</strong> Table with status badges and critical markers.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Folder structure (high level)</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><code>features/applications/components/Kafka/*</code> — table, dialog, toasts, hooks, constants.</li>
                <li><code>features/applications/components/DatabaseStatus/*</code> — table + I/O details.</li>
                <li><code>features/applications/components/RedisStatus/*</code> — table.</li>
                <li><code>features/applications/components/WebserverStatus/*</code> — table.</li>
                <li><code>features/applications/components/Applications/*</code> — applications table.</li>
                <li><code>features/applications/components/shared/*</code> — shared table bits (badges, sortable headers).</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">API suggestions</h3>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// GET /api/apps/kafka -> { lastUpdated, rows: KafkaNode[] }
// GET /api/apps/database -> DatabaseRow[]
// GET /api/apps/redis -> RedisRow[]
// GET /api/apps/webserver -> WebserverRow[]
// GET /api/apps/applications -> ApplicationRow[]
// POST /api/apps/order -> { ok: true }`}</code></pre>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Additional briefing points</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Performance:</strong> Virtualize long topic lists; debounce sorting.</li>
                <li><strong>A11y:</strong> Keyboard focus in dialogs; aria-describedby for critical toasts.</li>
                <li><strong>Export:</strong> Normalize rows before CSV export to keep headers stable.</li>
              </ul>
            </div>
          </div>
        );
      case "Analytics":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Analytics – cards architecture and API integration</h2>
            <p className="text-sm text-default-700">
              The analytics cards follow a simple pattern: the container wires data and drag‑and‑drop, while
              the presentational components focus on rendering. This keeps the UI easy to read and the data
              flow straightforward to change. Below is a summary of what’s in use and how to hook it up to
              your backend.
            </p>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">What’s used in Analytics</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Drag & drop:</strong> shared <code>SortableContainer</code> (components/draggable) with a global <code>DragProvider</code> for save/cancel.</li>
                <li><strong>Presentational components:</strong> <code>Card</code> (decides gauge vs metric), <code>GaugeCard</code>, <code>MetricCard</code>.</li>
                <li><strong>Helpers:</strong> <code>utils/config.js</code> (gauge constants), <code>utils/numbers.js</code> (<code>formatCardValue</code>, <code>getNumericValue</code>),
                  <code>components/analytic-cards-helpers.js</code> (storage key, container id, saved‑order helper).</li>
                <li><strong>Data:</strong> <code>data/cards.js</code> hosts the initial list.</li>
                <li><strong>Global state:</strong> TanStack React Query is provided app‑wide via <code>providers/providers.jsx</code>.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Folder structure (Analytics)</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><code>features/analytics/AnalyticCards.jsx</code> — container; maps data to sortable items and renders the grid.</li>
                <li><code>features/analytics/components/Card.jsx</code> — presentational; shows a drag handle in customize mode, then either <code>GaugeCard</code> or <code>MetricCard</code>.</li>
                <li><code>features/analytics/components/GaugeCard.jsx</code> — gauge‑only view; centralizes gauge props.</li>
                <li><code>features/analytics/components/MetricCard.jsx</code> — metric‑only view; uses <code>formatCardValue</code> and small trend UI.</li>
                <li><code>features/analytics/components/analytic-cards-helpers.js</code> — <code>STORAGE_KEY</code>, <code>CONTAINER_ID</code>, and <code>applySavedOrder</code>.</li>
                <li><code>features/analytics/utils/config.js</code> — gauge constants (max, arc width, fonts, etc.).</li>
                <li><code>features/analytics/utils/numbers.js</code> — <code>getNumericValue</code>, <code>formatCardValue</code>.</li>
                <li><code>features/analytics/data/cards.js</code> — initial card list.</li>
              </ul>
              <p className="text-xs text-default-600">Related: global DnD lives in <code>components/draggable</code> (provider, confirmation popup, container).</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">How the order/save flow works</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li>The grid is rendered by <code>SortableContainer</code>. Each item is <code>{'{ id, component }'}</code>.</li>
                <li>Order is restored from <code>localStorage</code> using <code>STORAGE_KEY</code>; ids must remain stable.</li>
                <li>When the user clicks Save, the new order is exposed via <code>onItemsChange</code> and also stored to <code>localStorage</code>.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Container wiring (snippet)</h3>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// Map data to { id, component } and render inside SortableContainer
<SortableContainer
  containerId={CONTAINER_ID}
  items={items}
  storageKey={STORAGE_KEY}
  strategy="grid"
  onItemsChange={setItems}
>
  {(orderedItems, SortableItem) => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {orderedItems.map((item, index) => SortableItem(item, index))}
    </div>
  )}
</SortableContainer>`}</code></pre>
              <p className="text-xs text-default-600">The dashed border for customize mode comes from the container wrapper, keeping the card markup clean.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Backend API: recommended shape</h3>
              <p className="text-sm text-default-700">Expose two endpoints: one to fetch cards, another to persist order.</p>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// GET /api/analytics/cards -> { cards: CardData[] }
// POST /api/analytics/cards/order -> { ok: true } (body: { order: string[] })`}</code></pre>
              <p className="text-sm text-default-700">Example route handlers (Next.js App Router):</p>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// app/api/analytics/cards/route.js
export async function GET() {
  const cards = [
    { id: 'total-api', type: 'metric', title: 'Total API calls', value: 158700, trend: 'up', change: '+2.1%', color: 'text-green-600' },
    { id: 'latency', type: 'gauge', title: 'Avg latency', value: '132 ms' },
  ];
  return Response.json({ cards }, { status: 200 });
}`}</code></pre>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// app/api/analytics/cards/order/route.js
export async function POST(req) {
  const { order } = await req.json(); // ['latency','total-api', ...]
  // Persist to DB here
  return Response.json({ ok: true }, { status: 200 });
}`}</code></pre>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Client fetch & save (with React Query)</h3>
              <p className="text-sm text-default-700">A light wrapper keeps fetch logic out of the UI:</p>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// features/analytics/api/client.js
export async function getAnalyticsCards() {
  const res = await fetch('/api/analytics/cards', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load cards');
  const { cards } = await res.json();
  return cards;
}
export async function saveAnalyticsOrder(order) {
  await fetch('/api/analytics/cards/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order }),
  });
}`}</code></pre>
              <p className="text-sm text-default-700">Hook to load and map into sortable items:</p>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// features/analytics/hooks/useAnalyticCards.js
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/Card';
import { getAnalyticsCards } from '../api/client';
import { STORAGE_KEY } from '../components/analytic-cards-helpers';

export function useAnalyticCards() {
  const { data } = useQuery({ queryKey: ['analytics','cards'], queryFn: getAnalyticsCards, staleTime: 30_000 });
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    if (!data) return;
    const initial = data.map(d => ({ id: d.id, component: <Card data={d} /> }));
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return setItems(initial);
    try {
      const order = JSON.parse(saved);
      if (!Array.isArray(order) || order.length === 0) return setItems(initial);
      const map = new Map(initial.map(it => [it.id, it]));
      const reordered = order.map(o => map.get(o.id)).filter(Boolean);
      const remaining = initial.filter(it => !order.some(o => o.id === it.id));
      setItems([...reordered, ...remaining]);
    } catch { setItems(initial); }
  }, [data]);
  return { items, setItems };
}`}</code></pre>
              <p className="text-sm text-default-700">Save order on Save:</p>
              <pre className="bg-default-50 dark:bg-default-900/40 rounded p-3 overflow-auto text-xs"><code>{`// In AnalyticCards.jsx
env.onItemsChange = (newItems) => {
  setItems(newItems);
  const order = newItems.map(it => it.id);
  // POST to backend
  saveAnalyticsOrder(order);
};`}</code></pre>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li>Use a small skeleton while loading; surface a short error if fetch fails.</li>
                <li>Ids must be stable to restore order correctly.</li>
                <li>For live metrics, poll with <code>refetchInterval</code> or push updates via websockets.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Additional briefing points</h3>
              <ul className="list-disc pl-5 text-sm leading-6">
                <li><strong>Extending card types:</strong> Add a new component under <code>features/analytics/components</code>, route by <code>type</code> in <code>Card.jsx</code>, extend the data schema, and keep ids stable.</li>
                <li><strong>Performance:</strong> Wrap <code>Card</code>, <code>GaugeCard</code>, and <code>MetricCard</code> with <code>React.memo</code>; prefer CSS transforms during drag; avoid heavy chart re-renders in the drag overlay; debounce expensive calculations.</li>
                <li><strong>Accessibility (A11y):</strong> Make the drag handle a <code>button</code> with <code>aria-label</code>; support keyboard reordering (Enter/Space to grab, arrow keys to move); ensure sufficient color contrast for badges and trend indicators.</li>
                <li><strong>Error/empty states:</strong> Show skeletons while loading, a concise error on failure, and a helpful empty state when there are no cards.</li>
                <li><strong>SSR & hydration:</strong> Guard <code>localStorage</code> in <code>useEffect</code>; mark DnD-enabled components as <code>"use client"</code>; avoid accessing <code>window</code> during server render.</li>
                <li><strong>Internationalization:</strong> Use <code>Intl.NumberFormat</code> in <code>formatCardValue</code>; allow locale/units overrides via context or props.</li>
                <li><strong>Telemetry:</strong> Emit an <code>analytics_cards_order_changed</code> event with old/new order; include user identifier if available for audits.</li>
                <li><strong>Theming:</strong> Use Tailwind tokens and config-driven colors; avoid inline styles; keep spacing/typography consistent with the design system.</li>
                <li><strong>Testing:</strong> Unit test <code>utils/numbers.js</code>; component test <code>Card</code> rendering and formatting; interaction test reorder and persistence; mock fetch and <code>localStorage</code>.</li>
                <li><strong>Security/validation:</strong> Validate <code>POST /api/analytics/cards/order</code> payload; reject unknown ids; apply server-side authorization and input sanitation.</li>
              </ul>
            </div>
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
