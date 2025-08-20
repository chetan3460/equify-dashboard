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
  dragHandleProps = {} 
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        transition-all duration-300 relative
        ${isCustomizeMode ? "cursor-grab" : ""} 
        ${isDragging ? "scale-105 shadow-lg opacity-75" : ""} 
        ${className}
      `}
    >
      {isCustomizeMode && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 cursor-grab p-1 z-10 bg-white rounded shadow-sm border"
          {...dragHandleProps}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M10 4h4v4h-4V4zM10 10h4v4h-4v-4zM10 16h4v4h-4v-4z" />
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
    markContainerChanged 
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
          if (savedOrder && Array.isArray(savedOrder) && savedOrder.length > 0) {
            const reorderedItems = [...initialItems];
            // Sort based on saved order
            savedOrder.forEach((orderItem, index) => {
              const itemIndex = reorderedItems.findIndex(item => item.id === orderItem.id);
              if (itemIndex !== -1) {
                const [item] = reorderedItems.splice(itemIndex, 1);
                reorderedItems.splice(index, 0, item);
              }
            });
            setItems(reorderedItems);
            setOriginalItems(reorderedItems);
          }
        } catch (error) {
          console.error(`Error loading ${storageKey} from localStorage:`, error);
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
          const itemOrder = items.map(item => ({ id: item.id, order: items.indexOf(item) }));
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
  }, [containerId, items, originalItems, storageKey, onItemsChange, registerContainer, unregisterContainer]);

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
          {children(items, (item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              isCustomizeMode={isGlobalDragMode}
            >
              {item.component || item}
            </SortableItem>
          ))}
        </SortableContext>

        <DragOverlay>
          {activeItem && renderOverlay ? (
            renderOverlay(activeItem)
          ) : activeItem ? (
            <div className="transform rotate-6 opacity-90">
              {activeItem}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
