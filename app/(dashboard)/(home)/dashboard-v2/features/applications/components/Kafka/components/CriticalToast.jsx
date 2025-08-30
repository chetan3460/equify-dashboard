// components/CriticalToast.jsx
// Single toast card for system critical alerts.

import Image from "next/image";
import { useEffect } from "react";

export default function CriticalToast({ node, onClose, iconSrc }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(node.name), 5000);
    return () => clearTimeout(t);
  }, [node.name, onClose]);

  return (
    <div className="pointer-events-auto bg-[#FDF6F7] border border-destructive-700 px-3 py-4 rounded-[6px] shadow-md flex flex-col gap-1 w-[360px] max-w-[min(90vw,360px)]">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-base text-default-900 inline-flex items-center gap-1">
          <Image
            src={iconSrc}
            alt=""
            width={32}
            height={32}
            className="shrink-0"
            priority
          />
          System Critical
        </span>
        <button
          onClick={() => onClose(node.name)}
          className="ml-auto hover:text-red-600 w-3 h-3 flex items-center justify-center"
          aria-label="Dismiss system critical notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M9.375 2.625L2.625 9.375M9.375 9.375L2.625 2.625"
              stroke="black"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="text-default-600 text-xs">
        {node.name}’s memory is at{" "}
        <span className="font-medium">{node.memory}%</span> with{" "}
        <span className="font-medium">{node.threads}</span> threads
      </div>
      <a
        href="#"
        className="text-primary font-medium text-xs flex items-center gap-1"
      >
        Take action
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="5"
          height="10"
          viewBox="0 0 5 10"
          fill="none"
        >
          <path
            d="M0.5 1.25L4.25 5L0.5 8.75"
            stroke="#4E47E1"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
