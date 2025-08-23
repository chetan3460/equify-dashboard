"use client";
import React, { useState } from 'react';
import OverallSMSVolume from './OverallSMSVolume';

const ThisMonthView = ({ 
  width = 900, 
  height = 500, 
  theme = 'light',
  showHeader = true,
  showControls = true
}) => {
  const [viewMode, setViewMode] = useState('This Month');
  const [showAnalytics, setShowAnalytics] = useState(false);

  // This Month specific data and configurations
  const monthViewData = {
    'This Month': {
      data: null, // Uses built-in This Month data
      title: 'Monthly Overview',
      description: 'Complete monthly SMS volume analysis'
    },
    'Custom Month': {
      data: {
        "lastUpdated": "2024-01-31 23:59:59",
        "Week 1": {
          "total": 18500000,
          "delivered": 17200000,
          "failed": 800000,
          "retry": 500000
        },
        "Week 2": {
          "total": 21200000,
          "delivered": 19800000,
          "failed": 900000,
          "retry": 500000
        },
        "Week 3": {
          "total": 19800000,
          "delivered": 18500000,
          "failed": 850000,
          "retry": 450000
        },
        "Week 4": {
          "total": 23500000,
          "delivered": 22100000,
          "failed": 950000,
          "retry": 450000
        },
        "Week 5": {
          "total": 15200000,
          "delivered": 14200000,
          "failed": 700000,
          "retry": 300000
        }
      },
      title: 'Extended Monthly View',
      description: '5-week comprehensive monthly analysis'
    },
    'Previous Month': {
      data: {
        "lastUpdated": "2023-12-31 23:59:59",
        "Week 1": {
          "total": 16500000,
          "delivered": 15200000,
          "failed": 900000,
          "retry": 400000
        },
        "Week 2": {
          "total": 19200000,
          "delivered": 17800000,
          "failed": 950000,
          "retry": 450000
        },
        "Week 3": {
          "total": 17800000,
          "delivered": 16500000,
          "failed": 850000,
          "retry": 450000
        },
        "Week 4": {
          "total": 21500000,
          "delivered": 20100000,
          "failed": 950000,
          "retry": 450000
        }
      },
      title: 'Previous Month Comparison',
      description: 'Historical monthly data for comparison'
    }
  };

  const getCurrentData = () => {
    return monthViewData[viewMode]?.data || null;
  };

  const getCurrentTitle = () => {
    return monthViewData[viewMode]?.title || 'Monthly View';
  };

  const getCurrentDescription = () => {
    return monthViewData[viewMode]?.description || '';
  };

  const monthlyInsights = [
    { label: 'Peak Week', value: 'Week 4', trend: '+12%' },
    { label: 'Success Rate', value: '92.3%', trend: '+0.8%' },
    { label: 'Total Volume', value: '83.0M', trend: '+5.2%' },
    { label: 'Avg Daily', value: '2.7M', trend: '+3.1%' }
  ];

  return (
    <div className="w-full">
      {showHeader && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{getCurrentTitle()}</h2>
              <p className="text-gray-600">{getCurrentDescription()}</p>
            </div>
            
            {showControls && (
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {Object.keys(monthViewData).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        viewMode === mode
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                >
                  {showAnalytics ? 'Hide' : 'Show'} Analytics
                </button>
              </div>
            )}
          </div>

          {/* Monthly Analytics */}
          {showAnalytics && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {monthlyInsights.map((insight, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">{insight.label}</div>
                  <div className="text-xl font-bold text-gray-900">{insight.value}</div>
                  <div className={`text-sm font-medium ${
                    insight.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {insight.trend} vs last period
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Chart Component */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
          <OverallSMSVolume
            data={getCurrentData()}
            width={width}
            height={height}
            showLegend={true}
            showGrid={true}
            animated={true}
            theme={theme}
          />
        </div>
        
        {/* Chart Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            Current View: <span className="font-medium text-gray-700">{viewMode}</span>
          </div>
          <div>
            Data Source: <span className="font-medium text-gray-700">
              {getCurrentData() ? 'Custom Data' : 'Built-in Monthly Data'}
            </span>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">This Month View Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-blue-600 font-semibold mb-2">📅 Weekly Breakdown</div>
            <div className="text-sm text-gray-600">
              View data organized by weeks for better monthly analysis
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-green-600 font-semibold mb-2">📊 Volume Trends</div>
            <div className="text-sm text-gray-600">
              Track monthly volume patterns and growth trends
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-purple-600 font-semibold mb-2">🎯 Success Metrics</div>
            <div className="text-sm text-gray-600">
              Monitor delivery rates and failure patterns monthly
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThisMonthView;
