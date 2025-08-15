'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function BodyClassHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    
    if (pathname === '/') {
      // For home page - remove theme-custom class and custom styles
      body.className = cn('dash-tail-app', body.className.replace(/theme-custom/g, '').trim());
      body.style.removeProperty('--radius');
    } else {
      // For other pages - add theme-custom class and styles
      body.className = cn('dash-tail-app theme-custom', body.className);
      body.style.setProperty('--radius', '1.25rem');
    }
  }, [pathname]);

  return null;
}
