/**
 * Delivery Reports Chart Component
 * 
 * This component displays SMS delivery success rates over time
 * Chart Type: Line Chart (Recharts LineChart) with multiple lines for different metrics
 * Dummy Data: Delivery success rates, failed deliveries, and pending deliveries
 */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: "00:00", delivered: 98.5, failed: 1.2, pending: 0.3 },
  { time: "04:00", delivered: 97.8, failed: 1.8, pending: 0.4 },
  { time: "08:00", delivered: 99.1, failed: 0.7, pending: 0.2 },
  { time: "12:00", delivered: 98.9, failed: 0.9, pending: 0.2 },
  { time: "16:00", delivered: 99.3, failed: 0.5, pending: 0.2 },
  { time: "20:00", delivered: 98.7, failed: 1.1, pending: 0.2 },
];

const CustomLegend = () => (
  <div className="flex items-center gap-4 mb-2">
    <div className="flex items-center gap-2">
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "1.9px",
          background:
            "radial-gradient(138.42% 139.09% at 87.68% 34.49%, #FDBB2D 0%, #F77500 100%)",
        }}
      />
      <span className="text-xs">Messages Sent</span>
    </div>
    <div className="flex items-center gap-2">
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "1.9px",
          background:
            "linear-gradient(104deg, #A259FF 18.01%, #C084FC 86.89%)",
        }}
      />
      <span className="text-xs">Delivery Reports</span>
    </div>
  </div>
);

export default function DeliveryReports() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Delivery Reports (%)</h3>
      <CustomLegend />
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineDeliveryGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="18%" stopColor="#A259FF" />
                <stop offset="87%" stopColor="#C084FC" />
              </linearGradient>
              <radialGradient id="lineSentGradient" cx="87.68%" cy="34.49%" r="1">
                <stop offset="0%" stopColor="#FDBB2D" />
                <stop offset="100%" stopColor="#F77500" />
              </radialGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[95, 100]} />
            <Tooltip formatter={(value) => [`${value}%`, '']} />
            <Line 
              type="monotone" 
              dataKey="delivered" 
              stroke="url(#lineDeliveryGradient)" 
              strokeWidth={2}
              name="Delivery Reports"
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
