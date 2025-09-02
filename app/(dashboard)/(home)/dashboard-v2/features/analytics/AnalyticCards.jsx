"use client";
import React from "react";
import { useDragContext } from "@/components/draggable/DragProvider";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  rectIntersection,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GaugeChart from "./GaugeChart";

import GreenArrow from "../../ui/icons/ArrowUpTriangle16";
import RedArrow from "../../ui/icons/ArrowDownTriangle16";
import DragHandle from "../../ui/icons/DragHandleDots16";
import { initialCardsData } from "./data";
import { getNumericValue } from "./utils";

/* Card Content - The draggable inner part */
const AnalyticCardContent = ({ data, isCustomizeMode = false }) => {
  const isGaugeCard = data?.id === "5";
  const containerClass = `rounded-20 p-4 bg-card shadow transition-all duration-300 group relative`;
  return (
    <div className={containerClass}>
      {/* Drag handle - appears in customize mode */}
      {isCustomizeMode && (
        <div className="absolute top-2 right-2 z-10 opacity-75 hover:opacity-100 transition-opacity cursor-grab">
          <DragHandle />
        </div>
      )}

      <div className="text-xs font-semibold text-default-600">{data.title}</div>

      {data.id === "5" ? (
        // For Current Total TPS card, show the gauge chart
        <div className="mt-0 w-full h-[84px] flex items-center justify-center overflow-hidden">
          <GaugeChart
            value={getNumericValue(data.value)}
            maxValue={10000}
            title={data.title}
            enableAnimation={true}
            showRealTimeUpdate={false}
            width={"100%"}
            height={"100%"}
            arcWidth={0.20}
            centerLabelMode="short"
            showCenterValue={true}
            flatCaps={true}
            showTicks={false}
            valueLabelFontSize={28}
            className="w-full max-w-[360px] text-default-900 dark:text-white"
          />
        </div>
      ) : (
        // For all other cards, show the regular value and change text
        <>
          {/* Value + trend arrow */}
          <div className="flex items-center gap-1">
            <div className="text-2xl font-bold text-default-900">
              {data.value}
            </div>
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
        </>
      )}
    </div>
  );
};

// Wrapper that adds dashed border in customize mode
const AnalyticCard = ({ data, isCustomizeMode }) => {
  if (isCustomizeMode) {
    return (
      <div className="relative transition-all duration-300">
        <div className="border-2 border-dashed border-gray-400 rounded-20 p-1 min-h-[120px] transition-colors hover:border-blue-400">
          <AnalyticCardContent data={data} isCustomizeMode={true} />
        </div>
      </div>
    );
  }
  return <AnalyticCardContent data={data} isCustomizeMode={false} />;
};

/* Simple Sortable Item for Cards */
function CardSortableItem({ id, children, isCustomizeMode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  const dragProps = isCustomizeMode ? { ...attributes, ...listeners } : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`transition-all duration-300 relative ${
        isCustomizeMode ? "cursor-grab select-none touch-none" : ""
      } ${isDragging ? "scale-105 opacity-75" : ""}`}
      {...dragProps}
    >
      {children}
    </div>
  );
}

/* Container */
const AnalyticCards = () => {
  const {
    isGlobalDragMode,
    registerContainer,
    unregisterContainer,
    markContainerChanged,
  } = useDragContext();
  const [items, setItems] = React.useState(initialCardsData);
  const [originalItems, setOriginalItems] = React.useState(initialCardsData);
  const [activeItem, setActiveItem] = React.useState(null);
  const containerId = "analytics-cards";

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    })
  );

  // Register this container with the DragProvider
  React.useEffect(() => {
    const callbacks = {
      onSave: () => {
        // Save the current order to localStorage
        const itemOrder = items.map((item, index) => ({
          id: item.id,
          order: index,
        }));
        localStorage.setItem(
          "dashboard-analytics-cards",
          JSON.stringify(itemOrder)
        );
        setOriginalItems(items);
      },
      onCancel: () => {
        // Revert to original order
        setItems(originalItems);
      },
    };

    registerContainer(containerId, callbacks);
    return () => unregisterContainer(containerId);
  }, [items, originalItems, registerContainer, unregisterContainer]);

  // Load saved order from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("dashboard-analytics-cards");
    if (saved) {
      try {
        const savedOrder = JSON.parse(saved);
        if (savedOrder && Array.isArray(savedOrder) && savedOrder.length > 0) {
          const reorderedItems = [...initialCardsData];
          savedOrder.forEach((orderItem, index) => {
            const itemIndex = reorderedItems.findIndex(
              (item) => item.id === orderItem.id
            );
            if (itemIndex !== -1) {
              const [item] = reorderedItems.splice(itemIndex, 1);
              reorderedItems.splice(index, 0, item);
            }
          });
          setItems(reorderedItems);
          setOriginalItems(reorderedItems);
        }
      } catch (error) {
        console.error("Error loading saved order:", error);
      }
    }
  }, []);

  const handleDragStart = (event) => {
    const active = items.find((item) => item.id === event.active.id);
    setActiveItem(active);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveItem(null);
      return;
    }

    setItems((currentItems) => {
      const oldIndex = currentItems.findIndex((item) => item.id === active.id);
      const newIndex = currentItems.findIndex((item) => item.id === over.id);
      return arrayMove(currentItems, oldIndex, newIndex);
    });

    setActiveItem(null);
    markContainerChanged(containerId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <CardSortableItem
              key={item.id}
              id={item.id}
              isCustomizeMode={isGlobalDragMode}
            >
              <AnalyticCard data={item} isCustomizeMode={isGlobalDragMode} />
            </CardSortableItem>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <div className="scale-105 rotate-3">
            <AnalyticCardContent data={activeItem} isCustomizeMode={true} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default AnalyticCards;
