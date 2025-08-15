'use client';

import { useEffect } from 'react';

// Client-side component to suppress React 19 ref warnings
export default function WarningSuppressor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    const isReact19RefWarning = (message) => {
      if (typeof message !== 'string') return false;
      return (
        message.includes('Accessing element.ref was removed in React 19') ||
        message.includes('ref is now a regular prop') ||
        message.includes('It will be removed from the JSX Element type') ||
        message.includes('element.ref was removed') ||
        (message.includes('Warning: A component is') && message.includes('ref')) ||
        message.includes('forwardRef render function')
      );
    };
    
    console.error = (...args) => {
      const message = args[0];
      if (isReact19RefWarning(message)) {
        // Suppress React 19 ref warnings
        return;
      }
      originalConsoleError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args[0];
      if (isReact19RefWarning(message)) {
        // Suppress React 19 ref warnings
        return;
      }
      originalConsoleWarn.apply(console, args);
    };

    // Cleanup function to restore original console methods
    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
    };
  }, []);

  return null; // This component renders nothing
}
