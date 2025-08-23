"use client";
import React, { useState } from 'react';
import OverallSMSVolume from './OverallSMSVolume';

const InteractiveSMSVolume = ({ 
  title = "Interactive SMS Volume Testing",
  subtitle = "Test the dropdown functionality with different time periods",
  showTestControls = true,
  showDebugToggle = true,
  defaultPeriod = 'Today'
}) => {
  const [selectedTestPeriod, setSelectedTestPeriod] = useState(defaultPeriod);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Test data sets for different periods (matching component's built-in data structure)
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
    },
    'High Traffic Week': {
      description: 'Weekly data showing high traffic patterns with peaks and variations',
      data: null, // Uses component's built-in data but simulates high traffic
      features: ['High volume processing', 'Peak management', 'Scalability testing']
    },
    'Low Traffic Month': {
      description: 'Monthly data showing lower traffic patterns for off-peak analysis',
      data: null, // Uses component's built-in data
      features: ['Off-peak analysis', 'Resource optimization', 'Baseline metrics']
    }
  };

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

  return (
    <div className="w-full">
      {showTestControls && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-xl p-8 border-2 border-indigo-200 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-900 mb-2">🎯 {title}</h2>
            <p className="text-indigo-700 text-lg">{subtitle}</p>
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
        </div>
      )}

      {/* Main Component */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Component View - {selectedTestPeriod}
          </h3>
          <div className="text-sm text-gray-500">
            Internal dropdown available for period switching
          </div>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <OverallSMSVolume 
            data={getCurrentTestData()}
            width={900}
            height={500}
            showLegend={true}
            showGrid={true}
            animated={true}
            theme="light"
          />
        </div>

        {showTestControls && (
          <>
            {/* Status and Instructions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✅ Test Status</h4>
                <div className="text-green-800 text-sm space-y-1">
                  <div>• External Data: <span className="font-medium">{selectedTestPeriod}</span></div>
                  <div>• Component Ready: <span className="font-medium text-green-600">Active</span></div>
                  <div>• Dropdown Periods: <span className="font-medium">Today, This Week, This Month</span></div>
                  <div>• Features: <span className="font-medium">Tooltips, Options Menu, Animations</span></div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Instructions:</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Click buttons above to change external test data</li>
                  <li>• Use component's dropdown to switch periods internally</li>
                  <li>• Watch chart data change with dropdown selections</li>
                  <li>• Hover over data points for detailed tooltips</li>
                  <li>• Test options button (⋮) for menu functionality</li>
                </ul>
              </div>
            </div>

            {/* Debug Information */}
            {showDebugInfo && (
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">🔍 Debug Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">External Test Data:</h5>
                    <pre className="bg-white p-3 rounded border overflow-x-auto max-h-40">
                      {getCurrentTestData() ? JSON.stringify(getCurrentTestData(), null, 2) : 'null (using built-in data)'}
                    </pre>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Component Props:</h5>
                    <pre className="bg-white p-3 rounded border overflow-x-auto">
{`{
  data: ${getCurrentTestData() ? 'custom' : 'null'},
  width: 900,
  height: 500,
  showLegend: true,
  showGrid: true,
  animated: true,
  theme: "light"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InteractiveSMSVolume;
