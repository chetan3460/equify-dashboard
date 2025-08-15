// Early script to suppress React 19 warnings before React loads
(function() {
  if (typeof window === 'undefined') return;

  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  const isReact19RefWarning = function(message) {
    if (typeof message !== 'string') return false;
    return (
      message.indexOf('Accessing element.ref was removed in React 19') !== -1 ||
      message.indexOf('ref is now a regular prop') !== -1 ||
      message.indexOf('It will be removed from the JSX Element type') !== -1 ||
      message.indexOf('element.ref was removed') !== -1 ||
      (message.indexOf('Warning: A component is') !== -1 && message.indexOf('ref') !== -1) ||
      message.indexOf('forwardRef render function') !== -1
    );
  };
  
  console.error = function() {
    const args = Array.prototype.slice.call(arguments);
    const message = args[0];
    if (isReact19RefWarning(message)) {
      // Suppress React 19 ref warnings
      return;
    }
    originalConsoleError.apply(console, args);
  };

  console.warn = function() {
    const args = Array.prototype.slice.call(arguments);
    const message = args[0];
    if (isReact19RefWarning(message)) {
      // Suppress React 19 ref warnings
      return;
    }
    originalConsoleWarn.apply(console, args);
  };

  // Override error event handler
  window.addEventListener('error', function(event) {
    if (isReact19RefWarning(event.message)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });

  console.log('React 19 warning suppression loaded');
})();
