/**
 * Webserver Status Component
 * 
 * This component displays web server health and request metrics
 * Chart Type: Status card with small line chart showing request rate
 * Dummy Data: Webserver status, request rate, and response times
 */
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const requestData = [
  { time: 1, requests: 850 },
  { time: 2, requests: 920 },
  { time: 3, requests: 780 },
  { time: 4, requests: 1050 },
  { time: 5, requests: 980 },
  { time: 6, requests: 890 },
];

export default function WebserverStatus() {
  const status = "Operational";
  const requestsPerMin = 890;
  const avgResponseTime = 45;
  const errorRate = 0.2;

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Webserver Status</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{requestsPerMin}</div>
          <div className="text-xs text-gray-500">Req/min</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{avgResponseTime}ms</div>
          <div className="text-xs text-gray-500">Avg Resp.</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{errorRate}%</div>
          <div className="text-xs text-gray-500">Error Rate</div>
        </div>
      </div>

      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={requestData}>
            <Line 
              type="monotone" 
              dataKey="requests" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
