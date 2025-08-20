"use client";
import React from "react";
import { SortableContainer } from "@/components/draggable/SortableContainer";
import { useDragContext } from "@/components/draggable/DragProvider";

const initialCardsData = [
  {
    id: "1",
    title: "Total SMS sent today",
    value: "24.588M",
    change: "12% higher than yesterday",
  },
  {
    id: "2",
    title: "Avg delivery rate",
    value: "98.7%",
    change: "Stable across vendors",
  },
  {
    id: "3",
    title: "Average latency",
    value: "1.2 ms",
    change: "0.3 ms faster than last week",
  },
  {
    id: "4",
    title: "Failed messages",
    value: "190K",
    change: "8% increase from yesterday",
  },
  { 
    id: "5", 
    title: "Current Total TPS", 
    value: "5K", 
    change: "" 
  },
];

// Convert data to renderable components
const createCardComponents = (cardsData) => {
  return cardsData.map(cardData => ({
    id: cardData.id,
    component: <EcommerceCard key={cardData.id} data={cardData} />
  }));
};

// Individual card component
const EcommerceCard = ({ data }) => {
  const { isGlobalDragMode } = useDragContext();
  
  return (
    <div
      className={`
        bg-white rounded-xl p-4 shadow transition-all duration-300 
        ${isGlobalDragMode 
          ? "border-2 border-dashed border-gray-400 hover:border-blue-400" 
          : "border border-transparent hover:shadow-lg"
        } 
        relative group
      `}
    >
      <div className="font-semibold text-gray-900">{data.title}</div>
      <div className="text-2xl font-bold text-gray-900 mt-1">{data.value}</div>
      {data.change && (
        <div className="text-sm text-gray-500 mt-1">{data.change}</div>
      )}
      
      {/* Drag mode indicator */}
      {isGlobalDragMode && (
        <div className="absolute top-2 left-2 opacity-60">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

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
          {items.map((item, index) => 
            SortableItem(item, index)
          )}
        </div>
      )}
    </SortableContainer>
  );
};

export default EcommerceCardsNew;
