/**
 * Overall SMS Volume Chart Component
 * 
 * This component displays the overall SMS volume trends over time
 * Chart Type: Line Chart (Recharts LineChart)
 * Dummy Data: Monthly SMS volume data for 12 months
 */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartInsight, { PRESET_INSIGHTS } from '../../ChartInsight';

const data = [
  { name: "Jan", volume: 45000 },
  { name: "Feb", volume: 52000 },
  { name: "Mar", volume: 48000 },
  { name: "Apr", volume: 61000 },
  { name: "May", volume: 55000 },
  { name: "Jun", volume: 67000 },
  { name: "Jul", volume: 72000 },
  { name: "Aug", volume: 69000 },
  { name: "Sep", volume: 78000 },
  { name: "Oct", volume: 83000 },
  { name: "Nov", volume: 76000 },
  { name: "Dec", volume: 81000 },
];

export default function OverallSMSVolume() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Overall SMS Volume</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [value.toLocaleString(), 'Volume']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="volume" 
              stroke="#3B82F6" 
              strokeWidth={2} 
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ChartInsight message={PRESET_INSIGHTS.increasingTrend} />
    </div>
  );
}
