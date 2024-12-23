import React, { ReactNode } from 'react';

interface GridProps {
  templateColumns?: string;
  gap?: number;
  children: ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ templateColumns = "grid-cols-3", gap = 4, children, className }) => {
  return (
    <div
      className={`grid ${templateColumns} ${gap ? `gap-${gap}` : 'gap-4'} ${className ? className : ''} justify-items-center items-center`}
    >
      {children}
    </div>
  );
};

export default Grid;
