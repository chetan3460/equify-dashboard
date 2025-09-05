// lib/table.js
// Centralized constants for table behavior and styling.
//
// ROW_SCROLL_THRESHOLD controls when vertical scrolling is enabled
// in our tables (so headers can stick). Adjusting this in one place
// changes the behavior for all tables that consume it.
//
// STICKY_HEADER_CLASS and STICKY_HEADER_CELL_CLASS ensure sticky header
// background and z-index are consistent across modules.

export const ROW_SCROLL_THRESHOLD = 6; // show scrollbar when more than 6 rows
export const STICKY_HEADER_CLASS = "sticky top-0 z-10 !bg-[#DADAFA]";
export const STICKY_HEADER_CELL_CLASS = "cursor-pointer sticky top-0 z-10 bg-[#DADAFA]";

