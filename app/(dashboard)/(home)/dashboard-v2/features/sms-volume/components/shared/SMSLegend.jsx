"use client";
import { LEGEND_ITEMS, SMS_COLORS } from "../../utils/constants";

const SMSLegend = () => (
  <div className="flex flex-wrap items-center gap-6 mb-6">
    {LEGEND_ITEMS.map((item) => (
      <div key={item.dataKey} className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full" style={{ background: SMS_COLORS[item.key].gradient }} />
        <span className="text-default-900">{item.label}</span>
      </div>
    ))}
  </div>
);

export default SMSLegend;

