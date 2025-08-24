/**
 * Reusable Tab Navigation Component
 *
 * This component creates a tab navigation interface with:
 * - Dynamic tab rendering based on props
 * - Active tab highlighting with different background
 * - Callback function for tab switching
 * - Clean TailwindCSS styling
 */

import { ChevronDown } from "lucide-react";

export default function Tabs({ tabs, activeTab, onTabClick }) {
  return (
    <div className="flex items-center justify-center">
      {/* Mobile: Dropdown */}
      <div className="sm:hidden w-full max-w-xs mb-4 relative">
        <select
          value={activeTab}
          onChange={(e) => onTabClick(e.target.value)}
          className="w-full rounded-full border border-primary bg-card py-2 pl-6 pr-10 text-sm font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
        >
          {tabs.map((tab) => (
            <option
              key={tab}
              value={tab}
              className={`${
                activeTab === tab
                  ? "font-bold text-primary bg-primary/10"
                  : "text-gray-700"
              }`}
            >
              {tab}
            </option>
          ))}
        </select>
        {/* Custom Arrow */}
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary"
          size={18}
        />
      </div>

      {/* Desktop: Tabs */}
      <nav
        className="hidden sm:inline-flex p-1 gap-2 bg-card rounded-full mb-4"
        aria-label="Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`${
              activeTab === tab
                ? "border-primary text-primary bg-primary/10 rounded-full"
                : "border-transparent text-gray-500 hover:border-primary hover:bg-primary/10 hover:text-primary"
            } whitespace-nowrap border py-2 px-6 text-sm font-semibold transition-colors duration-200 rounded-full`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
