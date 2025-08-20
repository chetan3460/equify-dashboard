"use client";
import React from "react";
import { useDragContext } from "./DragProvider";

export const DragModeHeader = ({ 
  title,
  description, 
  children,
  className = "" 
}) => {
  return (
    <div className={`flex items-center flex-wrap justify-between gap-4 ${className}`}>
      <div className="flex flex-col gap-1">
        {title && (
          <div className="text-2xl font-semibold">{title}</div>
        )}
        {description && (
          <p className="text-midgray">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {children}
      </div>
    </div>
  );
};

// Confirmation popup component
export const DragConfirmationPopup = () => {
  const { showConfirmation, saveChanges, cancelChanges } = useDragContext();

  if (!showConfirmation) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-xl border rounded-lg p-5 flex flex-col space-y-4 animate-fade-in z-50 min-w-[280px]">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="font-semibold text-gray-900">Done customizing?</span>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={cancelChanges}
          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition font-medium"
        >
          Cancel
        </button>
        <button
          onClick={saveChanges}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
        >
          Save Changes
        </button>
      </div>

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
};
