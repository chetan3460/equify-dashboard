"use client";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import "./recharts-custom.css";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, theme, mode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="p-3 border rounded-lg shadow-lg"
        style={{
          backgroundColor: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].card})`,
          borderColor: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].border})`,
          color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"]["card-foreground"]})`,
        }}
      >
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Legend Component
const CustomLegend = ({ payload, theme, mode }) => (
  <ul className="flex justify-center space-x-4 mt-4">
    {payload.map((entry, index) => (
      <li key={index} className="flex items-center space-x-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span
          style={{
            color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
          }}
        >
          {entry.value}
        </span>
      </li>
    ))}
  </ul>
);

const RechartsStyleExamples = () => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  // Sample data
  const lineData = [
    { name: "Jan", revenue: 4000, profit: 2400, expenses: 2400 },
    { name: "Feb", revenue: 3000, profit: 1398, expenses: 2210 },
    { name: "Mar", revenue: 2000, profit: 9800, expenses: 2290 },
    { name: "Apr", revenue: 2780, profit: 3908, expenses: 2000 },
    { name: "May", revenue: 1890, profit: 4800, expenses: 2181 },
    { name: "Jun", revenue: 2390, profit: 3800, expenses: 2500 },
  ];

  const pieData = [
    { name: "Desktop", value: 400, color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})` },
    { name: "Mobile", value: 300, color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})` },
    { name: "Tablet", value: 200, color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning})` },
    { name: "Other", value: 100, color: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})` },
  ];

  // Common chart props for theme integration
  const chartThemeProps = {
    margin: { top: 20, right: 30, left: 20, bottom: 20 },
  };

  const axisProps = {
    tick: {
      fill: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
      fontSize: 12,
    },
    tickLine: false,
    axisLine: {
      stroke: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].border})`,
      strokeWidth: 1,
    },
  };

  const gridProps = {
    stroke: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`,
    strokeDasharray: "3 3",
    strokeOpacity: 0.3,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      
      {/* 1. Styled Line Chart with Custom Tooltip */}
      <div className="bg-card rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">
          Styled Line Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData} {...chartThemeProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip 
              content={<CustomTooltip theme={theme} mode={mode} />}
            />
            <Legend 
              content={<CustomLegend theme={theme} mode={mode} />}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={`hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`}
              strokeWidth={3}
              dot={{
                r: 6,
                strokeWidth: 2,
                fill: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].background})`,
              }}
              activeDot={{
                r: 8,
                stroke: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
                strokeWidth: 2,
                fill: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
              }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke={`hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Gradient Area Chart */}
      <div className="bg-card rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">
          Gradient Area Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={lineData} {...chartThemeProps}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={`hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`} 
                  stopOpacity={0.8}
                />
                <stop 
                  offset="95%" 
                  stopColor={`hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`} 
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip 
              content={<CustomTooltip theme={theme} mode={mode} />}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={`hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`}
              strokeWidth={2}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Styled Bar Chart */}
      <div className="bg-card rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">
          Styled Bar Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={lineData} {...chartThemeProps}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip 
              content={<CustomTooltip theme={theme} mode={mode} />}
            />
            <Bar 
              dataKey="revenue" 
              fill={`hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="profit" 
              fill={`hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Custom Pie Chart */}
      <div className="bg-card rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">
          Custom Pie Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke={`hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].border})`}
              strokeWidth={2}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip theme={theme} mode={mode} />}
            />
            <Legend 
              content={<CustomLegend theme={theme} mode={mode} />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 5. Advanced Styling Tips */}
      <div className="md:col-span-2 bg-card rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">
          Styling Tips & Techniques
        </h3>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-card-foreground">1. Theme Integration:</h4>
            <p>Use your theme variables for consistent colors across charts.</p>
            <code className="bg-muted p-1 rounded text-xs">
              stroke={`hsl(${"${theme?.cssVars[mode].primary}"})`}
            </code>
          </div>
          
          <div>
            <h4 className="font-medium text-card-foreground">2. Custom Tooltips:</h4>
            <p>Create reusable tooltip components that match your design system.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-card-foreground">3. Responsive Design:</h4>
            <p>Always wrap charts in ResponsiveContainer for proper scaling.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-card-foreground">4. Animation:</h4>
            <p>Use CSS transitions and Recharts built-in animations for smooth interactions.</p>
          </div>

          <div>
            <h4 className="font-medium text-card-foreground">5. Custom Styling Classes:</h4>
            <p>Apply Tailwind classes to chart containers and add custom CSS for fine-tuning.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechartsStyleExamples;
