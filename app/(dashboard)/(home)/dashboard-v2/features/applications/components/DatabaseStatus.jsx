/**
 * Database Status Component
 * 
 * This component displays database health and connection metrics
 * Chart Type: Status card with small bar chart showing connection pool usage
 * Dummy Data: Database status, connections, and query performance
 */
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

const connectionData = [
  { hour: 1, active: 45 },
  { hour: 2, active: 38 },
  { hour: 3, active: 52 },
  { hour: 4, active: 48 },
  { hour: 5, active: 55 },
  { hour: 6, active: 42 },
];

export default function DatabaseStatus() {
  const status = "Operational";
  const activeConnections = 42;
  const maxConnections = 100;
  const avgQueryTime = 28;

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Database Status</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{activeConnections}</div>
          <div className="text-xs text-gray-500">Active Conn.</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{maxConnections}</div>
          <div className="text-xs text-gray-500">Max Conn.</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{avgQueryTime}ms</div>
          <div className="text-xs text-gray-500">Avg Query</div>
        </div>
      </div>

      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={connectionData}>
            <Bar 
              dataKey="active" 
              fill="#3B82F6"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

