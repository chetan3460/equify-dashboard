"use client";
import React, { useState, useEffect } from "react";
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
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDragContext } from "./DragProvider";

// Sortable item wrapper
function SortableItem({
  id,
  children,
  isCustomizeMode,
  className = "",
  dragHandleProps = {},
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // Avoid scaling effects from dnd-kit by applying translate only
  const style = {
    transform:
      transform != null
        ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
        : undefined,
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  // In customize mode, apply drag listeners to entire item as well as the handle
  const dragProps = isCustomizeMode ? { ...attributes, ...listeners } : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        transition-all duration-300 relative 
        ${
          isCustomizeMode
            ? "cursor-grab select-none touch-none border-2 border-dashed border-gray-400 rounded-20 p-1  hover:border-blue-400"
            : ""
        } 
        ${className}
      `}
      {...dragProps}
    >
      {children}
    </div>
  );
}

// Main sortable container
export const SortableContainer = ({
  containerId,
  items: initialItems,
  children,
  className = "",
  strategy = "grid", // "vertical", "horizontal", "grid"
  storageKey,
  onItemsChange,
  renderOverlay,
  restrictBySpan = true,
}) => {
  const {
    isGlobalDragMode,
    registerContainer,
    unregisterContainer,
    markContainerChanged,
  } = useDragContext();

  const [items, setItems] = useState(initialItems);
  const [originalItems, setOriginalItems] = useState(initialItems);
  const [activeItem, setActiveItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 8,
      },
    })
  );

  // Choose sorting strategy
  const getSortingStrategy = () => {
    switch (strategy) {
      case "vertical":
        return verticalListSortingStrategy;
      case "horizontal":
        return horizontalListSortingStrategy;
      case "grid":
      default:
        return rectSortingStrategy;
    }
  };

  // Load from storage on mount and whenever initialItems change
  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const savedOrder = JSON.parse(saved);
          // Reorder items based on saved order
          if (
            savedOrder &&
            Array.isArray(savedOrder) &&
            savedOrder.length > 0
          ) {
            const reorderedItems = [...initialItems];
            // Sort based on saved order
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
            return;
          }
        } catch (error) {
          console.error(
            `Error loading ${storageKey} from localStorage:`,
            error
          );
        }
      }
      // If no saved order, sync with latest initialItems
      setItems(initialItems);
      setOriginalItems(initialItems);
    } else {
      // No storageKey: always sync with latest initialItems
      setItems(initialItems);
      setOriginalItems(initialItems);
    }
  }, [storageKey, initialItems]);

  // Register container with drag context
  useEffect(() => {
    const callbacks = {
      onSave: () => {
        if (storageKey) {
          // Only save the order (IDs), not the full component objects
          const itemOrder = items.map((item) => ({
            id: item.id,
            order: items.indexOf(item),
          }));
          localStorage.setItem(storageKey, JSON.stringify(itemOrder));
        }
        setOriginalItems(items);
        if (onItemsChange) {
          onItemsChange(items);
        }
      },
      onCancel: () => {
        setItems(originalItems);
        if (onItemsChange) {
          onItemsChange(originalItems);
        }
      },
    };

    registerContainer(containerId, callbacks);

    return () => unregisterContainer(containerId);
  }, [
    containerId,
    items,
    originalItems,
    storageKey,
    onItemsChange,
    registerContainer,
    unregisterContainer,
  ]);

  const handleDragStart = (event) => {
    const active = items.find((item) => item.id === event.active.id);
    setActiveItem(active);
  };

  // Normalize className to a span group key (only col-span tokens matter)
  const getSpanGroup = (cls) => {
    if (!cls || typeof cls !== "string") return "default";
    const tokens = cls
      .split(/\s+/)
      .filter((c) => /^(?:sm:|md:|lg:|xl:)?col-span-/.test(c))
      .sort();
    return tokens.length ? tokens.join("|") : "default";
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

      // Restrict reordering to items with matching span groups (configurable)
      if (restrictBySpan) {
        const aGroup = getSpanGroup(currentItems[oldIndex]?.className);
        const bGroup = getSpanGroup(currentItems[newIndex]?.className);
        if (aGroup !== bGroup) {
          return currentItems; // no change
        }
      }

      return arrayMove(currentItems, oldIndex, newIndex);
    });

    setActiveItem(null);
    markContainerChanged(containerId);
  };

  return (
    <div className={className}>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((it) => it.id)}
          strategy={getSortingStrategy()}
        >
          {children(items, (item, index, customClassName = "") => (
            <SortableItem
              key={item.id}
              id={item.id}
              isCustomizeMode={isGlobalDragMode}
              className={customClassName}
            >
              {item.component || item}
            </SortableItem>
          ))}
        </SortableContext>

        <DragOverlay>
          {activeItem && renderOverlay ? (
            renderOverlay(activeItem)
          ) : activeItem ? (
            <div>
              {activeItem.component || activeItem}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
