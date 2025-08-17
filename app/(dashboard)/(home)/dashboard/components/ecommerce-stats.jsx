"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import SafeIcon from "@/components/ui/safe-icon";

const EcommerceStats = () => {
  const data = [
    {
      text: "Total Sales",
      total: "42,750.98",
      color: "primary",
      icon: <SafeIcon icon="heroicons:chart-bar" className="w-3.5 h-3.5" />,
    },
    {
      text: "Today Orders",
      total: "536,23,3",
      color: "warning",
      icon: <SafeIcon icon="heroicons:document-text" className="w-3.5 h-3.5" />,
    },
    {
      text: "Completed Orders",
      total: "234,1",
      color: "success",
      icon: <SafeIcon icon="heroicons:check-circle" className="w-3.5 h-3.5" />,
    },
    {
      text: "Pending Orders",
      total: "332,34",
      color: "destructive",
      icon: <SafeIcon icon="heroicons:clock" className="w-3.5 h-3.5" />,
    },
  ];
  return (
    <>
      {data.map((item, index) => (
        <div
          key={`reports-state-${index}`}
          className={cn(
            "flex flex-col gap-1.5 p-4  rounded-lg  items-start relative bg-white"
          )}
        >
          <div
            className={`w-8 h-8 grid place-content-center rounded-full border border-dashed border-${item.color} dark:border-primary-foreground/60`}
          >
            <span
              className={cn(
                `h-6 w-6 rounded-full grid place-content-center  bg-${item.color}`,
                {
                  "dark:bg-[#EFF3FF]/30": item.color === "primary",
                  "dark:bg-[#FFF7ED]/30": item.color === "warning",
                  "dark:bg-[#ECFDF4]/30": item.color === "success",
                  "dark:bg-[#FEF2F2]/30": item.color === "destructive",
                }
              )}
            >
              {item.icon}
            </span>
          </div>
          <span className="mt-3 text-sm text-default-800 dark:text-primary-foreground font-medium capitalize relative z-10">
            {" "}
            {item.text}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold text-default-900  dark:text-primary-foreground">
              {item.total}
            </span>
            <Icon
              icon="heroicons:arrow-trending-up"
              className={`w-5 h-5 text-${item.color} dark:text-primary-foreground`}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default EcommerceStats;
