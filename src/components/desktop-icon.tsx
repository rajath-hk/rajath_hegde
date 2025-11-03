'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindows } from '@/contexts/window-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { AppConfig } from '@/types';

interface DesktopIconProps {
  app: AppConfig;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ app }) => {
  const { openWindow, updateIconPosition } = useWindows();
  const [isDragging, setIsDragging] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ 
    x: app.x ?? 0, 
    y: app.y ?? 0 
  });
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Update position when app position changes
    setPosition({ 
      x: app.x ?? 0, 
      y: app.y ?? 0 
    });
  }, [app.x, app.y]);

  const handleDragStart = () => {
    if (isMobile || !isClient) return; // Disable drag on mobile or server
    setIsDragging(true);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    if (isMobile || !isClient) return; // Disable drag on mobile or server
    setIsDragging(false);
    
    // Update position with drag offset
    const newX = position.x + info.offset.x;
    const newY = position.y + info.offset.y;
    
    // Keep icon within screen bounds
    if (typeof window !== 'undefined') {
      const boundedX = Math.max(0, Math.min(newX, window.innerWidth - 80));
      const boundedY = Math.max(0, Math.min(newY, window.innerHeight - 80));
      
      setPosition({ x: boundedX, y: boundedY });
      updateIconPosition(app.id, boundedX, boundedY);
    }
  };

  const handleClick = () => {
    if (!isClient) return;
    
    // Handle double-click on desktop, single-click on mobile
    const requiredClicks = isMobile ? 1 : 2;
    
    setClickCount(prev => prev + 1);
    
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    
    if (clickCount + 1 >= requiredClicks) {
      // Open window
      openWindow(app);
      setClickCount(0);
    } else {
      // Reset click count after 300ms
      clickTimeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 300);
    }
  };

  // Don't render on server to prevent hydration issues
  if (!isClient) {
    return null;
  }

  const IconComponent = app.icon;

  return (
    <motion.div
      ref={iconRef}
      className={cn(
        "absolute flex flex-col items-center justify-center w-16 cursor-pointer group select-none outline-none",
        isDragging ? "cursor-grabbing z-50" : "cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
      style={{
        x: position.x,
        y: position.y,
      }}
      drag={!isMobile} // Disable drag on mobile
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={{ 
        scale: 1.1,
        zIndex: 1000
      }}
      whileHover={{ 
        scale: isMobile ? 1 : 1.05 
      }}
      whileTap={{ 
        scale: 0.95 
      }}
      transition={{ 
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 300, damping: 30 }
      }}
      onClick={handleClick}
      aria-label={`${app.title} application`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="bg-background/80 backdrop-blur-xl p-3 rounded-xl border shadow-lg group-hover:shadow-xl transition-all duration-200 group-focus:shadow-xl">
        {IconComponent && <IconComponent className="w-8 h-8" />}
      </div>
      <span className="mt-1 text-xs text-center text-foreground bg-background/80 backdrop-blur-sm px-1 py-0.5 rounded truncate w-full">
        {app.title}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;