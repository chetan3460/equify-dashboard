/**
 * Total API Calls Today Chart
 *
 * Single line chart showing API call counts over time.
 */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const rawData = {
  lastUpdated: "01:15:45",
  "12:00": 249495,
  "13:00": 4049392,
  "14:00": 232454,
  "15:00": 34545,
  "16:00": 155130,
};

// Convert object to array for Recharts
const data = Object.entries(rawData)
  .filter(([key]) => key !== "lastUpdated")
  .map(([time, value]) => ({ time, value }));

export default function TotalApiCallsChart() {
  return (
    <div className="p-4 border rounded-2xl shadow bg-white">
      <h3 className="text-lg font-semibold">Total API calls today</h3>
      <p className="text-sm text-gray-500 mb-2">
        Last updated (hh:mm:ss): {rawData.lastUpdated}
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#B100AE"
              strokeWidth={0.5}
              dot={{ r: 4, fill: "#fff", stroke: "#B100AE", strokeWidth: 1 }}
              activeDot={{ r: 6, fill: "#B100AE" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
