/**
 * Successful Transactions Metric Card Component
 * 
 * This component displays the total count of successful transactions today
 * Chart Type: Metric card with success count and rate display
 * Dummy Data: Successful transaction count with success rate percentage
 */

export default function SuccessfulTransactions() {
  const successfulCount = 123789;
  const totalCount = 125456;
  const successRate = ((successfulCount / totalCount) * 100).toFixed(2);
  const failedCount = totalCount - successfulCount;

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Successful Transactions</h3>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-green-600">
          {successfulCount.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">
          out of {totalCount.toLocaleString()} total
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-green-600">{successRate}%</span>
            <span className="text-sm text-gray-500">success rate</span>
          </div>
          <div className="text-sm text-red-600">
            {failedCount.toLocaleString()} failed
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${successRate}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-400">
          Today's performance
        </div>
      </div>
    </div>
  );
}

