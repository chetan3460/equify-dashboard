"use client";
import React from 'react';

export default function TestGradient() {
  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <h3 className="text-lg font-semibold mb-4">SVG Gradient Test</h3>
      
      {/* Simple SVG with gradient */}
      <svg width="400" height="100" className="border">
        <defs>
          <linearGradient id="test-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#369CFE" />
            <stop offset="100%" stopColor="#1E5BE0" />
          </linearGradient>
        </defs>
        <line 
          x1="10" 
          y1="30" 
          x2="390" 
          y2="30" 
          stroke="url(#test-gradient-1)" 
          strokeWidth="5"
        />
        <text x="10" y="20" fontSize="12">SVG Gradient Line (should be blue gradient)</text>
      </svg>

      {/* CSS Gradient for comparison */}
      <div className="mt-4">
        <div 
          className="h-1 w-96"
          style={{ background: 'linear-gradient(90deg, #369CFE 0%, #1E5BE0 100%)' }}
        />
        <p className="text-sm mt-1">CSS Gradient (should be blue gradient)</p>
      </div>

      {/* Recharts simple line with gradient */}
      <div className="mt-4">
        <svg width="400" height="100">
          <defs>
            <linearGradient id="recharts-test-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#369CFE" />
              <stop offset="100%" stopColor="#1E5BE0" />
            </linearGradient>
          </defs>
          <path 
            d="M 10 50 L 100 30 L 200 60 L 300 20 L 390 40"
            stroke="url(#recharts-test-gradient)" 
            strokeWidth="3"
            fill="none"
          />
        </svg>
        <p className="text-sm">Manual SVG Path with Gradient</p>
      </div>
    </div>
  );
}
