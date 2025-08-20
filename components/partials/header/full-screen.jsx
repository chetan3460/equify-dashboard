"use client";
import { useId } from "react";

const Expand = ({ className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M5.333 2H3.333C2.98 2 2.64 2.14 2.391 2.391C2.14 2.641 2 2.98 2 3.333V5.333M14 5.333V3.333C14 2.98 13.859 2.641 13.609 2.391C13.359 2.14 13.02 2 12.667 2H10.667M10.667 14H12.667C13.02 14 13.359 13.859 13.609 13.609C13.859 13.359 14 13.02 14 12.667V10.667M2 10.667V12.667C2 13.02 2.14 13.359 2.391 13.609C2.641 13.859 2.98 14 3.333 14H5.333"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function FullScreenToggle() {
  const tooltipId = useId();

  const toggleFullScreen = () => {
    const doc = document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;

    const cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    const isFull =
      doc.fullscreenElement ||
      doc.mozFullScreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement;

    if (!isFull) requestFullScreen?.call(docEl);
    else cancelFullScreen?.call(doc);
  };

  return (
    <div className="relative inline-block group">
      {/* Button */}
      <button
        type="button"
        onClick={toggleFullScreen}
        aria-describedby={tooltipId}
        className="relative h-6 w-6 rounded-full flex items-center justify-center
                   text-[#595B61] hover:text-primary
                   hover:bg-primary-100 dark:bg-transparent  dark:text-darkGray
                   
                   transition-colors duration-200"
      >
        <Expand className="h-4 w-4" />
      </button>
    </div>
  );
}

export default FullScreenToggle;
