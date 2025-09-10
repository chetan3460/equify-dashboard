"use client";
import React from "react";
import { useDragContext } from "@/components/draggable/DragProvider";
import { SortableContainer } from "@/components/draggable/SortableContainer";
import GaugeChart from "./components/GaugeChart";

import { ArrowUpTriangle16 as GreenArrow, ArrowDownTriangle16 as RedArrow, DragHandleDots16 as DragHandle } from "@/ui/icons";
import { initialCardsData } from "./data/cards";
import { getNumericValue } from "./utils/numbers";
import { STORAGE_KEY, CONTAINER_ID } from "./components/analytic-cards-helpers";

/*
  AnalyticCards (refactored)
  - Uses shared SortableContainer for DnD, save/cancel, and persistence
  - Card remains a presentational component
*/

// -----------------------------
// Small presentational Card (supports gauge and metric types)
// -----------------------------
function formatCardValue(value) {
  if (value == null) return "";
  const str = String(value).trim();
  // Preserve percentages as-is
  if (str.endsWith("%")) return str;
  // Handle latency like "1.2 ms" or "1200 ms"
  if (str.toLowerCase().endsWith("ms")) {
    const num = parseFloat(str.replace(/[^0-9.\-]/g, ""));
    if (!Number.isFinite(num)) return str;
    return `${Number(num.toFixed(1))} ms`;
  }
  const num = parseFloat(str.replace(/,/g, "").replace(/[^0-9.\-]/g, ""));
  if (!Number.isFinite(num)) return str;
  const abs = Math.abs(num);
  if (abs >= 1_000_000) return `${(num / 1_000_000).toFixed(3)}M`;
  if (abs >= 1_000) return `${Math.round(num / 1_000)}K`;
  return num.toLocaleString();
}

function Card({ data }) {
  const { isGlobalDragMode } = useDragContext();
  const isGaugeCard = data?.type === "gauge";

  const content = (
    <div className="rounded-20 p-4 bg-card shadow transition-all duration-300 group relative">
      {/* Drag handle (visible only in customize mode) */}
      {isGlobalDragMode && (
        <div className="absolute top-2 right-2 z-10 opacity-75 hover:opacity-100 transition-opacity cursor-grab">
          <DragHandle />
        </div>
      )}

      {/* Title */}
      <div className="text-xs font-semibold text-default-600">{data.title}</div>

      {/* Content */}
      {isGaugeCard ? (
        <div className="mt-0 w-full h-[65px] flex items-center justify-center overflow-hidden">
          <GaugeChart
            value={getNumericValue(data.value)}
            maxValue={10000}
            title={data.title}
            enableAnimation={true}
            showRealTimeUpdate={false}
            width={"100%"}
            height={"100px"}
            arcWidth={0.14}
            centerLabelMode="short"
            showCenterValue={true}
            flatCaps={true}
            showTicks={false}
            valueLabelFontSize={24}
            marginInPercent={0.01}
            className=" text-default-900 dark:text-white"
          />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1">
            <div className="text-2xl font-bold text-default-900">
              {formatCardValue(data.value)}
            </div>
            {data.trend === "up" && <GreenArrow />}
            {data.trend === "down" && <RedArrow />}
          </div>
          {data.change && (
            <div className={`flex items-center gap-1 mt-3 text-[11px] ${data.color}`}>
              <span className="font-medium">{data.change}</span>
            </div>
          )}
        </>
      )}
    </div>
  );

  if (!isGlobalDragMode) return content;
  return (
    <div className="relative transition-all duration-300">
      <div className="border-2 border-dashed border-gray-400 rounded-20 p-1 min-h-[120px] transition-colors hover:border-blue-400">
        {content}
      </div>
    </div>
  );
}

// -----------------------------
// Main component
// -----------------------------
export default function AnalyticCards() {
  const { isGlobalDragMode } = useDragContext();

  // Build components for SortableContainer (id + component)
  const [items, setItems] = React.useState(() =>
    initialCardsData.map((d) => ({ id: d.id, component: <Card data={d} /> }))
  );

  return (
    <SortableContainer
      containerId={CONTAINER_ID}
      items={items}
      storageKey={STORAGE_KEY}
      strategy="grid"
      onItemsChange={setItems}
      className=""
    >
      {(orderedItems, renderSortable) => (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {orderedItems.map((item, index) => renderSortable(item, index))}
        </div>
      )}
    </SortableContainer>
  );
}
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <div>
            <Card data={activeItem} isCustomizeMode />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
