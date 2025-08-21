import React from 'react';
import SimpleSMSChart from './SimpleSMSChart';

const ChartExample = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Dashboard Analytics
        </h1>
        
        {/* Your SMS Volume Chart */}
        <SimpleSMSChart />
        
        {/* Additional content can go here */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Chart Features:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✅ X-axis and Y-axis touching each other</li>
            <li>✅ Blue gradient line (#00B6F1 to #1E5BE0)</li>
            <li>✅ Green gradient line (#318E33 to #8AF5A8)</li>
            <li>✅ Pink solid line (#FF4E98)</li>
            <li>✅ Hollow dots with hover effects</li>
            <li>✅ Hover expansion to 12.236px × 10.406px</li>
            <li>✅ Your exact SVG paths implemented</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChartExample;
