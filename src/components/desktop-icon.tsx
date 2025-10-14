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
    <motion.div
      ref={iconRef}
      className="absolute flex flex-col items-center p-1 rounded-lg cursor-pointer hover:bg-white/20 dark:hover:bg-gray-700/20 transition-colors backdrop-blur-sm"
      style={{
        x: position.x,
        y: position.y,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
    >
      <div className="w-12 h-12 rounded-xl bg-white/30 dark:bg-gray-700/30 flex items-center justify-center mb-1 shadow-md backdrop-blur-lg border border-white/30 dark:border-gray-600/30">
        <IconComponent className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      </div>
      <span className="text-xs text-center text-gray-800 dark:text-gray-200 font-medium max-w-[80px] truncate px-1 rounded bg-white/20 dark:bg-gray-700/20 backdrop-blur-sm">
        {app.title}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;