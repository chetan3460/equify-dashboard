/**
 * Ongoing TPS (Transactions Per Second) Metric Card Component
 * 
 * This component displays the current transactions per second rate
 * Chart Type: Metric card with real-time TPS display
 * Dummy Data: Current TPS with trend indicators
 */

export default function OngoingTPS() {
  const currentTPS = 1247;
  const avgTPS = 1150;
  const percentageFromAvg = ((currentTPS - avgTPS) / avgTPS * 100).toFixed(1);

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-2">Ongoing TPS</h3>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-green-600">
          {currentTPS.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">transactions/second</div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${
            percentageFromAvg >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {percentageFromAvg >= 0 ? '+' : ''}{percentageFromAvg}%
          </span>
          <span className="text-sm text-gray-500">vs avg ({avgTPS})</span>
        </div>
        <div className="text-xs text-gray-400">
          Real-time • Updated every 5s
        </div>
      </div>
    </div>
  );
}

