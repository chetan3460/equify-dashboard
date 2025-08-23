/**
 * SMS Volume Chart Utility Functions
 * 
 * Helper functions for data formatting, calculations, and transformations
 * used throughout the SMS Volume Chart components.
 */

/**
 * Format Y-axis values to show in K format
 * @param {number} value - The numeric value to format
 * @returns {string} Formatted value (e.g., "50K", "1.5M")
 */
export const formatYAxis = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 0)}K`;
  }
  return value.toString();
};

/**
 * Format numbers with locale-specific thousand separators
 * @param {number} value - The numeric value to format
 * @returns {string} Formatted value with commas (e.g., "155,130")
 */
export const formatNumber = (value) => {
  return value?.toLocaleString() || '0';
};

/**
 * Transform SMS data structure to chart-ready format
 * @param {Object} smsData - Raw SMS data from your API
 * @returns {Array} Array of data points ready for Recharts
 */
export const transformSMSData = (smsData) => {
  const baseData = [
    { time: "10:00", total: 45000, delivered: 38000, failed: 7000 },
    { time: "11:00", total: 89000, delivered: 72000, failed: 17000 },
  ];

  // Add your actual SMS data
  const actualData = Object.keys(smsData)
    .filter(key => key !== 'lastUpdated')
    .map(timeKey => ({
      time: timeKey,
      total: smsData[timeKey]?.total || 0,
      delivered: smsData[timeKey]?.delivered || 0,
      failed: smsData[timeKey]?.failed || 0,
      retry: smsData[timeKey]?.retry || 0
    }));

  const endData = [
    { time: "16:00", total: 140000, delivered: 110000, failed: 30000 },
    { time: "17:00", total: 95000, delivered: 78000, failed: 17000 }
  ];

  return [...baseData, ...actualData, ...endData];
};

/**
 * Calculate success rate percentage
 * @param {number} delivered - Number of delivered messages
 * @param {number} total - Total number of messages
 * @returns {number} Success rate as percentage
 */
export const calculateSuccessRate = (delivered, total) => {
  if (!total || total === 0) return 0;
  return Math.round((delivered / total) * 100);
};

/**
 * Calculate failure rate percentage
 * @param {number} failed - Number of failed messages
 * @param {number} total - Total number of messages
 * @returns {number} Failure rate as percentage
 */
export const calculateFailureRate = (failed, total) => {
  if (!total || total === 0) return 0;
  return Math.round((failed / total) * 100);
};

/**
 * Get peak traffic time from data
 * @param {Array} chartData - Chart data array
 * @returns {string} Time period with highest total
 */
export const getPeakTrafficTime = (chartData) => {
  if (!chartData || chartData.length === 0) return 'N/A';
  
  const peak = chartData.reduce((max, current) => 
    current.total > max.total ? current : max
  );
  
  return peak.time;
};

/**
 * Validate SMS data structure
 * @param {Object} smsData - SMS data to validate
 * @returns {boolean} True if data structure is valid
 */
export const validateSMSData = (smsData) => {
  if (!smsData || typeof smsData !== 'object') return false;
  
  // Check if has lastUpdated
  if (!smsData.lastUpdated) return false;
  
  // Check if has at least one time period
  const timePeriods = Object.keys(smsData).filter(key => key !== 'lastUpdated');
  if (timePeriods.length === 0) return false;
  
  // Check if time periods have required fields
  return timePeriods.every(timeKey => {
    const data = smsData[timeKey];
    return data && 
           typeof data.total === 'number' &&
           typeof data.delivered === 'number' &&
           typeof data.failed === 'number';
  });
};

/**
 * Generate sample SMS data for testing
 * @returns {Object} Sample SMS data structure
 */
export const generateSampleSMSData = () => {
  return {
    "lastUpdated": new Date().toLocaleTimeString(),
    "12:00": {
      "total": 155130,
      "delivered": 77434,
      "failed": 22575,
      "retry": 55121
    },
    "13:00": {
      "total": 163250,
      "delivered": 85120,
      "failed": 18930,
      "retry": 59200
    },
    "14:00": {
      "total": 148900,
      "delivered": 79200,
      "failed": 19700,
      "retry": 50000
    },
    "15:00": {
      "total": 172400,
      "delivered": 92100,
      "failed": 21300,
      "retry": 59000
    }
  };
};
