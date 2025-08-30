// hooks/useKafkaToasts.js
// Derives critical toasts from Kafka rows and manages dismiss state.

import { useEffect, useState } from "react";

export function useKafkaToasts(rows, { memoryThreshold, threadsThreshold }) {
  const [toasts, setToasts] = useState([]);
  const [dismissed, setDismissed] = useState(new Set());

  useEffect(() => {
    const critical = (rows ?? []).filter(
      (r) => Number(r?.memory) >= memoryThreshold || Number(r?.threads) >= threadsThreshold
    );

    critical.forEach((node) => {
      setToasts((prev) => {
        if (prev.some((t) => t.name === node.name) || dismissed.has(node.name)) return prev;
        return [...prev, { name: node.name, memory: node.memory, threads: node.threads }];
      });
    });
  }, [rows, memoryThreshold, threadsThreshold, dismissed]);

  const removeToast = (name) => {
    setToasts((prev) => prev.filter((t) => t.name !== name));
    setDismissed((prev) => new Set(prev).add(name));
  };

  return { toasts, removeToast };
}

