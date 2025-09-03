# SMS Volume – Feature Guide

Location: app/(dashboard)/(home)/dashboard-v2/features/sms-volume

Components and structure
- OverallSMSVolume – (area/line) shows overall SMS trends
- SMSByDepartment – pie chart with legend of departments
- SMSByProvider – vertical bar chart of provider volumes

Key patterns
- config.js: theme-aware axis/grid/tooltip and other visual settings
- data.js: raw data and mapping helpers into chartData
- Component.jsx: presentation and event handling (selectors, options)

Height and sizing
- SMSByDepartment: accepts height (default from CHART_CONFIG.DEFAULT_HEIGHT). To make the pie larger without changing height, increase outerRadius (e.g., 90%).
- SMSByProvider: use tickMargin to add space between tick lines and labels. Height is set via wrapper div style.

Axis and tick formatting
- Use CustomTick to standardize tick color and font size based on theme
- Use tickFormatter (e.g., 1K/1M) for compact numeric axes

Adding a new SMS analytics card
1) Create components/<NewCard>/ with <NewCard>.jsx, config.js, data.js
2) Move all visual constants to config.js and shape your data in data.js
3) Render the chart in <NewCard>.jsx with a height prop and the wrapperStyle pattern
4) Use gradients via <defs> from config.js if needed

