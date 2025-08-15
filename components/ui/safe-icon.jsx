import React from 'react';
import { Icon } from '@iconify/react';

// Safe icon renderer that handles both SVG imports and iconify icons
const SafeIcon = ({ icon: IconComponent, className, fallbackIcon = 'heroicons:cube' }) => {
  // If IconComponent is a string (iconify icon), render it directly
  if (typeof IconComponent === 'string') {
    return <Icon icon={IconComponent} className={className} />;
  }
  
  // If IconComponent is a valid React component, try to render it
  if (typeof IconComponent === 'function') {
    try {
      return <IconComponent className={className} />;
    } catch (error) {
      console.warn('Error rendering icon component:', error);
      return <Icon icon={fallbackIcon} className={className} />;
    }
  }
  
  // If IconComponent is an object (problematic SVG import), use fallback
  if (typeof IconComponent === 'object' && IconComponent !== null) {
    console.warn('Detected problematic SVG import, using fallback icon');
    return <Icon icon={fallbackIcon} className={className} />;
  }
  
  // If IconComponent is null/undefined, use fallback
  if (!IconComponent) {
    return <Icon icon={fallbackIcon} className={className} />;
  }
  
  // Fallback for any other cases
  return <Icon icon={fallbackIcon} className={className} />;
};

export default SafeIcon;
