"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

const DragContext = createContext();

export const useDragContext = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDragContext must be used within a DragProvider");
  }
  return context;
};

export const DragProvider = ({ children }) => {
  const [isGlobalDragMode, setIsGlobalDragMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(new Set());
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Store callbacks for each draggable container
  const [containerCallbacks, setContainerCallbacks] = useState(new Map());

  const registerContainer = useCallback((containerId, callbacks) => {
    setContainerCallbacks(prev => new Map(prev).set(containerId, callbacks));
  }, []);

  const unregisterContainer = useCallback((containerId) => {
    setContainerCallbacks(prev => {
      const newMap = new Map(prev);
      newMap.delete(containerId);
      return newMap;
    });
  }, []);

  const markContainerChanged = useCallback((containerId) => {
    setPendingChanges(prev => new Set(prev).add(containerId));
  }, []);

  const toggleDragMode = useCallback(() => {
    if (isGlobalDragMode) {
      // Exiting drag mode - check for pending changes
      if (pendingChanges.size > 0) {
        setShowConfirmation(true);
      } else {
        setIsGlobalDragMode(false);
      }
    } else {
      // Entering drag mode
      setIsGlobalDragMode(true);
      setPendingChanges(new Set());
    }
  }, [isGlobalDragMode, pendingChanges.size]);

  const saveChanges = useCallback(() => {
    // Call save for all containers that have pending changes
    pendingChanges.forEach(containerId => {
      const callbacks = containerCallbacks.get(containerId);
      if (callbacks?.onSave) {
        callbacks.onSave();
      }
    });
    
    setIsGlobalDragMode(false);
    setShowConfirmation(false);
    setPendingChanges(new Set());
  }, [pendingChanges, containerCallbacks]);

  const cancelChanges = useCallback(() => {
    // Call cancel for all containers that have pending changes
    pendingChanges.forEach(containerId => {
      const callbacks = containerCallbacks.get(containerId);
      if (callbacks?.onCancel) {
        callbacks.onCancel();
      }
    });
    
    setIsGlobalDragMode(false);
    setShowConfirmation(false);
    setPendingChanges(new Set());
  }, [pendingChanges, containerCallbacks]);

  const value = {
    isGlobalDragMode,
    pendingChanges,
    showConfirmation,
    toggleDragMode,
    saveChanges,
    cancelChanges,
    registerContainer,
    unregisterContainer,
    markContainerChanged,
  };

  return (
    <DragContext.Provider value={value}>
      {children}
    </DragContext.Provider>
  );
};
