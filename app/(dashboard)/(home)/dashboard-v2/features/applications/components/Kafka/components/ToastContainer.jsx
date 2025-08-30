// components/ToastContainer.jsx
// Portal container that renders CriticalToast to the top-level body.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CriticalToast from "./CriticalToast";

export default function ToastContainer({ toasts, removeToast, iconSrc }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-4 right-6 flex flex-col gap-2 z-[999999] pointer-events-none">
      {toasts.map((node) => (
        <CriticalToast key={node.name} node={node} onClose={removeToast} iconSrc={iconSrc} />
      ))}
    </div>,
    document.body
  );
}

