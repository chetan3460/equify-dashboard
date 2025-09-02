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
import GaugeChart from "./components/GaugeChart";

import GreenArrow from "../../ui/icons/ArrowUpTriangle16";
import RedArrow from "../../ui/icons/ArrowDownTriangle16";
import DragHandle from "../../ui/icons/DragHandleDots16";
import { initialCardsData } from "./data/cards";
import { getNumericValue } from "./utils/numbers";
import { STORAGE_KEY, CONTAINER_ID, applySavedOrder } from "./components/analytic-cards-helpers";

/*
  AnalyticCards
  - Draggable, persistable grid of small analytics cards
  - Integrates with a global DragProvider for save/cancel
  - Keeps the component small by delegating helpers to analytic-cards-helpers.js
*/

// -----------------------------
// Small presentational Card (supports gauge and metric types)
// -----------------------------
function Card({ data, isCustomizeMode = false }) {
  const isGaugeCard = data?.type === "gauge";

  const content = (
    <div className="rounded-20 p-4 bg-card shadow transition-all duration-300 group relative">
      {/* Drag handle (visible only in customize mode) */}
      {isCustomizeMode && (
        <div className="absolute top-2 right-2 z-10 opacity-75 hover:opacity-100 transition-opacity cursor-grab">
          <DragHandle />
        </div>
      )}

      {/* Title */}
      <div className="text-xs font-semibold text-default-600">{data.title}</div>

      {/* Content */}
      {isGaugeCard ? (
        // Gauge card
        <div className="mt-0 w-full h-[84px] flex items-center justify-center overflow-hidden">
          <GaugeChart
            value={getNumericValue(data.value)}
            maxValue={10000}
            title={data.title}
            enableAnimation={true}
            showRealTimeUpdate={false}
            width={"100%"}
            height={"100%"}
            arcWidth={0.14}
            centerLabelMode="short"
            showCenterValue={true}
            flatCaps={true}
            showTicks={false}
            valueLabelFontSize={24}
            marginInPercent={0.01}
            className="w-full text-default-900 dark:text-white"
          />
        </div>
      ) : (
        // Metric card
        <>
          <div className="flex items-center gap-1">
            <div className="text-2xl font-bold text-default-900">{data.value}</div>
            {data.trend === "up" && <GreenArrow />}
            {data.trend === "down" && <RedArrow />}
          </div>
          {data.change && (
            <div className={`flex items-center gap-1 mt-1 text-[11px] ${data.color}`}>
              <span>{data.change}</span>
            </div>
          )}
        </>
      )}
    </div>
  );

  // Optional dashed wrapper in customize mode
  if (!isCustomizeMode) return content;
  return (
    <div className="relative transition-all duration-300">
      <div className="border-2 border-dashed border-gray-400 rounded-20 p-1 min-h-[120px] transition-colors hover:border-blue-400">
        {content}
      </div>
    </div>
  );
}

// -----------------------------
// Sortable item wrapper (focuses on drag behavior)
// -----------------------------
function SortableItem({ id, children, isCustomizeMode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 50 : 1 };
  const dragProps = isCustomizeMode ? { ...attributes, ...listeners } : {};
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`transition-all duration-300 relative ${isCustomizeMode ? "cursor-grab select-none touch-none" : ""} ${isDragging ? "scale-105 opacity-75" : ""}`}
      {...dragProps}
    >
      {children}
    </div>
  );
}

// -----------------------------
// Main component
// -----------------------------
export default function AnalyticCards() {
  const { isGlobalDragMode, registerContainer, unregisterContainer, markContainerChanged } = useDragContext();

  // Items ordering state (with original for cancel)
  const [items, setItems] = React.useState(initialCardsData);
  const [originalItems, setOriginalItems] = React.useState(initialCardsData);
  const [activeItem, setActiveItem] = React.useState(null);

  // DnD sensors (small delay and tolerance to avoid accidental drags)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 120, tolerance: 8 } })
  );

  // Register save/cancel with the DragProvider
  React.useEffect(() => {
    const callbacks = {
      onSave: () => {
        const order = items.map((it, i) => ({ id: it.id, order: i }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
        setOriginalItems(items);
      },
      onCancel: () => setItems(originalItems),
    };
    registerContainer(CONTAINER_ID, callbacks);
    return () => unregisterContainer(CONTAINER_ID);
  }, [items, originalItems, registerContainer, unregisterContainer]);

  // Load saved order on mount
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const reordered = applySavedOrder(initialCardsData, saved);
    setItems(reordered);
    setOriginalItems(reordered);
  }, []);

  // Drag handlers
  const handleDragStart = React.useCallback((event) => {
    setActiveItem(items.find((i) => i.id === event.active.id) || null);
  }, [items]);

  const handleDragEnd = React.useCallback((event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveItem(null);
      return;
    }
    setItems((curr) => {
      const oldIndex = curr.findIndex((i) => i.id === active.id);
      const newIndex = curr.findIndex((i) => i.id === over.id);
      return arrayMove(curr, oldIndex, newIndex);
    });
    setActiveItem(null);
    markContainerChanged(CONTAINER_ID);
  }, [markContainerChanged]);

  // Render grid + overlay
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
            <SortableItem key={item.id} id={item.id} isCustomizeMode={isGlobalDragMode}>
              <Card data={item} isCustomizeMode={isGlobalDragMode} />
            </SortableItem>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <div className="scale-105 rotate-3">
            <Card data={activeItem} isCustomizeMode />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
