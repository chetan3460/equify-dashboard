# System Health – Feature Guide

Location: app/(dashboard)/(home)/dashboard-v2/features/system-health

Components
- APICallsToday – area chart of network statistics (latency), supports height prop (default 384)
- ServerStatistics – server-level metrics (chart details vary)

Patterns
- Theme-aware config.js for axis, grid, tooltip, and series styles
- Data shaping in data.js
- Component renders ResponsiveContainer inside a wrapper div that sets height (prop or constant)

Height management
- APICallsToday (system-health) already accepts height; set a larger value (e.g., 440) when rendering or adjust the default in the component signature.
- If desired, apply the same "auto" pattern used in service-providers by computing wrapperStyle and using height="auto".

Adding new system-health cards
1) Create components/<NewCard>/ with <NewCard>.jsx, config.js, data.js
2) Keep visual constants in config.js and charts/metrics data mapping in data.js
3) Ensure height is controlled via a wrapper div for ResponsiveContainer

