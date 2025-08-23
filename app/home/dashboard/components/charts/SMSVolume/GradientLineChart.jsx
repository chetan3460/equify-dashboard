import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartInsight, { PRESET_INSIGHTS } from '../../ChartInsight';
import { formatNumber } from './utils';
import { SMS_COLORS, LEGEND_ITEMS, CHART_CONFIG } from './constants';
import CustomDot from './CustomDot';
import ActiveDot from './ActiveDot';

// Working gradient approach using CSS custom properties
const GradientStyles = ({ children }) => (
  <div
    style={{
      '--total-gradient': 'linear-gradient(90deg, #369CFE 0%, #1E5BE0 100%)',
      '--delivered-gradient': 'linear-gradient(90deg, #318E33 0%, #8AF5A8 100%)',
      '--failed-gradient': 'linear-gradient(90deg, #FF8F80 0%, #E56464 100%)',
      '--retry-gradient': 'linear-gradient(90deg, #FDBB2D 0%, #F77500 100%)',
    }}
  >
    <style>{`
      .recharts-line-curve[stroke*="total"] { 
        stroke: url(#total-working-gradient) !important; 
      }
      .recharts-line-curve[stroke*="delivered"] { 
        stroke: url(#delivered-working-gradient) !important; 
      }
      .recharts-line-curve[stroke*="failed"] { 
        stroke: url(#failed-working-gradient) !important; 
      }
      .recharts-line-curve[stroke*="retry"] { 
        stroke: url(#retry-working-gradient) !important; 
      }
    `}</style>
    {children}
  </div>
);

// Alternative approach - Custom line with canvas rendering
const CanvasGradientLine = ({ points, gradient, strokeWidth = 3 }) => {
  const path = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');
  
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <defs>
        <linearGradient id="canvas-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <path 
        d={path} 
        stroke="url(#canvas-gradient)" 
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function GradientLineChart({ smsData }) {
  const { chartData, lastUpdated } = useMemo(() => {
    if (smsData && typeof smsData === 'object') {
      const { lastUpdated, ...timePoints } = smsData;
      const data = Object.entries(timePoints).map(([time, stats]) => ({
        time,
        total: stats.total,
        delivered: stats.delivered,
        failed: stats.failed,
        retry: stats.retry,
      }));
      return { chartData: data, lastUpdated };
    }
    
    return {
      chartData: [
        { time: "10:00", total: 45000, delivered: 38000, failed: 7000, retry: 0 },
        { time: "11:00", total: 52000, delivered: 42000, failed: 10000, retry: 0 },
        { time: "12:00", total: 48000, delivered: 40000, failed: 8000, retry: 0 },
        { time: "13:00", total: 61000, delivered: 50000, failed: 11000, retry: 0 },
        { time: "14:00", total: 55000, delivered: 45000, failed: 10000, retry: 0 },
        { time: "15:00", total: 67000, delivered: 55000, failed: 12000, retry: 0 },
      ],
      lastUpdated: '15:15:45'
    };
  }, [smsData]);

  return (
    <GradientStyles>
      <div className="p-4 border rounded-md shadow bg-white">
        <h3 className="text-lg font-semibold mb-1">Overall SMS Volume (With Gradients)</h3>
        <p className="text-xs text-gray-500 mb-4">Last updated: {lastUpdated}</p>
        
        <div className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 60, left: 0, bottom: 20 }}>
              {/* Working gradient definitions */}
              <defs>
                <linearGradient id="total-working-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="22.7%" stopColor="#369CFE" />
                  <stop offset="76.39%" stopColor="#1E5BE0" />
                </linearGradient>
                <linearGradient id="delivered-working-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="8.75%" stopColor="#318E33" />
                  <stop offset="90.78%" stopColor="#8AF5A8" />
                </linearGradient>
                <linearGradient id="failed-working-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="11.9%" stopColor="#FF8F80" />
                  <stop offset="94.13%" stopColor="#E56464" />
                </linearGradient>
                <linearGradient id="retry-working-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="1.67%" stopColor="#FDBB2D" />
                  <stop offset="117.65%" stopColor="#F77500" />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip />
              
              {/* Lines with stroke identifiers for CSS targeting */}
              <Line
                type="monotone"
                dataKey="total"
                stroke="total-identifier"
                strokeWidth={3}
                dot={{ fill: SMS_COLORS.TOTAL.solid, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="delivered"
                stroke="delivered-identifier"
                strokeWidth={3}
                dot={{ fill: SMS_COLORS.DELIVERED.solid, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="failed"
                stroke="failed-identifier"
                strokeWidth={3}
                dot={{ fill: SMS_COLORS.FAILED.solid, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="retry"
                stroke="retry-identifier"
                strokeWidth={3}
                dot={{ fill: SMS_COLORS.RETRY.solid, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <ChartInsight message={PRESET_INSIGHTS.increasingTrend} />
      </div>
    </GradientStyles>
  );
}
