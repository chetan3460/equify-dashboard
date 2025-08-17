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
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialCards = [
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
  { id: "5", title: "Current Total TPS", value: "5K", change: "" },
];

function SortableCard({ card, isCustomising }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

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
        bg-white rounded-xl p-4 shadow transition-all duration-300 
        ${
          isCustomising
            ? "border-2 border-dashed border-gray-400"
            : "border border-transparent"
        } 
        ${isDragging ? "scale-105 shadow-lg opacity-75" : ""}
        relative
      `}
    >
      {isCustomising && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 cursor-grab p-1"
        >
          {/* Drag handle icon (dotted) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M10 4h4v4h-4V4zM10 10h4v4h-4v-4zM10 16h4v4h-4v-4z" />
          </svg>
        </div>
      )}
      <div className="font-semibold">{card.title}</div>
      <div className="text-2xl font-bold">{card.value}</div>
      <div className="text-sm text-gray-500">{card.change}</div>
    </div>
  );
}

export default function EcommerceCards() {
  const [cards, setCards] = useState(initialCards);
  const [originalCards, setOriginalCards] = useState(initialCards);
  const [isCustomising, setIsCustomising] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    const saved = localStorage.getItem("dashboard-cards");
    if (saved) setCards(JSON.parse(saved));
  }, []);

  const handleDragStart = (event) => {
    const active = cards.find((c) => c.id === event.active.id);
    setActiveCard(active);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setActiveCard(null);
      return;
    }
    setCards((items) => {
      const oldIndex = items.findIndex((c) => c.id === active.id);
      const newIndex = items.findIndex((c) => c.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
    setActiveCard(null);
    setShowConfirm(true);
  };

  const handleSave = () => {
    localStorage.setItem("dashboard-cards", JSON.stringify(cards));
    setOriginalCards(cards);
    setShowConfirm(false);
    setIsCustomising(false);
  };

  const handleCancel = () => {
    setCards(originalCards);
    setShowConfirm(false);
    setIsCustomising(false);
  };

  return (
    <div className="p-6 relative">
      {/* Customise Button */}
      <button
        onClick={() => setIsCustomising((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
      >
        {isCustomising ? "Done" : "Customise"}
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                isCustomising={isCustomising}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeCard ? (
            <div className="bg-white rounded-xl p-4 shadow-lg scale-105">
              <div className="font-semibold">{activeCard.title}</div>
              <div className="text-2xl font-bold">{activeCard.value}</div>
              <div className="text-sm text-gray-500">{activeCard.change}</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Floating confirmation popup */}
      {showConfirm && (
        <div className="fixed bottom-6 right-6 bg-white shadow-lg border rounded-lg p-4 flex items-center space-x-4 animate-fade-in">
          <span className="font-medium">Save changes?</span>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
