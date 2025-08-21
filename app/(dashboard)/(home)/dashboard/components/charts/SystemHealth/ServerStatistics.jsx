/**
 * Server Statistics Component
 * 
 * This component displays server resource usage statistics
 * Chart Type: Bar Chart (Recharts BarChart) showing resource utilization
 * Dummy Data: CPU, Memory, Disk, and Network utilization percentages
 */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { resource: "CPU", usage: 68, color: "#3B82F6" },
  { resource: "Memory", usage: 82, color: "#F59E0B" },
  { resource: "Disk", usage: 45, color: "#10B981" },
  { resource: "Network", usage: 23, color: "#8B5CF6" },
];

export default function ServerStatistics() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Server Statistics</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="resource" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
            <Bar 
              dataKey="usage" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm font-medium">{item.resource}</span>
            <span className={`text-sm font-semibold ${
              item.usage > 80 ? 'text-red-600' : 
              item.usage > 60 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {item.usage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
