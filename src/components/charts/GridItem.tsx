import React, { ReactNode } from 'react';

interface GridItemProps {
  title?: string;
  bgColor?: string;
  children: ReactNode;
  size?: string;
  isFlexCol?: boolean;
  hasSpacing?: boolean;
  hasShadow?: boolean;
}

const GridItem: React.FC<GridItemProps> = ({ title, children, bgColor, size, isFlexCol, hasSpacing,hasShadow}) => {
  return (
    <div className={`flex items-center p-4 border rounded-xl
      ${hasShadow ? "shadow-md" : ""}
      ${hasSpacing ? "space-x-10" : ""}
      ${isFlexCol ? "flex-col" : "flex-row"}
      ${bgColor ? bgColor : "bg-indigo-100"}
      ${size? size : "h-[450px] w-[800px]"}`}>
      <h3 className="text-2xl font-semibold text-indigo">{title}</h3>
      {children}
    </div>
  );
};

export default GridItem;