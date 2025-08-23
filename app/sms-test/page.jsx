"use client";
import React, { useState } from 'react';
import OverallSMSVolume from '../../OverallSMSVolume';

const SMSTestPage = () => {
  const [selectedTestPeriod, setSelectedTestPeriod] = useState('Today');
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  // Real SMS data from the API
  const realSMSData = {
    "lastUpdated": "15:15:45",
    "12:00": {
      "total": 155130,
      "delivered": 77434,
      "failed": 22575,
      "retry": 55121
    },
    "13:00": {
      "total": 155130,
      "delivered": 77434,
      "failed": 22575,
      "retry": 55121
    },
    "14:00": {
      "total": 155130,
      "delivered": 77434,
      "failed": 22575,
      "retry": 55121
    },
    "15:00": {
      "total": 155130,
      "delivered": 77434,
      "failed": 22575,
      "retry": 55121
    }
  };

  // Sample varying data for demonstration
  const varyingData = {
    "lastUpdated": "15:15:45",
    "12:00": {
      "total": 155130,
      "delivered": 77434,
      "failed": 22575,
      "retry": 55121
    },
    "13:00": {
      "total": 168200,
      "delivered": 85600,
      "failed": 18900,
      "retry": 63700
    },
    "14:00": {
      "total": 142800,
      "delivered": 71200,
      "failed": 28100,
      "retry": 43500
    },
    "15:00": {
      "total": 176400,
      "delivered": 92300,
      "failed": 15800,
      "retry": 68300
    }
  };

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SMS Volume Component Demo</h1>
          <p className="text-gray-600 text-lg">Testing the new OverallSMSVolume component with different configurations</p>
        </div>

        <div className="space-y-12">
          {/* Interactive Dropdown Testing */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg shadow-xl p-8 border-2 border-indigo-200">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-indigo-900 mb-2">🎯 Interactive Dropdown Testing</h2>
              <p className="text-indigo-700 text-lg">Test the dropdown functionality with different time periods</p>
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

            {/* Main Test Component */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Component Test - {selectedTestPeriod} View
                </h3>
                <div className="text-sm text-gray-500">
                  Dropdown will show built-in periods
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
                  <h4 className="font-semibold text-yellow-800 mb-2">💡 Test Instructions:</h4>
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
            </div>
          </div>

          {/* Real SMS Data - Flat Line */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Real SMS Data (Consistent Values)</h2>
            <p className="text-gray-600 mb-6">Using your actual SMS data with consistent values across time periods</p>
            <OverallSMSVolume 
              data={realSMSData}
              width={800}
              height={400}
            />
          </div>

          {/* Real SMS Data - Varying Values */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">SMS Data with Variations</h2>
            <p className="text-gray-600 mb-6">Using modified data to show how the chart handles varying values</p>
            <OverallSMSVolume 
              data={varyingData}
              width={800}
              height={450}
            />
          </div>

          {/* Large Dark Theme Component */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Dark Theme with Real Data</h2>
            <p className="text-gray-300 mb-6">Large size with dark theme and varying data</p>
            <OverallSMSVolume 
              data={varyingData}
              width={900}
              height={500}
              theme="dark"
            />
          </div>

          {/* Compact Version */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Compact Dashboard Version</h2>
            <p className="text-gray-600 mb-6">Smaller size without legend, perfect for dashboards</p>
            <OverallSMSVolume 
              data={realSMSData}
              width={500}
              height={300}
              showLegend={false}
              animated={false}
            />
          </div>

          {/* Side by Side Comparison */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Side-by-Side Comparison</h2>
            <p className="text-gray-600 mb-6">Consistent data vs varying data</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-600">Consistent Data</h4>
                <OverallSMSVolume 
                  data={realSMSData}
                  width={400}
                  height={300}
                  showGrid={false}
                />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-gray-600">Varying Data</h4>
                <OverallSMSVolume 
                  data={varyingData}
                  width={400}
                  height={300}
                  showGrid={false}
                />
              </div>
            </div>
          </div>

          {/* Data Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Raw Data Structure</h2>
            <p className="text-gray-600 mb-4">This is the data format your component expects:</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold mb-2">Consistent Data Example:</h4>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
                  {JSON.stringify(realSMSData, null, 2)}
                </pre>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Varying Data Example:</h4>
                <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
                  {JSON.stringify(varyingData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Component Information */}
        <div className="bg-blue-50 rounded-lg p-6 mt-12">
          <h3 className="text-xl font-semibold mb-4 text-blue-900">Component Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded">
              <strong>Interactive:</strong> Hover over data points for detailed tooltips
            </div>
            <div className="bg-white p-3 rounded">
              <strong>Responsive:</strong> Works on all screen sizes
            </div>
            <div className="bg-white p-3 rounded">
              <strong>Customizable:</strong> Size, theme, animations, and more
            </div>
            <div className="bg-white p-3 rounded">
              <strong>Smart Scaling:</strong> Automatic Y-axis scaling and formatting
            </div>
            <div className="bg-white p-3 rounded">
              <strong>Summary Stats:</strong> Overview cards with trends and totals
            </div>
            <div className="bg-white p-3 rounded">
              <strong>Metric Filter:</strong> Show all or individual metrics
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSTestPage;
