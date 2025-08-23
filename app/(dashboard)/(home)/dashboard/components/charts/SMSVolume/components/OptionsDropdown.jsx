"use client";
import { useState, useEffect, useRef } from "react";

export default function OptionsDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="options-dropdown" ref={dropdownRef}>
      {/* 3-dots trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="options-trigger text-default-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <g clip-path="url(#clip0_621_439)">
            <path
              d="M8 9.25C8.41421 9.25 8.75 8.91421 8.75 8.5C8.75 8.08579 8.41421 7.75 8 7.75C7.58579 7.75 7.25 8.08579 7.25 8.5C7.25 8.91421 7.58579 9.25 8 9.25Z"
              fill="currentColor"
            />
            <path
              d="M8 5C8.41421 5 8.75 4.66421 8.75 4.25C8.75 3.83579 8.41421 3.5 8 3.5C7.58579 3.5 7.25 3.83579 7.25 4.25C7.25 4.66421 7.58579 5 8 5Z"
              fill="currentColor"
            />
            <path
              d="M8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75C8.75 12.3358 8.41421 12 8 12C7.58579 12 7.25 12.3358 7.25 12.75C7.25 13.1642 7.58579 13.5 8 13.5Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_621_439">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="options-menu">
          {/* Resize */}
          <button className="options-item options-item-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M10.5 4.50012V1.50012H7.5"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.5 7.50012V10.5001H4.5"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 1.50012L6.75 5.25012"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.25 6.75012L1.5 10.5001"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
            <span>Resize</span>
          </button>

          <button className="options-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M5.49951 8.50098L6.49951 7.50098L5.49951 6.50098L6.49951 7.50098H3.49951"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.0005 4.99902V7.49902C11.0005 9.99902 10.0005 10.999 7.50049 10.999H4.50049C2.00049 10.999 1.00049 9.99902 1.00049 7.49902V4.49902C1.00049 1.99902 2.00049 0.999023 4.50049 0.999023H7.00049"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.0005 4.99902H9.00049C7.50049 4.99902 7.00049 4.49902 7.00049 2.99902V0.999023L11.0005 4.99902Z"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
            <span>Export</span>
          </button>

          <button className="options-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1.5 4.55505V7.44005C1.5 8.50005 1.5 8.50005 2.5 9.17505L5.25 10.7651C5.665 11.0051 6.34 11.0051 6.75 10.7651L9.5 9.17505C10.5 8.50005 10.5 8.50005 10.5 7.44505V4.55505C10.5 3.50005 10.5 3.50005 9.5 2.82505L6.75 1.23505C6.34 0.995054 5.665 0.995054 5.25 1.23505L2.5 2.82505C1.5 3.50005 1.5 3.50005 1.5 4.55505Z"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
            <span>Settings</span>
          </button>

          <button className="options-item">
            <div className="options-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M11 6C11 8.76 8.76 11 6 11C3.24 11 1.555 8.22 1.555 8.22M1.555 8.22H3.815M1.555 8.22V10.72M1 6C1 3.24 3.22 1 6 1C9.335 1 11 3.78 11 3.78M11 3.78V1.28M11 3.78H8.78"
                  stroke="currentColor"
                  stroke-width="0.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span>Refresh</span>
          </button>
        </div>
      )}
    </div>
  );
}
