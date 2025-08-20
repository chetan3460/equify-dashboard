"use client";
import React from "react";
import { SortableContainer } from "@/components/draggable/SortableContainer";
import { useDragContext } from "@/components/draggable/DragProvider";

// Green Up Arrow
const GreenArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M8.89971 3.01375L14.366 12.5056C14.7491 13.1744 14.2541 14 13.4653 14H2.53284C1.74409 14 1.24909 13.1744 1.63221 12.5056L7.09846 3.01375C7.49221 2.32875 8.50596 2.32875 8.89971 3.01375Z"
        fill="#47E16B"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

// Red Down Arrow
const RedArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
  >
    <g clipPath="url(#clip1)">
      <path
        d="M9.09893 13.9862L14.5652 4.49438C14.9483 3.82563 14.4533 3 13.6646 3H2.73205C1.9433 3 1.4483 3.82563 1.83143 4.49438L7.29768 13.9862C7.69143 14.6712 8.70518 14.6712 9.09893 13.9862Z"
        fill="#E14761"
      />
    </g>
    <defs>
      <clipPath id="clip1">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="matrix(1 0 0 -1 0.199219 16.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

// ✅ Initial data with color + trend
const initialCardsData = [
  {
    id: "1",
    title: "Total SMS sent today",
    value: "24.588M",
    change: "12% higher than yesterday",
    color: "text-success", // green
    trend: "up",
  },
  {
    id: "2",
    title: "Avg delivery rate",
    value: "98.7%",
    change: "Stable across vendors",
    color: "text-info", // blue
    trend: "up",
  },
  {
    id: "3",
    title: "Average latency",
    value: "1.2 ms",
    change: "0.3 ms faster than last week",
    color: "text-info", // blue
    trend: "up",
  },
  {
    id: "4",
    title: "Failed messages",
    value: "190K",
    change: "8% increase from yesterday",
    color: "text-destructive", // red
    trend: "down",
  },
  {
    id: "5",
    title: "Current Total TPS",
    value: "5K",
    change: "",
    color: "text-gray-500",
    // trend: "neutral",
  },
];

// Build components array
const createCardComponents = (cardsData) => {
  return cardsData.map((cardData) => ({
    id: cardData.id,
    component: <EcommerceCard key={cardData.id} data={cardData} />,
  }));
};

// Card component
const EcommerceCard = ({ data }) => {
  const { isGlobalDragMode } = useDragContext();

  return (
    <div
      className={`
        rounded-20 p-4 bg-card transition-all duration-300
        ${
          isGlobalDragMode
            ? "border-2 border-dashed border-gray-400 hover:border-blue-400"
            : "border border-transparent hover:shadow-lg"
        }
        relative group
      `}
    >
      <div className="text-xs font-semibold  text-default-600 relative z-10">
        {data.title}
      </div>

      {/* Value + trend arrow */}
      <div className="flex items-center gap-1">
        <div className="text-2xl font-bold text-default-900">{data.value}</div>
        {data.trend === "up" && <GreenArrow />}
        {data.trend === "down" && <RedArrow />}
      </div>

      {/* Change text */}
      {data.change && (
        <div
          className={`flex items-center gap-1 mt-1 text-[11px] ${data.color}`}
        >
          <span>{data.change}</span>
        </div>
      )}

      {/* Drag indicator */}
      {isGlobalDragMode && (
        <div className="absolute top-2 left-2 opacity-60">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

// Cards container
const EcommerceCardsNew = () => {
  const cardComponents = createCardComponents(initialCardsData);

  return (
    <SortableContainer
      containerId="ecommerce-cards"
      items={cardComponents}
      storageKey="dashboard-ecommerce-cards"
      strategy="grid"
      className="w-full"
      renderOverlay={(activeItem) => (
        <div className="bg-white rounded-xl p-4 shadow-lg scale-105 rotate-3">
          {activeItem.component}
        </div>
      )}
    >
      {(items, SortableItem) => (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((item, index) => SortableItem(item, index))}
        </div>
      )}
    </SortableContainer>
  );
};

export default EcommerceCardsNew;
