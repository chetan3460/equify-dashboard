import React, { useState, useMemo } from 'react';

// Define interfaces for better type safety
const DataPoint = {
  x: 0,
  y: 0,
  label: '',
  value: 0
};

const OverallSMSVolume = ({ 
  data = null, 
  width = 600, 
  height = 400,
  showLegend = true,
  showGrid = true,
  animated = true,
  theme = 'light',
  // New testing props
  showTestControls = false,
  showDebugToggle = false,
  testTitle = "Interactive SMS Volume Testing",
  testSubtitle = "Test the dropdown functionality with different time periods"
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  
  // Test functionality states
  const [selectedTestPeriod, setSelectedTestPeriod] = useState('Today');
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Get data based on selected period
  const getDataByPeriod = (period, rawData) => {
    const dataMap = {
      'Today': {
        timeLabels: ['04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [
          {
            label: 'Total',
            color: '#369CFE',
            gradient: {
              start: '#369CFE',
              end: '#1E5BE0',
              angle: '189deg',
              stops: [{ offset: '22.7%', color: '#369CFE' }, { offset: '76.39%', color: '#1E5BE0' }]
            },
            data: [620000, 580000, 750000, 1000000, 420000]
          },
          {
            label: 'Delivered',
            color: '#318E33',
            gradient: {
              start: '#318E33',
              end: '#8AF5A8',
              angle: '53deg',
              stops: [{ offset: '8.75%', color: '#318E33' }, { offset: '90.78%', color: '#8AF5A8' }]
            },
            data: [590000, 560000, 720000, 950000, 400000]
          },
          {
            label: 'Failed',
            color: '#FF4E98',
            gradient: {
              start: '#FF4E98',
              end: '#FF4E98',
              angle: '0deg',
              stops: [{ offset: '0%', color: '#FF4E98' }, { offset: '100%', color: '#FF4E98' }]
            },
            data: [180000, 150000, 220000, 320000, 190000]
          },
          {
            label: 'Retry',
            color: '#FDBB2D',
            gradient: {
              start: '#FDBB2D',
              end: '#F77500',
              angle: '270deg',
              stops: [{ offset: '1.67%', color: '#FDBB2D' }, { offset: '117.65%', color: '#F77500' }]
            },
            data: [320000, 280000, 380000, 520000, 220000]
          }
        ]
      },
      'This Week': {
        timeLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Total',
            color: '#369CFE',
            gradient: {
              start: '#369CFE',
              end: '#1E5BE0',
              angle: '189deg',
              stops: [{ offset: '22.7%', color: '#369CFE' }, { offset: '76.39%', color: '#1E5BE0' }]
            },
            data: [2800000, 3200000, 2900000, 3500000, 4200000, 2200000, 1800000]
          },
          {
            label: 'Delivered',
            color: '#318E33',
            gradient: {
              start: '#318E33',
              end: '#8AF5A8',
              angle: '53deg',
              stops: [{ offset: '8.75%', color: '#318E33' }, { offset: '90.78%', color: '#8AF5A8' }]
            },
            data: [2600000, 3000000, 2700000, 3300000, 4000000, 2100000, 1700000]
          },
          {
            label: 'Failed',
            color: '#FF4E98',
            gradient: {
              start: '#FF4E98',
              end: '#FF4E98',
              angle: '0deg',
              stops: [{ offset: '0%', color: '#FF4E98' }, { offset: '100%', color: '#FF4E98' }]
            },
            data: [420000, 380000, 450000, 520000, 680000, 320000, 280000]
          },
          {
            label: 'Retry',
            color: '#FDBB2D',
            gradient: {
              start: '#FDBB2D',
              end: '#F77500',
              angle: '270deg',
              stops: [{ offset: '1.67%', color: '#FDBB2D' }, { offset: '117.65%', color: '#F77500' }]
            },
            data: [580000, 620000, 580000, 720000, 880000, 450000, 380000]
          }
        ]
      },
      'This Month': {
        timeLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Total',
            color: '#369CFE',
            gradient: {
              start: '#369CFE',
              end: '#1E5BE0',
              angle: '189deg',
              stops: [{ offset: '22.7%', color: '#369CFE' }, { offset: '76.39%', color: '#1E5BE0' }]
            },
            data: [18500000, 21200000, 19800000, 23500000]
          },
          {
            label: 'Delivered',
            color: '#318E33',
            gradient: {
              start: '#318E33',
              end: '#8AF5A8',
              angle: '53deg',
              stops: [{ offset: '8.75%', color: '#318E33' }, { offset: '90.78%', color: '#8AF5A8' }]
            },
            data: [17200000, 19800000, 18500000, 22100000]
          },
          {
            label: 'Failed',
            color: '#FF4E98',
            gradient: {
              start: '#FF4E98',
              end: '#FF4E98',
              angle: '0deg',
              stops: [{ offset: '0%', color: '#FF4E98' }, { offset: '100%', color: '#FF4E98' }]
            },
            data: [2800000, 3200000, 2900000, 3500000]
          },
          {
            label: 'Retry',
            color: '#FDBB2D',
            gradient: {
              start: '#FDBB2D',
              end: '#F77500',
              angle: '270deg',
              stops: [{ offset: '1.67%', color: '#FDBB2D' }, { offset: '117.65%', color: '#F77500' }]
            },
            data: [3800000, 4200000, 3900000, 4800000]
          }
        ]
      }
    };

    return dataMap[period] || dataMap['Today'];
  };

  // Process the provided hourly data or use default
  const processData = (rawData) => {
    // If rawData is provided, use it (for your real-time data)
    if (rawData && typeof rawData === 'object') {
      // Extract time labels and data from the provided format
      const timeLabels = [];
      const totalData = [];
      const deliveredData = [];
      const failedData = [];
      const retryData = [];

      Object.keys(rawData).forEach(key => {
        if (key !== 'lastUpdated' && rawData[key] && typeof rawData[key] === 'object') {
          timeLabels.push(key);
          totalData.push(rawData[key].total || 0);
          deliveredData.push(rawData[key].delivered || 0);
          failedData.push(rawData[key].failed || 0);
          retryData.push(rawData[key].retry || 0);
        }
      });

      return {
        timeLabels,
        lastUpdated: rawData.lastUpdated,
        datasets: [
          {
            label: 'Total',
            color: '#369CFE',
            gradient: {
              start: '#369CFE',
              end: '#1E5BE0',
              angle: '189deg',
              stops: [{ offset: '22.7%', color: '#369CFE' }, { offset: '76.39%', color: '#1E5BE0' }]
            },
            data: totalData
          },
          {
            label: 'Delivered',
            color: '#318E33',
            gradient: {
              start: '#318E33',
              end: '#8AF5A8',
              angle: '53deg',
              stops: [{ offset: '8.75%', color: '#318E33' }, { offset: '90.78%', color: '#8AF5A8' }]
            },
            data: deliveredData
          },
          {
            label: 'Failed',
            color: '#FF4E98',
            gradient: {
              start: '#FF4E98',
              end: '#FF4E98',
              angle: '0deg',
              stops: [{ offset: '0%', color: '#FF4E98' }, { offset: '100%', color: '#FF4E98' }]
            },
            data: failedData
          },
          {
            label: 'Retry',
            color: '#FDBB2D',
            gradient: {
              start: '#FDBB2D',
              end: '#F77500',
              angle: '270deg',
              stops: [{ offset: '1.67%', color: '#FDBB2D' }, { offset: '117.65%', color: '#F77500' }]
            },
            data: retryData
          }
        ]
      };
    }
    
    // Use period-based data when no rawData is provided
    return getDataByPeriod(selectedPeriod);
  };

  // Test data sets for external testing functionality
  const testDataSets = {
    'Today': {
      description: 'Hourly data for today showing peak traffic patterns',
      data: null, // Uses component's built-in Today data
      features: ['Hourly time labels', 'Peak traffic at 5 PM', 'Real-time updates']
    },
    'This Week': {
      description: 'Daily data for the current week showing weekday vs weekend patterns',
      data: null, // Uses component's built-in This Week data
      features: ['Daily time labels', 'Weekday peak patterns', 'Weekend variations']
    },
    'This Month': {
      description: 'Weekly data for the current month showing monthly trends',
      data: null, // Uses component's built-in This Month data
      features: ['Weekly time labels', 'Monthly growth trends', 'Seasonal variations']
    },
    'Custom Today': {
      description: 'Custom hourly data with realistic traffic patterns',
      data: {
        "lastUpdated": "16:30:00",
        "09:00": {
          "total": 245000,
          "delivered": 230000,
          "failed": 8000,
          "retry": 7000
        },
        "12:00": {
          "total": 380000,
          "delivered": 355000,
          "failed": 12000,
          "retry": 13000
        },
        "15:00": {
          "total": 520000,
          "delivered": 485000,
          "failed": 18000,
          "retry": 17000
        },
        "17:00": {
          "total": 750000,
          "delivered": 710000,
          "failed": 22000,
          "retry": 18000
        },
        "20:00": {
          "total": 450000,
          "delivered": 425000,
          "failed": 15000,
          "retry": 10000
        }
      },
      features: ['Business hours focus', 'Peak at 5 PM', 'Realistic failure rates']
    }
  };

  // Helper functions for test functionality
  const getCurrentTestData = () => {
    const testSet = testDataSets[selectedTestPeriod];
    return testSet ? testSet.data : null;
  };

  const getCurrentTestFeatures = () => {
    const testSet = testDataSets[selectedTestPeriod];
    return testSet ? testSet.features : [];
  };

  const getCurrentDescription = () => {
    const testSet = testDataSets[selectedTestPeriod];
    return testSet ? testSet.description : '';
  };

  // Determine final data to use
  const finalData = showTestControls ? getCurrentTestData() : data;
  const chartData = useMemo(() => processData(finalData), [finalData, selectedPeriod]);

  // Chart dimensions
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Calculate scales
  const { xScale, yScale, maxY } = useMemo(() => {
    const allValues = chartData.datasets.flatMap(dataset => dataset.data);
    const maxValue = Math.max(...allValues);
    const maxY = Math.ceil(maxValue * 1.1 / 5000) * 5000; // Round up to nearest 5k

    const xScale = (index) => (innerWidth * index) / (chartData.timeLabels.length - 1);
    const yScale = (value) => innerHeight - (value / maxY) * innerHeight;

    return { xScale, yScale, maxY };
  }, [chartData, innerWidth, innerHeight]);

  // Generate SVG paths for each dataset
  const generatePath = (data) => {
    if (!data.length) return '';
    
    const points = data.map((value, index) => ({
      x: xScale(index),
      y: yScale(value)
    }));

    // Create smooth curve using cubic bezier
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      const nextPoint = points[i + 1] || currentPoint;
      
      const cpx1 = prevPoint.x + (currentPoint.x - prevPoint.x) / 3;
      const cpy1 = prevPoint.y;
      const cpx2 = currentPoint.x - (nextPoint.x - currentPoint.x) / 3;
      const cpy2 = currentPoint.y;
      
      path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${currentPoint.x} ${currentPoint.y}`;
    }
    
    return path;
  };

  // Filter datasets based on selected metric
  const filteredDatasets = selectedMetric === 'all' 
    ? chartData.datasets 
    : chartData.datasets.filter((_, index) => index === parseInt(selectedMetric));

  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  // Generate Y-axis labels
  const yAxisLabels = useMemo(() => {
    const steps = 5;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const value = (maxY * i) / steps;
      return {
        value,
        label: formatNumber(value),
        y: yScale(value)
      };
    });
  }, [maxY, yScale]);

  // Calculate totals for summary stats
  const summaryStats = useMemo(() => {
    return chartData.datasets.map(dataset => ({
      label: dataset.label,
      color: dataset.color,
      total: dataset.data.reduce((sum, val) => sum + val, 0),
      average: Math.round(dataset.data.reduce((sum, val) => sum + val, 0) / dataset.data.length),
      trend: dataset.data[dataset.data.length - 1] > dataset.data[0] ? 'up' : 'down'
    }));
  }, [chartData]);

  return (
    <div className="w-full space-y-6">
      {/* Test Controls */}
      {showTestControls && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-xl p-8 border-2 border-indigo-200">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-900 mb-2">🎯 {testTitle}</h2>
            <p className="text-indigo-700 text-lg">{testSubtitle}</p>
          </div>

          {/* Test Controls */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-inner">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Test Period Selector</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(testDataSets).map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedTestPeriod(period)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        selectedTestPeriod === period
                          ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {showDebugToggle && (
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showDebugInfo}
                      onChange={(e) => setShowDebugInfo(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 font-medium">Show Debug Info</span>
                  </label>
                </div>
              )}
            </div>

            {/* Current Test Info */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">Current Test: {selectedTestPeriod}</h4>
              <p className="text-indigo-800 text-sm mb-3">{getCurrentDescription()}</p>
              <div className="flex flex-wrap gap-2">
                {getCurrentTestFeatures().map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Debug Info */}
          {showDebugToggle && showDebugInfo && (
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <h4 className="text-white font-semibold mb-3">🔍 Debug Information</h4>
              <div className="space-y-2">
                <div><span className="text-yellow-400">Selected Period:</span> {selectedTestPeriod}</div>
                <div><span className="text-yellow-400">Chart Data Points:</span> {chartData.timeLabels.length}</div>
                <div><span className="text-yellow-400">Time Labels:</span> [{chartData.timeLabels.join(', ')}]</div>
                <div><span className="text-yellow-400">Data Source:</span> {showTestControls && getCurrentTestData() ? 'Custom Test Data' : (data ? 'External Data' : 'Built-in Data')}</div>
                <div><span className="text-yellow-400">Last Updated:</span> {chartData.lastUpdated || 'N/A'}</div>
                <div className="mt-3">
                  <div className="text-yellow-400 mb-1">Dataset Values:</div>
                  {chartData.datasets.map((dataset, idx) => (
                    <div key={idx} className="ml-2">
                      <span style={{ color: dataset.color }}>• {dataset.label}:</span> [{dataset.data.map(formatNumber).join(', ')}]
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="text-yellow-400 mb-1">Component Props:</div>
                  <div className="ml-2 text-xs opacity-80">
                    width: {width}px, height: {height}px, theme: {theme}, animated: {animated.toString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Main Component */}
      <div className={`w-full p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-sm border border-gray-200`}>
        {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#201D1A] mb-1">Overall SMS volume</h2>
          <p className="text-xs text-gray-500">Last updated (hh:mm:ss)</p>
        </div>
        
        {/* Dropdown and Options Menu */}
        <div className="flex items-center gap-1">
          {/* Period Dropdown */}
          <div className="relative">
            <button 
              className="flex justify-center items-center gap-1 py-1 px-2 rounded border border-[#E0E0E0] text-[#201D1A] text-xs font-normal leading-[158.355%] tracking-[0.24px] hover:bg-gray-50 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ fontFamily: 'Poppins' }}
            >
              <span>{selectedPeriod}</span>
              <svg className={`w-3 h-3 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-xl z-20 animate-in fade-in-0 zoom-in-95 duration-100">
                <div className="py-1">
                  {['Today', 'This Week', 'This Month'].map((period, index) => (
                    <button
                      key={period}
                      className={`w-full px-3 py-2 text-left text-xs font-medium text-[#201D1A] hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 ${
                        selectedPeriod === period ? 'bg-blue-50 text-blue-700 font-semibold' : ''
                      } ${index === 0 ? 'rounded-t-md' : ''} ${index === 2 ? 'rounded-b-md' : ''}`}
                      onClick={() => {
                        setSelectedPeriod(period);
                        setIsDropdownOpen(false);
                      }}
                      style={{ fontFamily: 'Poppins' }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{period}</span>
                        {selectedPeriod === period && (
                          <svg className="w-3 h-3 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Options Button */}
          <div className="relative">
            <button 
              className="flex justify-center items-center w-6 h-6 hover:bg-gray-50 rounded focus:outline-none"
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="2" viewBox="0 0 2 2" fill="none">
                <path d="M1 1.5C1.41421 1.5 1.75 1.16421 1.75 0.75C1.75 0.335786 1.41421 0 1 0C0.585786 0 0.25 0.335786 0.25 0.75C0.25 1.16421 0.585786 1.5 1 1.5Z" fill="#201D1A"/>
              </svg>
            </button>
            
            {/* Options Dropdown */}
            {isOptionsOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white border border-[#E0E0E0] rounded shadow-lg z-20">
                {[
                  { label: 'Resize', icon: '📏' },
                  { label: 'Export', icon: '📤' },
                  { label: 'Settings', icon: '⚙️' },
                  { label: 'Refresh', icon: '🔄' }
                ].map((option) => (
                  <button
                    key={option.label}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-[#201D1A] hover:bg-gray-50 first:rounded-t last:rounded-b"
                    onClick={() => {
                      console.log(`${option.label} clicked`);
                      setIsOptionsOpen(false);
                    }}
                    style={{ fontFamily: 'Poppins' }}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside handler */}
      {(isDropdownOpen || isOptionsOpen) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setIsDropdownOpen(false);
            setIsOptionsOpen(false);
          }}
        ></div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="flex items-center space-x-6 mb-4">
          {chartData.datasets.map((dataset, index) => {
            // Calculate gradient coordinates for legend based on angle
            const angle = parseFloat(dataset.gradient.angle) || 0;
            const radians = (angle - 90) * Math.PI / 180;
            const x1 = 50 + 50 * Math.cos(radians);
            const y1 = 50 + 50 * Math.sin(radians);
            const x2 = 50 - 50 * Math.cos(radians);
            const y2 = 50 - 50 * Math.sin(radians);
            
            return (
              <div key={index} className="flex items-center space-x-2">
                <svg width="12" height="12" className="flex-shrink-0">
                  <defs>
                    <linearGradient 
                      id={`legend-gradient-${index}`} 
                      x1={`${x1}%`} 
                      y1={`${y1}%`} 
                      x2={`${x2}%`} 
                      y2={`${y2}%`}
                      gradientUnits="userSpaceOnUse"
                    >
                      {dataset.gradient.stops.map((stop, stopIndex) => (
                        <stop key={stopIndex} offset={stop.offset} stopColor={stop.color} />
                      ))}
                    </linearGradient>
                  </defs>
                  <circle 
                    cx="6" 
                    cy="6" 
                    r="6" 
                    fill={`url(#legend-gradient-${index})`}
                  />
                </svg>
                <span className="text-sm text-gray-700">{dataset.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Chart */}
      <div className="relative">
        <svg
          width={width} 
          height={height} 
          className={`border rounded-lg ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} ${animated ? 'transition-all duration-300' : ''}`}
        >
          {/* Gradients */}
          <defs>
            {chartData.datasets.map((dataset, index) => {
              // Calculate gradient coordinates based on angle
              const angle = parseFloat(dataset.gradient.angle) || 0;
              const radians = (angle - 90) * Math.PI / 180;
              const x1 = 50 + 50 * Math.cos(radians);
              const y1 = 50 + 50 * Math.sin(radians);
              const x2 = 50 - 50 * Math.cos(radians);
              const y2 = 50 - 50 * Math.sin(radians);
              
              return (
                <linearGradient 
                  key={index} 
                  id={`gradient-${index}`} 
                  x1={`${x1}%`} 
                  y1={`${y1}%`} 
                  x2={`${x2}%`} 
                  y2={`${y2}%`}
                  gradientUnits="userSpaceOnUse"
                >
                  {dataset.gradient.stops.map((stop, stopIndex) => (
                    <stop key={stopIndex} offset={stop.offset} stopColor={stop.color} />
                  ))}
                </linearGradient>
              );
            })}
          </defs>

          {/* Chart Background */}
          <rect 
            x={margin.left} 
            y={margin.top} 
            width={innerWidth} 
            height={innerHeight} 
            fill={theme === 'dark' ? '#374151' : 'white'} 
            stroke="none"
          />

          {/* Grid Lines */}
          {showGrid && (
            <g opacity="0.3">
              {/* Horizontal grid lines */}
              {yAxisLabels.map((label, i) => (
                <line
                  key={`h-grid-${i}`}
                  x1={margin.left}
                  y1={margin.top + label.y}
                  x2={margin.left + innerWidth}
                  y2={margin.top + label.y}
                  stroke={theme === 'dark' ? '#6B7280' : '#E5E7EB'}
                  strokeWidth="1"
                />
              ))}
              
              {/* Vertical grid lines */}
              {chartData.timeLabels.map((_, i) => (
                <line
                  key={`v-grid-${i}`}
                  x1={margin.left + xScale(i)}
                  y1={margin.top}
                  x2={margin.left + xScale(i)}
                  y2={margin.top + innerHeight}
                  stroke={theme === 'dark' ? '#6B7280' : '#E5E7EB'}
                  strokeWidth="1"
                />
              ))}
            </g>
          )}

          {/* Axes */}
          <line
            x1={margin.left}
            y1={margin.top + innerHeight}
            x2={margin.left + innerWidth}
            y2={margin.top + innerHeight}
            stroke={theme === 'dark' ? '#9CA3AF' : '#374151'}
            strokeWidth="2"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={margin.top + innerHeight}
            stroke={theme === 'dark' ? '#9CA3AF' : '#374151'}
            strokeWidth="2"
          />

          {/* Data Lines */}
          {filteredDatasets.map((dataset, datasetIndex) => {
            const originalIndex = chartData.datasets.findIndex(d => d.label === dataset.label);
            return (
              <g key={datasetIndex}>
                {/* Line Path */}
                <path
                  d={generatePath(dataset.data)}
                  fill="none"
                  stroke={`url(#gradient-${originalIndex})`}
                  strokeWidth="3"
                  transform={`translate(${margin.left}, ${margin.top})`}
                  className={animated ? 'transition-all duration-500' : ''}
                />

                {/* Data Points */}
                {dataset.data.map((value, pointIndex) => {
                  const isHovered = hoveredPoint?.dataset === datasetIndex && hoveredPoint?.point === pointIndex;
                  return (
                    <circle
                      key={pointIndex}
                      cx={margin.left + xScale(pointIndex)}
                      cy={margin.top + yScale(value)}
                      r={isHovered ? 7 : 5}
                      fill={isHovered ? dataset.color : "white"}
                      stroke={dataset.color}
                      strokeWidth="3"
                      className={`cursor-pointer ${animated ? 'transition-all duration-200' : ''}`}
                      style={{
                        filter: isHovered ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none'
                      }}
                      onMouseEnter={() => {
                        // Get all data for this time point
                        const timeData = {
                          total: chartData.datasets[0].data[pointIndex],
                          delivered: chartData.datasets[1].data[pointIndex],
                          failed: chartData.datasets[2].data[pointIndex],
                          retry: chartData.datasets[3].data[pointIndex]
                        };
                        
                        setHoveredPoint({ 
                          dataset: datasetIndex, 
                          point: pointIndex, 
                          value, 
                          label: chartData.timeLabels[pointIndex],
                          datasetLabel: dataset.label,
                          datasetColor: dataset.color,
                          allData: timeData
                        });
                      }}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* X-Axis Labels */}
          {chartData.timeLabels.map((label, i) => (
            <text
              key={`x-label-${i}`}
              x={margin.left + xScale(i)}
              y={margin.top + innerHeight + 25}
              textAnchor="middle"
              fontSize="12"
              fill={theme === 'dark' ? '#D1D5DB' : '#6B7280'}
            >
              {label}
            </text>
          ))}

          {/* Y-Axis Labels */}
          {yAxisLabels.map((label, i) => (
            <text
              key={`y-label-${i}`}
              x={margin.left - 15}
              y={margin.top + label.y + 4}
              textAnchor="end"
              fontSize="12"
              fill={theme === 'dark' ? '#D1D5DB' : '#6B7280'}
            >
              {label.label}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredPoint && (
          <div 
            className={`absolute z-20 p-4 rounded-lg shadow-xl border-2 min-w-48 ${
              theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
            }`}
            style={{
              left: margin.left + xScale(hoveredPoint.point) + 15,
              top: margin.top + yScale(hoveredPoint.value) - 120,
              pointerEvents: 'none'
            }}
          >
            {/* Time Header */}
            <div className="text-sm font-semibold mb-3 pb-2 border-b border-gray-200">
              📅 Time: {hoveredPoint.label}
            </div>
            
            {/* All Metrics */}
            <div className="space-y-2">
              {chartData.datasets.map((dataset, tooltipIndex) => {
                const dataValue = hoveredPoint.allData[dataset.label.toLowerCase()] || 
                                hoveredPoint.allData[dataset.label.toLowerCase().replace('ed', '')] ||
                                (dataset.label === 'Total' ? hoveredPoint.allData.total :
                                 dataset.label === 'Delivered' ? hoveredPoint.allData.delivered :
                                 dataset.label === 'Failed' ? hoveredPoint.allData.failed :
                                 dataset.label === 'Retry' ? hoveredPoint.allData.retry : 0);
                
                // Calculate gradient coordinates for tooltip indicators
                const angle = parseFloat(dataset.gradient.angle) || 0;
                const radians = (angle - 90) * Math.PI / 180;
                const x1 = 50 + 50 * Math.cos(radians);
                const y1 = 50 + 50 * Math.sin(radians);
                const x2 = 50 - 50 * Math.cos(radians);
                const y2 = 50 - 50 * Math.sin(radians);
                
                return (
                  <div key={tooltipIndex} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg width="12" height="12" className="flex-shrink-0">
                        <defs>
                          <linearGradient 
                            id={`tooltip-gradient-${tooltipIndex}`} 
                            x1={`${x1}%`} 
                            y1={`${y1}%`} 
                            x2={`${x2}%`} 
                            y2={`${y2}%`}
                            gradientUnits="userSpaceOnUse"
                          >
                            {dataset.gradient.stops.map((stop, stopIndex) => (
                              <stop key={stopIndex} offset={stop.offset} stopColor={stop.color} />
                            ))}
                          </linearGradient>
                        </defs>
                        <circle 
                          cx="6" 
                          cy="6" 
                          r="6" 
                          fill={`url(#tooltip-gradient-${tooltipIndex})`}
                        />
                      </svg>
                      <span className="text-xs font-medium">{dataset.label}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: dataset.color }}>
                      {formatNumber(dataValue)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Footer Message */}
      <div className="py-1 px-2 rounded-[8px] inline-block mt-3 bg-[#E2F5FD] text-[#0067B1] dark:bg-[#0D475F] dark:text-[#149BFC]">
        <p className="text-xs font-medium">Peak traffic at 5 pm as expected</p>
      </div>
      </div>
    </div>
  );
};

export default OverallSMSVolume;
