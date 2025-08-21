import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SMS_COLORS, DOT_SIZES, CHART_CONFIG } from './constants';

/**
 * SMS Chart Styling Guide Component
 * 
 * Comprehensive documentation and guide for understanding and customizing
 * the SMS Volume Chart. Includes code examples, color references, and
 * troubleshooting information.
 */
const StylingGuide = () => {
  return (
    <Card className="bg-card border-2 border-dashed border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">
          📖 SMS Chart Styling Guide
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Complete guide to understand and customize the SMS Volume Chart
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* 1. DATA STRUCTURE */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-green-600 dark:text-green-400">
            1. 📊 Data Structure (How Data Works)
          </h3>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
            <pre>{`// YOUR PROVIDED DATA
const smsData = {
  "lastUpdated": "15:15:45",
  "12:00": {
    "total": 155130,     // Blue line
    "delivered": 77434,  // Green line
    "failed": 22575,     // Pink line
    "retry": 55121
  }
};

// TRANSFORMED FOR CHART
const chartData = [
  {
    time: "12:00",
    total: 155130,    // ← This becomes Blue line point
    delivered: 77434, // ← This becomes Green line point
    failed: 22575     // ← This becomes Pink line point
  }
];`}</pre>
          </div>
        </div>

        {/* 2. COLOR SYSTEM */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">
            2. 🎨 Color System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Blue Color */}
            <div className="border rounded-lg p-4">
              <div className="w-full h-8 rounded" style={{ backgroundColor: SMS_COLORS.TOTAL }}></div>
              <div className="mt-2">
                <p className="font-bold text-sm">{SMS_COLORS.TOTAL} - Total SMS</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  • Line: stroke="{SMS_COLORS.TOTAL}"<br/>
                  • Dot: stroke="{SMS_COLORS.TOTAL}"<br/>
                  • Usage: Main metric line
                </p>
              </div>
            </div>

            {/* Green Color */}
            <div className="border rounded-lg p-4">
              <div className="w-full h-8 rounded" style={{ backgroundColor: SMS_COLORS.DELIVERED }}></div>
              <div className="mt-2">
                <p className="font-bold text-sm">{SMS_COLORS.DELIVERED} - Delivered</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  • Line: stroke="{SMS_COLORS.DELIVERED}"<br/>
                  • Dot: stroke="{SMS_COLORS.DELIVERED}"<br/>
                  • Usage: Success metric
                </p>
              </div>
            </div>

            {/* Pink Color */}
            <div className="border rounded-lg p-4">
              <div className="w-full h-8 rounded" style={{ backgroundColor: SMS_COLORS.FAILED }}></div>
              <div className="mt-2">
                <p className="font-bold text-sm">{SMS_COLORS.FAILED} - Failed</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  • Line: stroke="{SMS_COLORS.FAILED}"<br/>
                  • Dot: stroke="{SMS_COLORS.FAILED}"<br/>
                  • Usage: Error metric
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. COMPONENT BREAKDOWN */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-purple-600 dark:text-purple-400">
            3. 🧩 Component Structure
          </h3>
          <div className="space-y-4">
            
            {/* File Structure */}
            <div className="border-l-4 border-purple-400 pl-4">
              <h4 className="font-semibold mb-2">📁 File Structure</h4>
              <div className="bg-black text-cyan-400 p-3 rounded font-mono text-xs overflow-x-auto">
                <pre>{`components/sms-volume-chart/
├── SMSVolumeChart.jsx    // Main chart component
├── CustomTooltip.jsx     // Hover data display
├── CustomDot.jsx         // Hollow dots with hover
├── StylingGuide.jsx      // This guide component
├── constants.js          // Colors & configuration
└── utils.js              // Helper functions`}</pre>
              </div>
            </div>

            {/* Component Imports */}
            <div className="border-l-4 border-green-400 pl-4">
              <h4 className="font-semibold mb-2">📦 How to Import</h4>
              <div className="bg-black text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                <pre>{`// In your page.jsx
import SMSVolumeChart from './components/sms-volume-chart/SMSVolumeChart';
import { StylingGuide } from './components/sms-volume-chart/StylingGuide';

// Usage
<SMSVolumeChart smsData={yourData} height={400} />
<StylingGuide />`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* 4. HOVER SPECIFICATIONS */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-orange-600 dark:text-orange-400">
            4. 🖱️ Hover Specifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Normal State */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">⚫ Normal State</h4>
              <div className="bg-black text-yellow-400 p-3 rounded font-mono text-xs">
                <pre>{`Radius: ${DOT_SIZES.NORMAL}px
Diameter: ${DOT_SIZES.NORMAL * 2}px
Fill: white (hollow)
Stroke: line color
StrokeWidth: 2px`}</pre>
              </div>
            </div>

            {/* Hover State */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">🔵 Hover State</h4>
              <div className="bg-black text-yellow-400 p-3 rounded font-mono text-xs">
                <pre>{`Width: ${DOT_SIZES.HOVER * 2}px (exact spec)
Height: ${DOT_SIZES.HOVER_HEIGHT}px (exact spec)
Radius: ${DOT_SIZES.HOVER}px
Animation: smooth 0.2s ease
Effects: scale + drop-shadow`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* 5. CUSTOMIZATION GUIDE */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border">
          <h3 className="text-lg font-bold mb-3 text-pink-600 dark:text-pink-400">
            5. 🛠️ How to Customize
          </h3>
          
          <div className="space-y-4">
            {/* Change Colors */}
            <div>
              <h4 className="font-semibold mb-2 text-sm flex items-center">
                <span className="w-4 h-4 bg-red-500 rounded mr-2"></span>
                Change Line Colors
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Edit constants.js file:
              </p>
              <div className="bg-black text-red-400 p-2 rounded font-mono text-xs">
                <code>{`export const SMS_COLORS = {
  TOTAL: '#FF0000',      // New red color
  DELIVERED: '#00FF00',  // New green color  
  FAILED: '#0000FF',     // New blue color
};`}</code>
              </div>
            </div>

            {/* Add New Line */}
            <div>
              <h4 className="font-semibold mb-2 text-sm flex items-center">
                <span className="w-4 h-4 bg-yellow-500 rounded mr-2"></span>
                Add New Data Line (e.g., Retry)
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                1. Add to constants.js: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">RETRY: '#9333EA'</code><br/>
                2. Add Line component in SMSVolumeChart.jsx
              </p>
              <div className="bg-black text-yellow-400 p-2 rounded font-mono text-xs">
                <code>{`<Line 
  dataKey="retry" 
  stroke={SMS_COLORS.RETRY}
  name="Retry"
  dot={<CustomDot />}
/>`}</code>
              </div>
            </div>

            {/* Modify Hover Size */}
            <div>
              <h4 className="font-semibold mb-2 text-sm flex items-center">
                <span className="w-4 h-4 bg-green-500 rounded mr-2"></span>
                Change Hover Size
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Edit DOT_SIZES in constants.js:
              </p>
              <div className="bg-black text-green-400 p-2 rounded font-mono text-xs">
                <code>{`export const DOT_SIZES = {
  NORMAL: 5,      // Bigger normal size
  HOVER: 8,       // Bigger hover size
  HOVER_HEIGHT: 14, // Bigger hover height
};`}</code>
              </div>
            </div>
          </div>
        </div>

        {/* 6. TROUBLESHOOTING */}
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <h3 className="text-lg font-bold mb-3 text-red-600 dark:text-red-400">
            6. 🔧 Troubleshooting
          </h3>
          
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-sm">❌ Tooltip not showing?</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check if CustomTooltip is imported: <code>import {'{CustomTooltip}'} from './CustomTooltip'</code>
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-sm">❌ Dots not hollow?</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ensure fill="white" in CustomDot component
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-sm">❌ Hover not working?</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check onMouseEnter/onMouseLeave handlers in CustomDot.jsx
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-sm">❌ Colors not showing?</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Verify SMS_COLORS import in SMSVolumeChart.jsx
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm">❌ Chart not responsive?</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ensure ResponsiveContainer wraps the LineChart component
              </p>
            </div>
          </div>
        </div>

        {/* 7. USAGE EXAMPLES */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">
            7. 📝 Usage Examples
          </h3>
          
          <div className="space-y-4">
            <div className="bg-black text-blue-400 p-3 rounded font-mono text-xs overflow-x-auto">
              <pre>{`// Basic Usage
<SMSVolumeChart smsData={yourSMSData} />

// Custom Height
<SMSVolumeChart smsData={yourSMSData} height={500} />

// With Error Handling
{smsData ? (
  <SMSVolumeChart smsData={smsData} />
) : (
  <div>Loading chart data...</div>
)}`}</pre>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default StylingGuide;
