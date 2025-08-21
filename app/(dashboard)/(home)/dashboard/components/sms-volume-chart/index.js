/**
 * SMS Volume Chart Components
 * 
 * Centralized exports for all SMS Volume Chart related components,
 * utilities, and constants. Import from this file for convenience.
 */

// Main Components
export { default as SMSVolumeChart } from './SMSVolumeChart';
export { CustomTooltip } from './CustomTooltip';
export { CustomDot } from './CustomDot';

// Constants
export {
  SMS_COLORS,
  DOT_SIZES,
  CHART_CONFIG,
  THEME_COLORS,
  SMS_DATA_TEMPLATE,
  LEGEND_ITEMS
} from './constants';

// Utilities
export {
  formatYAxis,
  formatNumber,
  transformSMSData,
  calculateSuccessRate,
  calculateFailureRate,
  getPeakTrafficTime,
  validateSMSData,
  generateSampleSMSData
} from './utils';

/**
 * Usage Examples:
 * 
 * // Import main component
 * import { SMSVolumeChart } from './components/sms-volume-chart';
 * 
 * // Import styling guide
 * import { StylingGuide } from './components/sms-volume-chart';
 * 
 * // Import utilities
 * import { formatYAxis, SMS_COLORS } from './components/sms-volume-chart';
 * 
 * // Import everything
 * import * as SMSChart from './components/sms-volume-chart';
 */
