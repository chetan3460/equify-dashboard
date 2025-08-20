"use client";
import React from "react";
import { cn } from "@/lib/utils";
import SafeIcon from "@/components/ui/safe-icon";
import { SortableContainer } from "@/components/draggable/SortableContainer";
import { useDragContext } from "@/components/draggable/DragProvider";

const initialStatsData = [
  {
    id: "stat-1",
    text: "Total Sales",
    total: "42,750.98",
    color: "primary",
    icon: <SafeIcon icon="heroicons:chart-bar" className="w-3.5 h-3.5" />,
  },
  {
    id: "stat-2",
    text: "Today Orders",
    total: "536,23,3",
    color: "warning",
    icon: <SafeIcon icon="heroicons:document-text" className="w-3.5 h-3.5" />,
  },
  {
    id: "stat-3",
    text: "Completed Orders",
    total: "234,1",
    color: "success",
    icon: <SafeIcon icon="heroicons:check-circle" className="w-3.5 h-3.5" />,
  },
  {
    id: "stat-4",
    text: "Pending Orders",
    total: "332,34",
    color: "destructive",
    icon: <SafeIcon icon="heroicons:clock" className="w-3.5 h-3.5" />,
  },
];

// Individual stat card component
const StatCard = ({ data }) => {
  const { isGlobalDragMode } = useDragContext();

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-4 rounded-lg items-start relative bg-white transition-all duration-300",
        isGlobalDragMode 
          ? "border-2 border-dashed border-gray-400 hover:border-blue-400" 
          : "hover:shadow-md"
      )}
    >
      {/* Drag mode indicator */}
      {isGlobalDragMode && (
        <div className="absolute top-2 left-2 opacity-60">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      )}

      <div
        className={`w-8 h-8 grid place-content-center rounded-full border border-dashed border-${data.color} dark:border-primary-foreground/60`}
      >
        <span
          className={cn(
            `h-6 w-6 rounded-full grid place-content-center bg-${data.color}`,
            {
              "dark:bg-[#EFF3FF]/30": data.color === "primary",
              "dark:bg-[#FFF7ED]/30": data.color === "warning",
              "dark:bg-[#ECFDF4]/30": data.color === "success",
              "dark:bg-[#FEF2F2]/30": data.color === "destructive",
            }
          )}
        >
          {data.icon}
        </span>
      </div>
      <span className="mt-3 text-sm text-default-800 dark:text-primary-foreground font-medium capitalize relative z-10">
        {data.text}
      </span>
      <div className="flex items-center gap-1">
        <span className="text-lg font-semibold text-default-900 dark:text-primary-foreground">
          {data.total}
        </span>
        <SafeIcon
          icon="heroicons:arrow-trending-up"
          className={`w-5 h-5 text-${data.color} dark:text-primary-foreground`}
        />
      </div>
    </div>
  );
};

// Convert data to renderable components
const createStatComponents = (statsData) => {
  return statsData.map(statData => ({
    id: statData.id,
    component: <StatCard key={statData.id} data={statData} />
  }));
};

const DraggableEcommerceStats = () => {
  const statComponents = createStatComponents(initialStatsData);

  return (
    <SortableContainer
      containerId="ecommerce-stats"
      items={statComponents}
      storageKey="dashboard-ecommerce-stats"
      strategy="grid"
      className="w-full"
      renderOverlay={(activeItem) => (
        <div className="transform scale-105 rotate-2 shadow-lg">
          {activeItem.component}
        </div>
      )}
    >
      {(items, SortableItem) => (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {items.map((item, index) => 
            SortableItem(item, index)
          )}
        </div>
      )}
    </SortableContainer>
  );
};

export default DraggableEcommerceStats;
