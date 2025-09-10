"use client";
import { useState, useEffect, useRef } from "react";

const DashboardSelect = ({ value = "Today", onChange, options = ["Today", "This week", "This month"] }) => {
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[124px]" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-3 py-2 text-xs font-normal 
                   bg-white dark:bg-[#323E4E] 
                   border border-[#E5E5E5] dark:border-[#5C5C5C] 
                   rounded-[4px]  
                   text-default-900"
      >
        {value}
        {/* Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="5"
          viewBox="0 0 7 5"
          fill="currentColor"
          className={`ml-2 transition-transform duration-200 
                      text-default-900 
                      ${open ? "rotate-180" : "rotate-0"}`}
        >
          <path d="M0 0.5L3.5 4.5L7 0.5H0Z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className="absolute left-0 mt-1 w-full rounded-[4px] 
                     bg-white dark:bg-[#323E4E] 
                     border border-[#E5E5E5] dark:border-[#5C5C5C] 
                     shadow-[4px_2px_16px_rgba(0,0,0,0.12)] 
                     z-10"
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange?.(option);
                setOpen(false);
              }}
              className="cursor-pointer px-3 py-2 text-sm 
                         text-default-900 
                         hover:bg-gray-100 dark:hover:bg-[#444]"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardSelect;

