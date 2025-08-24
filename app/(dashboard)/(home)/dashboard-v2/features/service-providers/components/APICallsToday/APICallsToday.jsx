/**
 * API Calls Today Metric Card Component
 * 
 * This component displays the total number of API calls made today
 * Chart Type: Metric card with large number display
 * Dummy Data: Total API calls count for today
 */

export default function APICallsToday() {
  const apiCallsCount = 125456;
  const yesterdayCount = 118234;
  const percentageChange = ((apiCallsCount - yesterdayCount) / yesterdayCount * 100).toFixed(1);

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">API Calls Today</h3>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-blue-600">
          {apiCallsCount.toLocaleString()}
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${
            percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {percentageChange >= 0 ? '+' : ''}{percentageChange}%
          </span>
          <span className="text-sm text-gray-500">vs yesterday</span>
        </div>
        <div className="text-xs text-gray-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

