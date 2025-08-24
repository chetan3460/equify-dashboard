/**
 * API Calls By Provider Chart Component
 * 
 * This component displays API call distribution across different service providers
 * Chart Type: Bar Chart (Recharts BarChart)
 * Dummy Data: API calls count by provider for today
 */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { provider: "Twilio", calls: 45230, color: "#3B82F6" },
  { provider: "Amazon SNS", calls: 38750, color: "#10B981" },
  { provider: "MessageBird", calls: 25180, color: "#F59E0B" },
  { provider: "Vonage", calls: 16296, color: "#EF4444" },
  { provider: "Plivo", calls: 0, color: "#6B7280" },
];

export default function APICallsByProvider() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">API Calls by Provider</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="provider" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip formatter={(value) => [value.toLocaleString(), 'API Calls']} />
            <Legend />
            <Bar 
              dataKey="calls" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

