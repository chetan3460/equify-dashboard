/**
 * Kafka Status Component
 * 
 * This component displays Kafka service health and metrics
 * Chart Type: Status card with small line chart showing message throughput
 * Dummy Data: Kafka status, throughput, and partition information
 */
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const throughputData = [
  { time: 1, messages: 1200 },
  { time: 2, messages: 1350 },
  { time: 3, messages: 1180 },
  { time: 4, messages: 1420 },
  { time: 5, messages: 1380 },
  { time: 6, messages: 1290 },
];

export default function KafkaStatus() {
  const status = "Operational";
  const topics = 24;
  const partitions = 156;
  const currentThroughput = 1290;

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Kafka Status</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{topics}</div>
          <div className="text-xs text-gray-500">Topics</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{partitions}</div>
          <div className="text-xs text-gray-500">Partitions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{currentThroughput}</div>
          <div className="text-xs text-gray-500">Msg/s</div>
        </div>
      </div>

      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={throughputData}>
            <Line 
              type="monotone" 
              dataKey="messages" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

