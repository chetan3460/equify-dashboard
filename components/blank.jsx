import React from 'react';
import { cn } from '@/lib/utils';

const Blank = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      {children}
    </div>
  );
};

export default Blank;
