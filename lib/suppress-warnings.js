// Suppress React 19 ref warnings during migration period
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  const isReact19RefWarning = (message) => {
    if (typeof message !== 'string') return false;
    return (
      message.includes('Accessing element.ref was removed in React 19') ||
      message.includes('ref is now a regular prop') ||
      message.includes('It will be removed from the JSX Element type') ||
      message.includes('element.ref was removed') ||
      message.includes('Warning: A component is') && message.includes('ref') ||
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

  // Also override console.log in case warnings come through there
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    const message = args[0];
    if (isReact19RefWarning(message)) {
      // Suppress React 19 ref warnings
      return;
    }
    originalConsoleLog.apply(console, args);
  };

  // Override the global error handler as well
  window.addEventListener('error', (event) => {
    if (isReact19RefWarning(event.message)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });
}

export {};
