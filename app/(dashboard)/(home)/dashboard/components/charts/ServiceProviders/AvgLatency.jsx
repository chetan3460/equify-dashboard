/**
 * Average Latency Metric Card Component
 * 
 * This component displays the average API response latency
 * Chart Type: Metric card with latency display and status indicator
 * Dummy Data: Current average latency with performance indicators
 */

export default function AvgLatency() {
  const currentLatency = 142; // in milliseconds
  const targetLatency = 150;
  const status = currentLatency <= targetLatency ? 'Good' : 'Warning';

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Average Latency</h3>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-blue-600">
          {currentLatency}ms
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'Good' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </span>
          <span className="text-sm text-gray-500">Target: {targetLatency}ms</span>
        </div>
        <div className="text-xs text-gray-400">
          P95: 285ms • P99: 420ms
        </div>
        <div className="text-xs text-gray-400">
          Last 5 minutes average
        </div>
      </div>
    </div>
  );
}
