import React, { useState, useRef, useEffect, cloneElement } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const DropdownCtx = React.createContext(null);

function useDropdownCtx() {
  const ctx = React.useContext(DropdownCtx);
  if (!ctx)
    throw new Error(
      "DropdownMenu components must be used within <DropdownMenu>"
    );
  return ctx;
}

const mergeRefs =
  (...refs) =>
  (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") ref(node);
      else ref.current = node;
    });
  };

export function DropdownMenu({ children, open: openProp, onOpenChange }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = openProp ?? uncontrolledOpen;
  const setOpen = (v) => {
    if (openProp === undefined) setUncontrolledOpen(v);
    onOpenChange?.(v);
  };

  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <DropdownCtx.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      {children}
    </DropdownCtx.Provider>
  );
}

export const DropdownMenuTrigger = React.forwardRef(
  function DropdownMenuTrigger(
    { asChild = false, children, onClick, ...props },
    forwardedRef
  ) {
    const { open, setOpen, triggerRef } = useDropdownCtx();
    const ref = mergeRefs(triggerRef, forwardedRef);

    const handleClick = (e) => {
      onClick?.(e);
      setOpen(!open);
    };

    if (asChild && React.isValidElement(children)) {
      return cloneElement(children, {
        ref,
        "aria-haspopup": "menu",
        "aria-expanded": open,
        onClick: handleClick,
      });
    }

    return (
      <button
        ref={ref}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
export const DropdownMenuContent = React.forwardRef(
  function DropdownMenuContent(
    { align = "start", sideOffset = 4, className, style, children, ...props },
    forwardedRef
  ) {
    const { open, setOpen, triggerRef, contentRef } = useDropdownCtx();
    const [mounted, setMounted] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const ref = mergeRefs(contentRef, forwardedRef);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
      if (!open) return;

      const updatePosition = () => {
        const triggerEl = triggerRef.current;
        const contentEl = contentRef.current;
        if (!triggerEl) return;
        const rect = triggerEl.getBoundingClientRect();
        const contentWidth = contentEl?.offsetWidth || 130;
        let left = rect.left + window.scrollX;
        if (align === "end") {
          left = rect.right - contentWidth + window.scrollX;
        }
        const top = rect.bottom + sideOffset + window.scrollY;
        setCoords({ top, left });
      };

      updatePosition();
      const onResize = () => updatePosition();
      const onScroll = () => updatePosition();
      window.addEventListener("resize", onResize);
      window.addEventListener("scroll", onScroll, true);
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll, true);
      };
    }, [open, align, sideOffset, triggerRef, contentRef]);

    useEffect(() => {
      if (!open) return;
      const onKey = (e) => e.key === "Escape" && setOpen(false);
      const onDown = (e) => {
        const t = e.target;
        if (contentRef.current?.contains(t) || triggerRef.current?.contains(t))
          return;
        setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onDown);
      return () => {
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("mousedown", onDown);
      };
    }, [open, setOpen, contentRef, triggerRef]);

    if (!mounted || !open) return null;

    const panel = (
      <div
        ref={ref}
        role="menu"
        style={{
          position: "absolute",
          top: coords.top,
          left: coords.left,
          ...style,
        }}
        className={cn("options-menu", className)}
        {...props}
      >
        {children}
      </div>
    );

    return createPortal(panel, document.body);
  }
);

export const DropdownMenuItem = React.forwardRef(function DropdownMenuItem(
  { className, onClick, children, ...props },
  ref
) {
  const { setOpen } = useDropdownCtx();
  const handleClick = (e) => {
    onClick?.(e);
    setOpen(false);
  };
  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      className={cn("options-item cursor-pointer", className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const DropdownMenuLabel = React.forwardRef(function DropdownMenuLabel(
  { className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn("options-label", className)} {...props}>
      {children}
    </div>
  );
});

// No-op shims for API compatibility where needed elsewhere in the app
export const DropdownMenuGroup = ({ children }) => <div>{children}</div>;
export const DropdownMenuPortal = ({ children }) => <>{children}</>;
export const DropdownMenuSub = ({ children }) => <div>{children}</div>;
export const DropdownMenuSubTrigger = React.forwardRef(
  function DropdownMenuSubTrigger(props, ref) {
    return <button ref={ref} {...props} />;
  }
);
export const DropdownMenuSubContent = React.forwardRef(
  function DropdownMenuSubContent(props, ref) {
    return <div ref={ref} {...props} />;
  }
);
export const DropdownMenuRadioGroup = ({ children }) => <div>{children}</div>;
export const DropdownMenuCheckboxItem = React.forwardRef(
  function DropdownMenuCheckboxItem(props, ref) {
    return <div ref={ref} {...props} />;
  }
);
export const DropdownMenuRadioItem = React.forwardRef(
  function DropdownMenuRadioItem(props, ref) {
    return <div ref={ref} {...props} />;
  }
);
export const DropdownMenuShortcut = ({ className, ...props }) => (
  <span
    className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
    {...props}
  />
);
