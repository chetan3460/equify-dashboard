/**
 * Chart Insight Component
 * 
 * A reusable component for displaying contextual insights or messages below charts.
 * Supports light/dark themes and can be customized with different styles.
 * 
 * Props:
 * - message: string (required) - The insight text to display
 * - variant: 'info' | 'success' | 'warning' | 'error' (optional, defaults to 'info')
 * - className: string (optional) - Additional CSS classes
 */
import React from 'react';

const VARIANTS = {
  info: {
    light: 'bg-[#E2F5FD] text-[#0067B1]',
    dark: 'dark:bg-[#0D475F] dark:text-[#149BFC]'
  },
  success: {
    light: 'bg-green-50 text-green-700',
    dark: 'dark:bg-green-900/20 dark:text-green-400'
  },
  warning: {
    light: 'bg-yellow-50 text-yellow-700',
    dark: 'dark:bg-yellow-900/20 dark:text-yellow-400'
  },
  error: {
    light: 'bg-red-50 text-red-700',
    dark: 'dark:bg-red-900/20 dark:text-red-400'
  }
};

export default function ChartInsight({ message, variant = 'info', className = '' }) {
  const variantStyles = VARIANTS[variant];
  
  return (
    <div className={`py-1 px-2 rounded-[8px] inline-block mt-3 ${variantStyles.light} ${variantStyles.dark} ${className}`}>
      <p className="text-xs font-medium">
        {message}
      </p>
    </div>
  );
}

// Export some preset messages for common use cases
export const PRESET_INSIGHTS = {
  peakTraffic: "Peak traffic at 5 pm as expected",
  dataUpToDate: "Data updated in real-time",
  performanceGood: "System performance is within normal range",
  increasingTrend: "Volume showing consistent upward trend",
  allServicesOperational: "All services are operational",
  highSuccessRate: "Success rate above target threshold",
  budgetOnTrack: "Spending is on track with monthly budget",
  capacityOptimal: "Resource utilization is optimal"
};
