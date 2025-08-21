import React, { useState } from 'react';

interface DataPoint {
  x: number;
  y: number;
}

interface LineData {
  color: string;
  gradient: string;
  path: string;
  points: DataPoint[];
}

const SMSVolumeChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<{ lineIndex: number; pointIndex: number } | null>(null);

  // Chart dimensions
  const chartWidth = 400;
  const chartHeight = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const innerWidth = chartWidth - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;

  // Sample data points for the three lines
  const linesData: LineData[] = [
    {
      color: '#00B6F1',
      gradient: 'url(#blueGradient)',
      path: 'M0 150 C50 120, 100 80, 150 60 C200 40, 250 30, 300 70 C320 85, 340 100, 360 105',
      points: [
        { x: 0, y: 150 },
        { x: 60, y: 120 },
        { x: 120, y: 80 },
        { x: 180, y: 60 },
        { x: 240, y: 40 },
        { x: 300, y: 70 },
        { x: 360, y: 105 }
      ]
    },
    {
      color: '#318E33',
      gradient: 'url(#greenGradient)',
      path: 'M0 180 C50 170, 100 160, 150 140 C200 120, 250 100, 300 90 C320 85, 340 80, 360 85',
      points: [
        { x: 0, y: 180 },
        { x: 60, y: 170 },
        { x: 120, y: 160 },
        { x: 180, y: 140 },
        { x: 240, y: 120 },
        { x: 300, y: 90 },
        { x: 360, y: 85 }
      ]
    },
    {
      color: '#FF4E98',
      gradient: '#FF4E98',
      path: 'M0 200 C50 190, 100 180, 150 170 C200 160, 250 150, 300 140 C320 135, 340 130, 360 125',
      points: [
        { x: 0, y: 200 },
        { x: 60, y: 190 },
        { x: 120, y: 180 },
        { x: 180, y: 170 },
        { x: 240, y: 160 },
        { x: 300, y: 140 },
        { x: 360, y: 125 }
      ]
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">SMS Volume Chart</h2>
      
      <svg width={chartWidth} height={chartHeight} className="border border-gray-200 rounded-lg">
        {/* Gradients Definition */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#369CFE" />
            <stop offset="100%" stopColor="#1E5BE0" />
          </linearGradient>
          
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#318E33" />
            <stop offset="100%" stopColor="#8AF5A8" />
          </linearGradient>
        </defs>

        {/* Chart Background */}
        <rect 
          x={margin.left} 
          y={margin.top} 
          width={innerWidth} 
          height={innerHeight} 
          fill="white" 
          stroke="none"
        />

        {/* Grid Lines */}
        {/* Horizontal grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={`h-grid-${i}`}
            x1={margin.left}
            y1={margin.top + (innerHeight * i) / 4}
            x2={margin.left + innerWidth}
            y2={margin.top + (innerHeight * i) / 4}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        ))}
        
        {/* Vertical grid lines */}
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <line
            key={`v-grid-${i}`}
            x1={margin.left + (innerWidth * i) / 6}
            y1={margin.top}
            x2={margin.left + (innerWidth * i) / 6}
            y2={margin.top + innerHeight}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        ))}

        {/* X-Axis - touching Y-axis */}
        <line
          x1={margin.left}
          y1={margin.top + innerHeight}
          x2={margin.left + innerWidth}
          y2={margin.top + innerHeight}
          stroke="#333"
          strokeWidth="2"
        />

        {/* Y-Axis - touching X-axis */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={margin.top + innerHeight}
          stroke="#333"
          strokeWidth="2"
        />

        {/* X-Axis Labels */}
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((label, i) => (
          <text
            key={`x-label-${i}`}
            x={margin.left + (innerWidth * i) / 5}
            y={margin.top + innerHeight + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
          >
            {label}
          </text>
        ))}

        {/* Y-Axis Labels */}
        {['0', '25K', '50K', '75K', '100K'].map((label, i) => (
          <text
            key={`y-label-${i}`}
            x={margin.left - 15}
            y={margin.top + innerHeight - (innerHeight * i) / 4 + 4}
            textAnchor="end"
            fontSize="12"
            fill="#666"
          >
            {label}
          </text>
        ))}

        {/* Data Lines */}
        {linesData.map((line, lineIndex) => (
          <g key={`line-${lineIndex}`}>
            {/* Line Path */}
            <path
              d={line.path}
              fill="none"
              stroke={line.gradient}
              strokeWidth="2"
              transform={`translate(${margin.left}, ${margin.top})`}
            />

            {/* Data Points */}
            {line.points.map((point, pointIndex) => (
              <circle
                key={`point-${lineIndex}-${pointIndex}`}
                cx={margin.left + point.x}
                cy={margin.top + point.y}
                r={hoveredPoint?.lineIndex === lineIndex && hoveredPoint?.pointIndex === pointIndex ? 6 : 4}
                fill="white"
                stroke={line.color}
                strokeWidth="2"
                style={{
                  cursor: 'pointer',
                  transition: 'r 0.2s ease',
                  width: hoveredPoint?.lineIndex === lineIndex && hoveredPoint?.pointIndex === pointIndex ? '12.236px' : '8px',
                  height: hoveredPoint?.lineIndex === lineIndex && hoveredPoint?.pointIndex === pointIndex ? '10.406px' : '8px'
                }}
                onMouseEnter={() => setHoveredPoint({ lineIndex, pointIndex })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
          </g>
        ))}

        {/* Chart Title */}
        <text
          x={chartWidth / 2}
          y={15}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#333"
        >
          SMS Volume Over Time
        </text>
      </svg>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-0.5 bg-blue-500 mr-2"></div>
          <span className="text-sm text-gray-600">SMS Sent</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-0.5 bg-green-500 mr-2"></div>
          <span className="text-sm text-gray-600">SMS Delivered</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-0.5 bg-pink-500 mr-2"></div>
          <span className="text-sm text-gray-600">SMS Failed</span>
        </div>
      </div>

      {/* Hover Information */}
      {hoveredPoint && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-sm text-center">
          Point {hoveredPoint.pointIndex + 1} on Line {hoveredPoint.lineIndex + 1}
        </div>
      )}
    </div>
  );
};

export default SMSVolumeChart;
