import React from "react";
import { formatNumber } from "../../utils/utils";

const SMS_COLORS = {
  total: "#00B6F1",
  delivered: "#56DF78",
  failed: "#FF4E98",
  retry: "#F77500",
};

export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;

  const total = payload.find((p) => p.dataKey === "total")?.value || 0;
  const delivered = payload.find((p) => p.dataKey === "delivered")?.value || 0;
  const failed = payload.find((p) => p.dataKey === "failed")?.value || 0;
  const retry = payload.find((p) => p.dataKey === "retry")?.value || 0;

  return (
    <div
      className="inline-flex flex-col items-start gap-[5.7px] p-2 rounded-[4px] border border-[#DADADA] bg-white dark:bg-[#33445B] dark:border-[#4E6079]"
      style={{ fontFamily: "Poppins, sans-serif", fontSize: "11.4px" }}
    >
      <p className="text-gray-900 font-medium mb-1">Time: {label}</p>

      <div className="flex items-center justify-between gap-1">
        <span style={{ color: SMS_COLORS.total }}>Total SMS:</span>
        <span style={{ color: SMS_COLORS.total }}>{formatNumber(total)}</span>
      </div>

      <div className="flex items-center justify-between gap-1">
        <span style={{ color: SMS_COLORS.delivered }}>Delivered:</span>
        <span style={{ color: SMS_COLORS.delivered }}>
          {formatNumber(delivered)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-1">
        <span style={{ color: SMS_COLORS.failed }}>Failed:</span>
        <span style={{ color: SMS_COLORS.failed }}>{formatNumber(failed)}</span>
      </div>

      <div className="flex items-center justify-between gap-1">
        <span style={{ color: SMS_COLORS.retry }}>Retry:</span>
        <span style={{ color: SMS_COLORS.retry }}>{formatNumber(retry)}</span>
      </div>
    </div>
  );
};

export default CustomTooltip;
