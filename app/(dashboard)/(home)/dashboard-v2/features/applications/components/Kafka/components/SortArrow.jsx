// components/SortArrow.jsx
// Small, reusable sort arrow indicator used in table headers.

export default function SortArrow({ dir = "asc", active = false, className = "" }) {
  const rotateClass = active ? (dir === "asc" ? "rotate-0" : "rotate-180") : "rotate-0";
  return (
    <div
      aria-hidden
      className={`ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full transition-transform duration-200 hover:bg-[#DADAFA] hover:text-primary ${
        active ? "text-default-900" : "text-muted-foreground opacity-60"
      } ${rotateClass} ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 1.875V10.125M2.625 6.75L6 10.125L9.375 6.75"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

