"use client";
import React from "react";
import { useDragContext } from "@/components/draggable/DragProvider";
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* Green Up Arrow */
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

/* Red Down Arrow */
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

/* Data */
const initialCardsData = [
  {
    id: "1",
    title: "Total SMS sent today",
    value: "24.588M",
    change: "12% higher than yesterday",
    color: "text-success",
    trend: "up",
  },
  {
    id: "2",
    title: "Avg delivery rate",
    value: "98.7%",
    change: "Stable across vendors",
    color: "text-info",
    trend: "up",
  },
  {
    id: "3",
    title: "Average latency",
    value: "1.2 ms",
    change: "0.3 ms faster than last week",
    color: "text-info",
    trend: "up",
  },
  {
    id: "4",
    title: "Failed messages",
    value: "190K",
    change: "8% increase from yesterday",
    color: "text-destructive",
    trend: "down",
  },
  {
    id: "5",
    title: "Current Total TPS",
    value: "5K",
    change: "",
    color: "text-gray-500",
  },
];

/* Drag Handle SVG Component */
const DragHandle = () => (
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
);

/* Card Content - The draggable inner part */
const EcommerceCardContent = ({ data, isCustomizeMode = false }) => {
  return (
    <div className="rounded-20 p-4 bg-card shadow transition-all duration-300 group relative">
      {/* Drag handle - appears in customize mode */}
      {isCustomizeMode && (
        <div className="absolute top-2 right-2 z-10 opacity-75 hover:opacity-100 transition-opacity cursor-grab">
          <DragHandle />
        </div>
      )}
      
      <div className="text-xs font-semibold text-default-600">
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
    </div>
  );
};
const EcommerceCard = ({ data, isCustomizeMode }) => {
  if (isCustomizeMode) {
    // In customize mode: show card with dashed border and drag handle
    return (
      <div className="relative transition-all duration-300">
        <div className="border-2 border-dashed border-gray-400 rounded-20 p-1 min-h-[120px] transition-colors hover:border-blue-400">
          <EcommerceCardContent data={data} isCustomizeMode={true} />
        </div>
      </div>
    );
  } else {
    // Normal mode: clean card without dashed borders
    return (
      <div className="relative transition-all duration-300">
        <div className="rounded-20 p-4 bg-card shadow transition-all duration-300 group hover:shadow-lg">
          <div className="text-xs font-semibold text-default-600">
            {data.title}
          </div>

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
        </div>
      </div>
    );
  }
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
      className={`
        transition-all duration-300 relative
        ${isCustomizeMode ? "cursor-grab" : ""}
        ${isDragging ? "scale-105 opacity-75" : ""}
      `}
      {...dragProps}
    >
      {children}
    </div>
  );
}

/* Container */
const EcommerceCardsNew = () => {
  const { isGlobalDragMode, registerContainer, unregisterContainer, markContainerChanged } = useDragContext();
  const [items, setItems] = React.useState(initialCardsData);
  const [originalItems, setOriginalItems] = React.useState(initialCardsData);
  const [activeItem, setActiveItem] = React.useState(null);
  const containerId = "ecommerce-cards";

  const sensors = useSensors(
    useSensor(PointerSensor, { 
      activationConstraint: { distance: 8 } 
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
        localStorage.setItem('dashboard-ecommerce-cards', JSON.stringify(itemOrder));
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
    const saved = localStorage.getItem('dashboard-ecommerce-cards');
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
        console.error('Error loading saved order:', error);
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
    // Mark this container as changed to trigger the confirmation popup
    markContainerChanged(containerId);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <CardSortableItem key={item.id} id={item.id} isCustomizeMode={isGlobalDragMode}>
              <EcommerceCard data={item} isCustomizeMode={isGlobalDragMode} />
            </CardSortableItem>
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <div className="scale-105 rotate-3">
            <EcommerceCardContent data={activeItem} isCustomizeMode={true} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default EcommerceCardsNew;
