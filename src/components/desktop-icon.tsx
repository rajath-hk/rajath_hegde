'use client';

import React, { useState, useRef } from 'react';
import type { AppConfig } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  app: AppConfig;
}

const DesktopIcon = ({ app }: DesktopIconProps) => {
  const { openWindow } = useWindows();
  const [isDoubleClick, setIsDoubleClick] = React.useState(false);
  const [position, setPosition] = useState({ x: app.x || 0, y: app.y || 0 });
  const [isDragging, setIsDragging] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isDoubleClick) {
      // Single click - focus or prepare for double click
      setIsDoubleClick(true);
      setTimeout(() => setIsDoubleClick(false), 300);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDoubleClick(false);
    openWindow(app);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    setIsDragging(true);
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // In a full implementation, you would update the icon position in context here
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const IconComponent = app.icon;

  return (
    <div
      ref={iconRef}
      className={cn(
        "flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all duration-200 group relative select-none touch-manipulation",
        "hover:bg-black/10 dark:hover:bg-white/10",
        "active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isDragging && "opacity-50"
      )}
      style={{ 
        position: 'absolute',
        left: position?.x || 0, 
        top: position?.y || 0,
        touchAction: 'none'
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onContextMenu={handleRightClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      aria-label={`${app.title} icon`}
    >
      <div className="bg-card border border-border rounded-lg p-3 shadow-sm w-12 h-12 flex items-center justify-center mb-1 touch-manipulation">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span 
        className={cn(
          "text-xs text-center px-1 py-0.5 rounded max-w-[100px] touch-manipulation",
          "group-hover:bg-black/10 dark:group-hover:bg-white/10 truncate"
        )}
      >
        {app.title}
      </span>
      
      {isSelected && (
        <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none" />
      )}
    </div>
  );
};

export default DesktopIcon;