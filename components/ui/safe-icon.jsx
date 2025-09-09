import React from 'react';
import { Icon } from '@iconify/react';

// Safe icon renderer that handles iconify names, React components, and imported SVG assets
const SafeIcon = ({ icon: IconComponent, className, fallbackIcon = 'heroicons:cube' }) => {
  // String: assume iconify icon name
  if (typeof IconComponent === 'string') {
    return <Icon icon={IconComponent} className={className} />;
  }

  // React component: render directly
  if (typeof IconComponent === 'function') {
    try {
      return <IconComponent className={className} />;
    } catch (error) {
      console.warn('Error rendering icon component:', error);
      return <Icon icon={fallbackIcon} className={className} />;
    }
  }

  // Module-wrapped React component (ESM/CJS default)
  if (
    typeof IconComponent === 'object' &&
    IconComponent !== null &&
    typeof IconComponent.default === 'function'
  ) {
    const Cmp = IconComponent.default;
    try {
      return <Cmp className={className} />;
    } catch (error) {
      console.warn('Error rendering default-exported icon component:', error);
      return <Icon icon={fallbackIcon} className={className} />;
    }
  }

  // Next.js SVG/image asset import: object with src string
  if (
    typeof IconComponent === 'object' &&
    IconComponent !== null &&
    typeof IconComponent.src === 'string'
  ) {
    // Render as img to avoid React prop warnings and keep sizing via className
    return <img src={IconComponent.src} alt="" aria-hidden="true" className={className} />;
  }

  // Other objects (unknown shapes): fall back
  if (typeof IconComponent === 'object' && IconComponent !== null) {
    console.warn('Detected problematic SVG import, using fallback icon');
    return <Icon icon={fallbackIcon} className={className} />;
  }

  // Null/undefined or anything else: fallback
  return <Icon icon={fallbackIcon} className={className} />;
};

export default SafeIcon;
