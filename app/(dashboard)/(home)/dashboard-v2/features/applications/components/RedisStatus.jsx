/**
 * Redis Status Component
 * 
 * This component displays Redis cache health and performance metrics
 * Chart Type: Status card with small line chart showing cache hit rate
 * Dummy Data: Redis status, memory usage, and cache performance
 */
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const hitRateData = [
  { time: 1, hitRate: 94.2 },
  { time: 2, hitRate: 95.1 },
  { time: 3, hitRate: 93.8 },
  { time: 4, hitRate: 96.2 },
  { time: 5, hitRate: 95.7 },
  { time: 6, hitRate: 94.9 },
];

export default function RedisStatus() {
  const status = "Operational";
  const memoryUsage = 68;
  const hitRate = 94.9;
  const connectedClients = 156;

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Redis Status</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{memoryUsage}%</div>
          <div className="text-xs text-gray-500">Memory</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{hitRate}%</div>
          <div className="text-xs text-gray-500">Hit Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{connectedClients}</div>
          <div className="text-xs text-gray-500">Clients</div>
        </div>
      </div>

      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hitRateData}>
            <Line 
              type="monotone" 
              dataKey="hitRate" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

