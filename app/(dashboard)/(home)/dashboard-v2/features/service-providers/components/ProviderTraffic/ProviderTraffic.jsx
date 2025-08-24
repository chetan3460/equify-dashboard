/**
 * Provider Traffic Chart Component
 * 
 * This component displays traffic patterns across different service providers over time
 * Chart Type: Multi-line Chart (Recharts LineChart)
 * Dummy Data: Hourly traffic data for multiple providers
 */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { time: "00:00", twilio: 1200, sns: 800, messagebird: 600, vonage: 400 },
  { time: "04:00", twilio: 800, sns: 600, messagebird: 400, vonage: 300 },
  { time: "08:00", twilio: 2200, sns: 1800, messagebird: 1200, vonage: 900 },
  { time: "12:00", twilio: 3200, sns: 2500, messagebird: 1800, vonage: 1200 },
  { time: "16:00", twilio: 2800, sns: 2200, messagebird: 1600, vonage: 1000 },
  { time: "20:00", twilio: 1800, sns: 1400, messagebird: 1000, vonage: 700 },
];

export default function ProviderTraffic() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Provider Traffic Patterns</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip formatter={(value) => [value.toLocaleString(), 'Messages']} />
            <Legend />
            <Line type="monotone" dataKey="twilio" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="sns" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="messagebird" stroke="#F59E0B" strokeWidth={2} />
            <Line type="monotone" dataKey="vonage" stroke="#EF4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

