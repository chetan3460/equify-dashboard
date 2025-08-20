"use client";

import { useState, useRef, useEffect } from "react";
import notificationsData from "./notification-data";

/* Bell icon follows text color via currentColor */
const Bell = ({ className = "", hasNotification }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8.012 1.94C5.806 1.94 4.012 3.733 4.012 5.94v1.927c0 .406-.173 1.026-.38 1.373l-.767 1.273c-.473.786-.146 1.659.72 1.953 2.873.96 5.973.96 8.846 0 .807-.267 1.16-1.22.72-1.953l-.767-1.273c-.2-.347-.373-.967-.373-1.373V5.94c0-2.2-1.8-4-4-4Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.244 2.133A2.8 2.8 0 0 0 6.777 2.133C6.97 1.64 7.45 1.293 8.01 1.293c.56 0 1.04.347 1.233.84Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.01 12.706c0 1.1-.9 2-2 2a2 2 0 0 1-2-2"
      stroke="currentColor"
    />
    {hasNotification && <circle cx="11.43" cy="3.43" r="2.29" fill="#E14761" />}
  </svg>
);

export default function NotificationMessage() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notificationsData);
  const ref = useRef(null);

  const hasUnread = items.some((n) => n.unread);

  useEffect(() => {
    const onOutside = (e) =>
      ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, []);

  const removeNotification = (id) =>
    setItems((prev) => prev.filter((n) => n.id !== id));

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`relative h-6 w-6 rounded-full flex items-center justify-center transition
          ${
            open
              ? "bg-primary-50 dark:bg-default-200 text-primary dark:bg-transparent  dark:text-darkGray"
              : "text-[#595B61] hover:text-primary hover:bg-primary-50 dark:text-[#ADADAD]  dark:hover:bg-[#1F2937]"
          }`}
      >
        <Bell className="h-4 w-4" hasNotification={hasUnread} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-96 max-h-[350px] bg-white rounded-[20px] shadow-[0_2px_40px_0_rgba(0,0,0,0.17)] overflow-hidden z-50">
          <div className="p-4 pb-2">
            <span className="text-base font-semibold">Notification</span>
          </div>

          {/* Scroll area */}
          <div
            className="px-4 overflow-y-auto max-h-[300px]
              [scrollbar-width:thin] [scrollbar-color:#D1D2DA_transparent]
              [&::-webkit-scrollbar]:w-[3px]
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-[#D1D2DA]
              [&::-webkit-scrollbar-thumb]:rounded-[100px]
              [&::-webkit-scrollbar-thumb]:min-h-[15px]"
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`flex justify-between items-start gap-2 py-4 border-b border-[rgba(32,69,164,0.2)]
                  ${i === 0 ? "border-t" : ""} last:border-b-0`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-dark dark:text-gray-100 truncate">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-primary font-semibold dark:text-dark truncate max-w-[220px]">
                    {item.action}{" "}
                    <span aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="5"
                        height="8"
                        viewBox="0 0 5 8"
                        fill="none"
                      >
                        <path
                          d="M1 0.5L4.50001 3.99999L1 7.5"
                          stroke="#4E47E1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Close button: default #595B61, hover red */}
                <button
                  onClick={() => removeNotification(item.id)}
                  className="shrink-0 text-[#595B61] hover:text-red-500 transition-colors"
                  aria-label="Dismiss notification"
                  title="Dismiss"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="currentColor" /* icon follows parent text color */
                  >
                    <path d="M0.884 7.105L3.915 4.074 0.884 1.042 1.894 0.032 4.926 3.063 7.957 0.032 8.968 1.042 5.936 4.074 8.968 7.105 7.957 8.116 4.926 5.084 1.894 8.116 0.884 7.105Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
