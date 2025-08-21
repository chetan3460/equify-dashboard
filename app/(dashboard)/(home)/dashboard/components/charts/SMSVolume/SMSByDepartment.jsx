/**
 * SMS By Department Chart Component
 * 
 * This component displays SMS volume distribution across different departments
 * Chart Type: Bar Chart (Recharts BarChart)
 * Dummy Data: Department-wise SMS volume data
 */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { department: "Marketing", volume: 28000, color: "#3B82F6" },
  { department: "Customer Support", volume: 35000, color: "#10B981" },
  { department: "Sales", volume: 22000, color: "#F59E0B" },
  { department: "Operations", volume: 18000, color: "#EF4444" },
  { department: "HR", volume: 12000, color: "#8B5CF6" },
  { department: "Finance", volume: 8000, color: "#F97316" },
];

export default function SMSByDepartment() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">SMS Volume by Department</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip formatter={(value) => [value.toLocaleString(), 'Volume']} />
            <Legend />
            <Bar 
              dataKey="volume" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
