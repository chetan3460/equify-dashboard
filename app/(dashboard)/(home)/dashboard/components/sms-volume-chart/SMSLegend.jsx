"use client";
import { LEGEND_ITEMS, SMS_COLORS } from "./constants";

const SMSLegend = () => {
  return (
    <div className="flex flex-wrap items-center gap-6 mb-6">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.dataKey} className="flex items-center space-x-2">
          {/* Gradient Dot */}
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: SMS_COLORS[item.key].gradient }}
          />
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default SMSLegend;
