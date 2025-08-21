/**
 * Reusable Tab Navigation Component
 *
 * This component creates a tab navigation interface with:
 * - Dynamic tab rendering based on props
 * - Active tab highlighting with different background
 * - Callback function for tab switching
 * - Clean TailwindCSS styling
 */
export default function Tabs({ tabs, activeTab, onTabClick }) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`${
              activeTab === tab
                ? "border-blue-900 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap border-b-2 py-2 px-4 text-sm font-medium transition-colors duration-200 rounded-t-md`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
