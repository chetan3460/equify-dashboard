import React, { useState } from 'react';

const SimpleSMSChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const chartData = [
    {
      color: '#00B6F1',
      gradient: 'url(#blueGradient)',
      // Your exact blue SVG path
      path: 'M0.6875 38.7819C27.1074 43.4583 88.4531 51.0964 122.477 44.2377C165.006 35.6643 219.135 17.2185 237.822 10.4637C256.509 3.70891 277.774 -5.64388 313.215 6.5667C348.657 18.7773 364.766 30.7281 377.01 31.7673',
      points: [[0.6875,38.7819], [88.4531,51.0964], [122.477,44.2377], [219.135,17.2185], [237.822,10.4637], [313.215,6.5667], [377.01,31.7673]]
    },
    {
      color: '#318E33', 
      gradient: 'url(#greenGradient)',
      // Your exact green SVG path
      path: 'M0.6875 30.8999C13.7499 33.7261 20.9005 34.7668 35.5999 34.7668C50.2992 34.7668 87.2197 29.1851 109.677 26.505C132.134 23.8249 162.9 21.7583 186.65 18.116C210.4 14.4736 235.575 7.51614 263.125 2.15147C290.675 -3.2132 318.031 16.9534 338.844 21.1472C359.657 25.3409 376.609 23.917 376.609 23.917',
      points: [[0.6875,30.8999], [35.5999,34.7668], [109.677,26.505], [186.65,18.116], [263.125,2.15147], [338.844,21.1472], [376.609,23.917]]
    },
    {
      color: '#FF4E98',
      gradient: '#FF4E98', 
      // Your exact pink SVG path
      path: 'M0.6875 23.3936C13.3553 28.1977 20.5605 31.2118 35.7716 35.5663C50.9827 39.9208 79.7593 39.9781 109.692 38.2466C139.625 36.5151 168.125 26.5178 186.281 23.5086C204.438 20.4995 240.988 15.1391 263.137 11.4538C285.287 7.76849 317.31 -1.27288 339.193 2.07483C361.075 5.42255 376.82 25.1849 376.82 25.1849',
      points: [[0.6875,23.3936], [35.7716,35.5663], [109.692,38.2466], [186.281,23.5086], [263.137,11.4538], [339.193,2.07483], [376.82,25.1849]]
    }
  ];

  return (
    <div className="p-6 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">SMS Volume Chart</h2>
      
      <svg width="450" height="320" className="border" viewBox="0 0 450 320">
        <defs>
          {/* Blue gradient as per your specification */}
          <linearGradient id="blueGradient" x1="345.505" y1="12.2188" x2="344.936" y2="41.0732" gradientUnits="userSpaceOnUse">
            <stop stopColor="#369CFE"/>
            <stop offset="1" stopColor="#1E5BE0"/>
          </linearGradient>
          
          {/* Green gradient as per your specification */}
          <linearGradient id="greenGradient" x1="40.7399" y1="32.672" x2="48.1176" y2="-30.1619" gradientUnits="userSpaceOnUse">
            <stop stopColor="#318E33"/>
            <stop offset="1" stopColor="#8AF5A8"/>
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0,1,2,3,4,5].map(i => (
          <line key={`h-${i}`} x1="50" y1={50 + i * 40} x2="420" y2={50 + i * 40} stroke="#f0f0f0" strokeWidth="1" />
        ))}
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={`v-${i}`} x1={50 + i * 52} y1="50" x2={50 + i * 52} y2="250" stroke="#f0f0f0" strokeWidth="1" />
        ))}

        {/* X-axis and Y-axis - touching each other exactly */}
        <line x1="50" y1="250" x2="420" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="250" stroke="#333" strokeWidth="2" />

        {/* Your exact SVG paths */}
        {chartData.map((line, lineIndex) => (
          <g key={lineIndex}>
            {/* Line path with proper scaling and positioning */}
            <path 
              d={line.path} 
              fill="none" 
              stroke={line.gradient} 
              strokeWidth="0.95"
              transform={`translate(50, ${lineIndex === 0 ? 150 : lineIndex === 1 ? 170 : 200}) scale(1, 1.5)`}
            />
            
            {/* Hollow dots at data points */}
            {line.points.map((point, pointIndex) => {
              const isHovered = hoveredPoint?.line === lineIndex && hoveredPoint?.point === pointIndex;
              return (
                <circle
                  key={pointIndex}
                  cx={50 + point[0]}
                  cy={lineIndex === 0 ? 150 + point[1] * 1.5 : lineIndex === 1 ? 170 + point[1] * 1.2 : 200 + point[1] * 0.8}
                  r={isHovered ? 6.118 : 4} // 12.236px width = 6.118px radius
                  fill="white"
                  stroke={line.color}
                  strokeWidth="2"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                    transformOrigin: 'center'
                  }}
                  onMouseEnter={() => setHoveredPoint({line: lineIndex, point: pointIndex})}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              );
            })}
          </g>
        ))}

        {/* Axis labels */}
        {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'].map((month, i) => (
          <text key={i} x={50 + i * 52} y="270" textAnchor="middle" fontSize="12" fill="#666">
            {month}
          </text>
        ))}
        {['0','20K','40K','60K','80K','100K'].map((val, i) => (
          <text key={i} x="40" y={250 - i * 40 + 5} textAnchor="end" fontSize="12" fill="#666">
            {val}
          </text>
        ))}
        
        {/* Chart title */}
        <text x="235" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#333">
          SMS Volume Over Time
        </text>
      </svg>

      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-4 h-1 bg-blue-500 mr-2"></div>
          <span className="text-sm">Blue Line</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-1 bg-green-500 mr-2"></div>
          <span className="text-sm">Green Line</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-1 bg-pink-500 mr-2"></div>
          <span className="text-sm">Pink Line</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleSMSChart;
