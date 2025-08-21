/**
 * SMS By Provider Chart Component
 * 
 * This component displays SMS volume distribution across different service providers
 * Chart Type: Pie Chart (Recharts PieChart)
 * Dummy Data: Provider-wise SMS volume distribution
 */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: "Twilio", value: 45000, color: "#3B82F6" },
  { name: "Amazon SNS", value: 35000, color: "#10B981" },
  { name: "MessageBird", value: 25000, color: "#F59E0B" },
  { name: "Vonage", value: 18000, color: "#EF4444" },
  { name: "Others", value: 12000, color: "#8B5CF6" },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function SMSByProvider() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">SMS Volume by Provider</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value.toLocaleString(), 'Volume']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
