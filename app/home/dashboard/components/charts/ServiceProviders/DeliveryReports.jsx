/**
 * Delivery Reports Chart Component
 * 
 * This component displays SMS delivery success rates over time
 * Chart Type: Line Chart (Recharts LineChart) with multiple lines for different metrics
 * Dummy Data: Delivery success rates, failed deliveries, and pending deliveries
 */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { time: "00:00", delivered: 98.5, failed: 1.2, pending: 0.3 },
  { time: "04:00", delivered: 97.8, failed: 1.8, pending: 0.4 },
  { time: "08:00", delivered: 99.1, failed: 0.7, pending: 0.2 },
  { time: "12:00", delivered: 98.9, failed: 0.9, pending: 0.2 },
  { time: "16:00", delivered: 99.3, failed: 0.5, pending: 0.2 },
  { time: "20:00", delivered: 98.7, failed: 1.1, pending: 0.2 },
];

export default function DeliveryReports() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Delivery Reports (%)</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[95, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, '']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="delivered" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Delivered"
            />
            <Line 
              type="monotone" 
              dataKey="failed" 
              stroke="#EF4444" 
              strokeWidth={2}
              name="Failed"
            />
            <Line 
              type="monotone" 
              dataKey="pending" 
              stroke="#F59E0B" 
              strokeWidth={2}
              name="Pending"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
