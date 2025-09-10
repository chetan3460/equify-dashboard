"use client";
import React from "react";
import { useDragContext } from "@/components/draggable/DragProvider";
import { SortableContainer } from "@/components/draggable/SortableContainer";
import Card from "./components/Card";
import { initialCardsData } from "./data/cards";
import { STORAGE_KEY, CONTAINER_ID } from "./components/analytic-cards-helpers";

/*
  AnalyticCards (refactored)
  - Uses shared SortableContainer for DnD, save/cancel, and persistence
  - Card remains a presentational component
*/

// Presentational Card moved to ./components/Card.jsx to keep this file focused on wiring.

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
      {(orderedItems, SortableItem) => (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {orderedItems.map((item, index) => SortableItem(item, index))}
        </div>
      )}
    </SortableContainer>
  );
}
