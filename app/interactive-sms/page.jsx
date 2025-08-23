"use client";
import InteractiveSMSVolume from '../../InteractiveSMSVolume';

const InteractiveSMSPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive SMS Volume Component</h1>
          <p className="text-gray-600 text-lg">Full-featured component with built-in testing controls and period switching</p>
        </div>

        <div className="space-y-12">
          {/* Full Interactive Component */}
          <InteractiveSMSVolume 
            title="Interactive SMS Volume Testing"
            subtitle="Complete testing interface with external and internal controls"
            showTestControls={true}
            showDebugToggle={true}
            defaultPeriod="Today"
          />

          {/* Minimal Version */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Minimal Interactive Version</h2>
            <p className="text-gray-600 mb-6">Same component without test controls - just the chart with dropdown functionality</p>
            
            <InteractiveSMSVolume 
              title="SMS Volume Chart"
              subtitle="Clean interface with dropdown controls"
              showTestControls={false}
              showDebugToggle={false}
              defaultPeriod="This Month"
            />
          </div>

          {/* Custom Configuration */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Custom Configuration Example</h2>
            <p className="text-gray-600 mb-6">Starting with 'This Month' view and custom title/subtitle</p>
            
            <InteractiveSMSVolume 
              title="Monthly SMS Analytics"
              subtitle="Comprehensive monthly traffic analysis and testing"
              showTestControls={true}
              showDebugToggle={true}
              defaultPeriod="This Month"
            />
          </div>
        </div>

        {/* Usage Information */}
        <div className="bg-blue-50 rounded-lg p-6 mt-12">
          <h3 className="text-xl font-semibold mb-4 text-blue-900">Component Usage</h3>
          <div className="text-blue-800 text-sm space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Basic Usage:</h4>
              <pre className="bg-blue-100 p-3 rounded text-xs overflow-x-auto">
{`import InteractiveSMSVolume from './InteractiveSMSVolume';

<InteractiveSMSVolume 
  title="SMS Volume Testing"
  subtitle="Test different periods"
  showTestControls={true}
  showDebugToggle={true}
  defaultPeriod="Today"
/>`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Props:</h4>
              <ul className="space-y-1 text-xs">
                <li>• <strong>title</strong>: Main title for the testing interface</li>
                <li>• <strong>subtitle</strong>: Subtitle description text</li>
                <li>• <strong>showTestControls</strong>: Show/hide external test controls</li>
                <li>• <strong>showDebugToggle</strong>: Show/hide debug information toggle</li>
                <li>• <strong>defaultPeriod</strong>: Starting period ('Today', 'This Week', 'This Month', etc.)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Features:</h4>
              <ul className="space-y-1 text-xs">
                <li>• External period switching with test data</li>
                <li>• Internal component dropdown (Today/This Week/This Month)</li>
                <li>• Gradient legend colors matching your design</li>
                <li>• Debug information panel</li>
                <li>• Status indicators and instructions</li>
                <li>• Configurable test controls</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSMSPage;
