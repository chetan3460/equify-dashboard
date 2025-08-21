"use client";
import React, { useState } from 'react';
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, theme, mode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="p-3 border rounded-lg shadow-lg backdrop-blur-sm"
        style={{
          backgroundColor: `hsl(${
            theme?.cssVars[mode === "dark" ? "dark" : "light"].card
          })`,
          borderColor: `hsl(${
            theme?.cssVars[mode === "dark" ? "dark" : "light"].border
          })`,
          color: `hsl(${
            theme?.cssVars[mode === "dark" ? "dark" : "light"][
              "card-foreground"
            ]
          })`,
        }}
      >
        <p className="font-medium mb-2">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Format Y-axis values (convert to K, M format)
const formatYAxisValue = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 0)}K`;
  }
  return value.toString();
};

const SMSVolumeChart = ({ height = 400 }) => {
  const { theme: config } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SMS Volume data (your provided data)
  const rawData = {
    lastUpdated: "15:15:45",
  };

  // Your exact SVG path data with colors as specified
  const chartData = [
    {
      color: '#00B6F1',
      name: 'SMS Sent',
      gradient: 'url(#blueGradient)',
      // Your exact blue SVG path
      path: 'M0.6875 38.7819C27.1074 43.4583 88.4531 51.0964 122.477 44.2377C165.006 35.6643 219.135 17.2185 237.822 10.4637C256.509 3.70891 277.774 -5.64388 313.215 6.5667C348.657 18.7773 364.766 30.7281 377.01 31.7673',
      points: [[0.6875,38.7819], [88.4531,51.0964], [122.477,44.2377], [219.135,17.2185], [237.822,10.4637], [313.215,6.5667], [377.01,31.7673]]
    },
    {
      color: '#318E33', 
      name: 'SMS Delivered',
      gradient: 'url(#greenGradient)',
      // Your exact green SVG path
      path: 'M0.6875 30.8999C13.7499 33.7261 20.9005 34.7668 35.5999 34.7668C50.2992 34.7668 87.2197 29.1851 109.677 26.505C132.134 23.8249 162.9 21.7583 186.65 18.116C210.4 14.4736 235.575 7.51614 263.125 2.15147C290.675 -3.2132 318.031 16.9534 338.844 21.1472C359.657 25.3409 376.609 23.917 376.609 23.917',
      points: [[0.6875,30.8999], [35.5999,34.7668], [109.677,26.505], [186.65,18.116], [263.125,2.15147], [338.844,21.1472], [376.609,23.917]]
    },
    {
      color: '#FF4E98',
      name: 'SMS Failed',
      gradient: '#FF4E98', 
      // Your exact pink SVG path
      path: 'M0.6875 23.3936C13.3553 28.1977 20.5605 31.2118 35.7716 35.5663C50.9827 39.9208 79.7593 39.9781 109.692 38.2466C139.625 36.5151 168.125 26.5178 186.281 23.5086C204.438 20.4995 240.988 15.1391 263.137 11.4538C285.287 7.76849 317.31 -1.27288 339.193 2.07483C361.075 5.42255 376.82 25.1849 376.82 25.1849',
      points: [[0.6875,23.3936], [35.7716,35.5663], [109.692,38.2466], [186.281,23.5086], [263.137,11.4538], [339.193,2.07483], [376.82,25.1849]]
    }
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            Overall SMS volume
          </h3>
          <p className="text-sm text-muted-foreground">
            Last updated ({rawData.lastUpdated})
          </p>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              fill="currentColor"
            />
            <path
              d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
              fill="currentColor"
            />
            <path
              d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 mb-6">
        {chartData.map((line, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: line.color }}
            ></div>
            <span className="text-sm text-muted-foreground">{line.name}</span>
          </div>
        ))}
      </div>

      {/* Custom SVG Chart */}
      <div className="relative">
        <svg width="100%" height={height} viewBox="0 0 450 320" className="bg-white dark:bg-card rounded-lg">
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
            <line key={`h-${i}`} x1="50" y1={50 + i * 40} x2="420" y2={50 + i * 40} stroke={mode === 'dark' ? '#374151' : '#f0f0f0'} strokeWidth="1" />
          ))}
          {[0,1,2,3,4,5,6,7].map(i => (
            <line key={`v-${i}`} x1={50 + i * 52} y1="50" x2={50 + i * 52} y2="250" stroke={mode === 'dark' ? '#374151' : '#f0f0f0'} strokeWidth="1" />
          ))}

          {/* X-axis and Y-axis - touching each other exactly */}
          <line x1="50" y1="250" x2="420" y2="250" stroke={mode === 'dark' ? '#fff' : '#333'} strokeWidth="2" />
          <line x1="50" y1="50" x2="50" y2="250" stroke={mode === 'dark' ? '#fff' : '#333'} strokeWidth="2" />

          {/* Your exact SVG paths */}
          {chartData.map((line, lineIndex) => (
            <g key={lineIndex}>
              {/* Line path with proper scaling and positioning */}
              <path 
                d={line.path} 
                fill="none" 
                stroke={line.gradient} 
                strokeWidth="0.95"
                transform={`translate(50, ${lineIndex === 0 ? 140 : lineIndex === 1 ? 160 : 180}) scale(1, 1.8)`}
              />
              
              {/* Hollow dots at data points */}
              {line.points.map((point, pointIndex) => {
                const isHovered = hoveredPoint?.line === lineIndex && hoveredPoint?.point === pointIndex;
                return (
                  <circle
                    key={pointIndex}
                    cx={50 + point[0]}
                    cy={lineIndex === 0 ? 140 + point[1] * 1.8 : lineIndex === 1 ? 160 + point[1] * 1.2 : 180 + point[1] * 0.8}
                    r={isHovered ? 6.118 : 4} // 12.236px width = 6.118px radius for hover
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
            <text key={i} x={50 + i * 52} y="270" textAnchor="middle" fontSize="12" fill={mode === 'dark' ? '#9CA3AF' : '#666'}>
              {month}
            </text>
          ))}
          {['0','20K','40K','60K','80K','100K'].map((val, i) => (
            <text key={i} x="40" y={250 - i * 40 + 5} textAnchor="end" fontSize="12" fill={mode === 'dark' ? '#9CA3AF' : '#666'}>
              {val}
            </text>
          ))}
          
          {/* Chart title */}
          <text x="235" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill={mode === 'dark' ? '#fff' : '#333'}>
            SMS Volume Over Time
          </text>
        </svg>
      </div>

      {/* Peak Traffic Note */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Peak traffic at 5 pm as expected
        </p>
      </div>
    </div>
  );
};

export default SMSVolumeChart;
