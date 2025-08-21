/**
 * Provider Status Component
 * 
 * This component displays the operational status of various SMS service providers
 * Chart Type: Status cards with color indicators
 * Dummy Data: Provider status information with operational states
 */

const providerData = [
  { name: "Twilio", status: "Operational", statusColor: "bg-green-500", uptime: "99.9%" },
  { name: "Amazon SNS", status: "Operational", statusColor: "bg-green-500", uptime: "99.8%" },
  { name: "MessageBird", status: "Warning", statusColor: "bg-yellow-500", uptime: "98.5%" },
  { name: "Vonage", status: "Operational", statusColor: "bg-green-500", uptime: "99.7%" },
  { name: "Plivo", status: "Down", statusColor: "bg-red-500", uptime: "95.2%" },
];

export default function ProviderStatus() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-4">Provider Status</h3>
      <div className="space-y-3">
        {providerData.map((provider, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${provider.statusColor}`}></div>
              <span className="font-medium text-gray-900">{provider.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                provider.status === 'Operational' ? 'bg-green-100 text-green-800' :
                provider.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {provider.status}
              </span>
              <span className="text-sm text-gray-600">{provider.uptime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
