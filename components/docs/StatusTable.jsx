"use client";
import React from "react";

export default function StatusTable({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="overflow-auto border rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-default-50">
          <tr>
            <th className="text-left p-2">Card</th>
            <th className="text-left p-2">Feature</th>
            <th className="text-left p-2">Mock/Data</th>
            <th className="text-left p-2">Loading/Error</th>
            <th className="text-left p-2">Compact Ticks</th>
            <th className="text-left p-2">Gradients</th>
            <th className="text-left p-2">Sorting</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2 whitespace-nowrap">{it.card}</td>
              <td className="p-2 whitespace-nowrap">{it.section}</td>
              <td className="p-2">{it.dataSource}</td>
              <td className="p-2">{bool(it.loading)} / {bool(it.error)}</td>
              <td className="p-2">{bool(it.compactTicks)}</td>
              <td className="p-2">{bool(it.gradients)}</td>
              <td className="p-2">{bool(it.sorting)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function bool(v){
  return v ? "Yes" : "No";
}

