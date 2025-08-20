"use client";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  // In customize mode, apply drag listeners to the entire content
  // In normal mode, apply drag listeners to the drag handle only
  const dragProps = isCustomizeMode ? { ...attributes, ...listeners } : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        transition-all duration-300 relative 
        ${isCustomizeMode ? "cursor-grab " : ""} 
        ${isDragging ? "scale-105 opacity-75" : ""} 
        ${className}
      `}
      {...dragProps}
    >
      {!isCustomizeMode && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 cursor-grab z-20 w-4 h-4 opacity-0 hover:opacity-100 transition-opacity"
          {...dragHandleProps}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_376_3320)">
              <path
                d="M5.75 4.5C6.16421 4.5 6.5 4.16421 6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75C5 4.16421 5.33579 4.5 5.75 4.5Z"
                fill="black"
              />
              <path
                d="M10.25 4.5C10.6642 4.5 11 4.16421 11 3.75C11 3.33579 10.6642 3 10.25 3C9.83579 3 9.5 3.33579 9.5 3.75C9.5 4.16421 9.83579 4.5 10.25 4.5Z"
                fill="black"
              />
              <path
                d="M5.75 8.75C6.16421 8.75 6.5 8.41421 6.5 8C6.5 7.58579 6.16421 7.25 5.75 7.25C5.33579 7.25 5 7.58579 5 8C5 8.41421 5.33579 8.75 5.75 8.75Z"
                fill="black"
              />
              <path
                d="M10.25 8.75C10.6642 8.75 11 8.41421 11 8C11 7.58579 10.6642 7.25 10.25 7.25C9.83579 7.25 9.5 7.58579 9.5 8C9.5 8.41421 9.83579 8.75 10.25 8.75Z"
                fill="black"
              />
              <path
                d="M5.75 13C6.16421 13 6.5 12.6642 6.5 12.25C6.5 11.8358 6.16421 11.5 5.75 11.5C5.33579 11.5 5 11.8358 5 12.25C5 12.6642 5.33579 13 5.75 13Z"
                fill="black"
              />
              <path
                d="M10.25 13C10.6642 13 11 12.6642 11 12.25C11 11.8358 10.6642 11.5 10.25 11.5C9.83579 11.5 9.5 11.8358 9.5 12.25C9.5 12.6642 9.83579 13 10.25 13Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_376_3320">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
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
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
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

  // Load from storage on mount
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
          }
        } catch (error) {
          console.error(
            `Error loading ${storageKey} from localStorage:`,
            error
          );
        }
      }
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
    <div className={className}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={getSortingStrategy()}>
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
            <div className="transform rotate-6 opacity-90">{activeItem}</div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
