"use client";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const LineChartWithPadding = ({ height = 300 }) => {
  const { theme: config } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  // Fallback colors if theme is not loaded
  const themeMode = mode === "dark" ? "dark" : "light";
  const fallbackColors = {
    primary: mode === "dark" ? "217.2 91.2% 59.8%" : "221.2 83.2% 53.3%",
    info: mode === "dark" ? "196.4 63.6% 23.7%" : "189 94% 43%",
    chartGird: mode === "dark" ? "217.2 32.6% 17.5%" : "214.3 31.8% 91.4%", // Note: keeping the typo as it exists in theme
    chartLabel: mode === "dark" ? "215 20.2% 65.1%" : "215.3 19.3% 34.5%",
    card: mode === "dark" ? "222.2 84% 4.9%" : "0 0% 100%",
    border: mode === "dark" ? "217.2 32.6% 17.5%" : "214.3 31.8% 91.4%",
    foreground: mode === "dark" ? "210 40% 98%" : "222.2 84% 4.9%",
  };

  // Get theme colors with fallbacks
  const getThemeColor = (colorKey) => {
    if (!theme?.cssVars?.[themeMode]) {
      console.warn(`Theme not loaded properly, using fallback for ${colorKey}`);
      return fallbackColors[colorKey] || fallbackColors.primary;
    }
    const themeColor = theme.cssVars[themeMode][colorKey];
    return themeColor || fallbackColors[colorKey] || fallbackColors.primary;
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  // Debug theme loading
  console.log("Theme debug:", {
    config,
    mode,
    theme: theme?.name,
    primaryColor: getThemeColor("primary"),
    chartGrid: getThemeColor("chartGird"),
  });

  return (
    <>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          width={800}
          height={height}
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            stroke="#DADADA"
            strokeDasharray="3 3"
            vertical={true}
            horizontal={true}
            strokeOpacity={1}
          />
          <XAxis
            dataKey="name"
            padding={{ left: 30, right: 30 }}
            tick={{
              fill: `hsl(${getThemeColor("chartLabel")})`,
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={{
              stroke: `hsl(${getThemeColor("chartGird")})`,
              strokeWidth: 1,
            }}
          />
          <YAxis
            tick={{
              fill: `hsl(${getThemeColor("chartLabel")})`,
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={{
              stroke: `hsl(${getThemeColor("chartGird")})`,
              strokeWidth: 1,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: `hsl(${
                getThemeColor("card") ||
                (mode === "dark" ? "222.2 84% 4.9%" : "0 0% 100%")
              })`,
              border: `1px solid hsl(${
                getThemeColor("border") ||
                (mode === "dark" ? "217.2 32.6% 17.5%" : "214.3 31.8% 91.4%")
              })`,
              borderRadius: "8px",
              color: `hsl(${
                getThemeColor("foreground") ||
                (mode === "dark" ? "210 40% 98%" : "222.2 84% 4.9%")
              })`,
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              color: `hsl(${getThemeColor("chartLabel")})`,
            }}
          />
          <Line
            type="monotone"
            dataKey="pv"
            stroke={`hsl(${getThemeColor("primary")})`}
            strokeWidth={3}
            dot={{
              fill: `hsl(${getThemeColor("primary")})`,
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 6,
              stroke: `hsl(${getThemeColor("primary")})`,
              strokeWidth: 2,
              fill: `hsl(${getThemeColor("primary")})`,
            }}
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke={`hsl(${getThemeColor("info")})`}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{
              fill: `hsl(${getThemeColor("info")})`,
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 6,
              stroke: `hsl(${getThemeColor("info")})`,
              strokeWidth: 2,
              fill: `hsl(${getThemeColor("info")})`,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartWithPadding;
