"use client";

import * as React from "react";
import { useTheme } from "next-themes";

// Inline SVGs use currentColor so text-* classes control color
const Sun = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clip-path="url(#clip0_376_5141)">
      <path
        d="M8 14V15.3333"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.2402 12.24L13.1869 13.1867"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.81445 13.1867L3.76112 12.24"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 8H15.3333"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M0.666016 8H1.99935"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.99935 11.3333C9.8403 11.3333 11.3327 9.84095 11.3327 8C11.3327 6.15905 9.8403 4.66667 7.99935 4.66667C6.1584 4.66667 4.66602 6.15905 4.66602 8C4.66602 9.84095 6.1584 11.3333 7.99935 11.3333Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.2402 3.76L13.1869 2.81333"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.81445 2.81333L3.76112 3.76"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 0.666666V2"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_376_5141">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Moon = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M1.35209 8.27997C1.59209 11.7133 4.50542 14.5066 7.99209 14.66C10.4521 14.7666 12.6521 13.62 13.9721 11.8133C14.5188 11.0733 14.2254 10.58 13.3121 10.7466C12.8654 10.8266 12.4054 10.86 11.9254 10.84C8.66542 10.7066 5.99876 7.97997 5.98542 4.75997C5.97876 3.89331 6.15876 3.07331 6.48542 2.32664C6.84542 1.49997 6.41209 1.10664 5.57876 1.45997C2.93876 2.57331 1.13209 5.23331 1.35209 8.27997Z"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function ThemeButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch with next-themes
  React.useEffect(() => setMounted(true), []);
  if (!mounted) {
    // Skeleton button placeholder
    return (
      <button
        type="button"
        className="relative md:h-9 md:w-9 h-8 w-8 rounded-full bg-transparent"
        aria-label="Toggle theme"
        disabled
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative w-6 h-6 rounded-full
                 flex items-center justify-center
                 text-lightGray hover:text-primary hover:bg-primary-100  dark:bg-transparent  dark:text-darkGray
                 transition-colors"
    >
      {/* Sun shows in light, Moon in dark, with smooth swap */}
      <Sun className="h-4 w-4 rotate-0   scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0  transition-all duration-300 dark:rotate-0  dark:scale-100 dark:text-[#ADADAD]  dark:hover:bg-[#1F2937]" />
    </button>
  );
}
