export default function GuidesPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-xl font-bold">Dashboard Guides</h1>
        <p className="text-sm text-default-700">
          Learn the folder structure, how components are organized (Component + config.js + data.js), and how to add new features consistently.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Folder structure and usage</h2>
        <p className="text-sm text-default-700">
          The core dashboard lives at <code>app/(dashboard)/(home)/dashboard-v2</code>. It uses the App Router with route groups for clean URLs. Features are grouped under <code>features/</code>.
        </p>
        <ul className="list-disc pl-5 text-sm">
          <li>Each card lives in its own folder: <code>components/YourCard/</code></li>
          <li>3-file pattern: <code>YourCard.jsx</code>, <code>config.js</code> (theme-aware visuals), <code>data.js</code> (raw + mapping)</li>
          <li>Charts accept <code>height</code> prop: number (px) or <code>"auto"</code> (fills parent)</li>
          <li>Use <code>getChartConfig(theme)</code> for axis/grid/tooltip/gradients consistency</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Service providers</h2>
        <p className="text-sm text-default-700">
          Provider-centric cards (API Calls, TPS, Avg Latency, Delivery Reports, Status). Follow the height wrapper pattern and centralize styling in config.js.
        </p>
        <ul className="list-disc pl-5 text-sm">
          <li>Gradients via <code>&lt;defs&gt;</code> from config.js</li>
          <li>Axis spacing via <code>tickMargin</code> and a small <code>CustomTick</code></li>
          <li>Data mapping in <code>data.js</code>, keep components presentational</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">SMS volume</h2>
        <p className="text-sm text-default-700">
          Overall trends and breakdowns by provider/department. Use <code>tickFormatter</code> for compact axes and adjust pie size with <code>outerRadius</code>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">System health</h2>
        <p className="text-sm text-default-700">
          Network and server metrics. Adopt the same wrapper height pattern; theme-aware config drives styles.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Applications</h2>
        <p className="text-sm text-default-700">
          Tables for Apps/DB/Kafka/Redis/Webserver. Keep data transforms separate; ensure table accessibility.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Analytics</h2>
        <p className="text-sm text-default-700">
          Reusable gauge components with helper functions for math and rendering.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Add a new card (quick steps)</h2>
        <ol className="list-decimal pl-5 text-sm space-y-1">
          <li>Create <code>components/MyNewCard/</code> with <code>MyNewCard.jsx</code>, <code>config.js</code>, <code>data.js</code>.</li>
          <li>Use <code>getChartConfig(theme)</code> and the height wrapper (<code>number</code> or <code>"auto"</code>).</li>
          <li>Render <code>ResponsiveContainer</code> inside the wrapper; map gradients from config.</li>
          <li>Place the card in its section page (e.g., ServiceProviders.jsx).</li>
          <li>Optionally, add a sidebar submenu link in <code>config/menus.js</code>.</li>
        </ol>
      </section>
    </div>
  );
}

