# Service Providers – Feature Guide

Location: app/(dashboard)/(home)/dashboard-v2/features/service-providers

Components and structure
- Each component resides in components/<CardName>/ with:
  - <CardName>.jsx – the React component
  - config.js – chart styling (axis/grid/ticks/tooltip/gradients/sizes)
  - data.js – raw/mock data and data-to-chart transforms

Included components
- APICallsByProvider – vertical bar chart comparing successful vs failed API calls per provider
- APICallsToday – line chart of total API calls over time (server/display dropdowns)
- AvgLatency – bar chart (custom triangle bars) showing average latency per provider
- DeliveryReports – grouped bars for Messages Sent vs Delivery Reports
- OngoingTPS – bar chart of current TPS per provider (Live)
- ProviderStatus – list of providers with Active/Inactive status (non-chart)
- ProviderTraffic – traffic metrics by provider (chart type varies)
- SuccessfulTransactions – transaction success metrics (chart type varies)

Common props and patterns
- height: number | "auto"
  - number (pixels) sets a fixed chart height
  - "auto" makes the chart fill its parent; ensure the parent has a defined height
- optionsMenuItems: items for the kebab menu (OptionsDropdown)
- Some cards expose period selectors via DashboardSelect

Height wrapper pattern
- Compute wrapperStyle once:
  - if typeof height === "number" → { height: `${height}px` }
  - else → { height: "100%" }
- Wrap ResponsiveContainer in a div with style={wrapperStyle}

Gradients
- Define gradients in config.js (linearGradient or radialGradient specs)
- Reference them in the component via <defs> and fill="url(#gradId)"

Axis and tick formatting
- Use a CustomTick component to style labels per theme
- Use tickMargin on axes to control spacing between tick line and label

Adding a new provider card
1) Create components/<NewCard>/
2) Add config.js with axis/grid/tooltip/gradients settings
3) Add data.js with raw data (or selector) and mapping into chartData
4) Implement <NewCard>.jsx:
   - Import config and data
   - Accept height and compute wrapperStyle
   - Render ResponsiveContainer inside the wrapper
5) Export and import it where needed in dashboard-v2

