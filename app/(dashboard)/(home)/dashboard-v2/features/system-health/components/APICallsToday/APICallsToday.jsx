/**
 * API Calls Today Metric Card Component (System Health)
 *
 * This component displays the total number of API calls for system health monitoring
 * Chart Type: Metric card with system health focus
 * Dummy Data: API calls with system health indicators
 */

export default function APICallsToday() {
  const totalCalls = 125456;
  const healthyCalls = 123789;
  const errorCalls = 1667;
  const healthRate = ((healthyCalls / totalCalls) * 100).toFixed(1);

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">API Calls Today</h3>
      <div className="space-y-3">
        <div className="text-3xl font-bold text-blue-600">
          {totalCalls.toLocaleString()}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Healthy</span>
            <span className="text-sm font-semibold text-green-600">
              {healthyCalls.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Errors</span>
            <span className="text-sm font-semibold text-red-600">
              {errorCalls.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-green-600">
            {healthRate}%
          </span>
          <span className="text-sm text-gray-500">health rate</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${healthRate}%` }}
          ></div>
        </div>

        <div className="text-xs text-gray-400">System health monitoring</div>
      </div>
    </div>
  );
}
