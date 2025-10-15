'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { X, Minus, Square, Maximize, Minimize } from 'lucide-react';
import { motion } from 'framer-motion';

type WindowProps = WindowInstance;

const Window = (props: WindowProps) => {
  const {
    id, title, content, x, y, width, height, zIndex, isFocused, isMaximized
  } = props;
  
  const {
    closeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    toggleMaximize,
    toggleMinimize,
  } = useWindows();

  const [size, setSize] = useState({ width, height });
  const [position, setPosition] = useState({ x, y });
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust window size and position for mobile
  useEffect(() => { 
    if (isMobile) {
      // On mobile, make windows take up most of the screen
      setSize({ 
        width: Math.min(window.innerWidth - 20, 600), 
        height: Math.min(window.innerHeight - 100, 700) 
      });
      setPosition({ 
        x: Math.max(0, (window.innerWidth - Math.min(window.innerWidth - 20, 600)) / 2),
        y: 60 
      });
    } else {
      setSize({ width, height }); 
      setPosition({ x, y });
    }
  }, [width, height, x, y, isMobile]);

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    focusWindow(id);
    setIsResizing(true);
  };
  
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    toggleMaximize(id);
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
      focusWindow(id);
      setIsDragging(true);
    }
  };

  // Handle mouse events for desktop dragging and resizing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      if (!windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const newWidth = Math.max(300, e.clientX - rect.left);
      const newHeight = Math.max(200, e.clientY - rect.top);
      setSize({ 
        width: newWidth, 
        height: newHeight 
      });
    }
    
    if (isDragging) {
      setPosition(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  }, [isResizing, isDragging]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      updateWindowSize(id, size.width, size.height);
    }
    
    if (isDragging) {
      setIsDragging(false);
      updateWindowPosition(id, position.x, position.y);
    }
  }, [isResizing, isDragging, id, size, position, updateWindowSize, updateWindowPosition]);

  // Handle touch events for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    focusWindow(id);
    setIsDragging(true);
    
    const touch = e.touches[0];
    const windowRect = windowRef.current?.getBoundingClientRect();
    if (!windowRect) return;
    
    const offsetX = touch.clientX - windowRect.left;
    const offsetY = touch.clientY - windowRect.top;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (!isDragging || !windowRef.current) return;
      
      const moveTouch = moveEvent.touches[0];
      const newX = moveTouch.clientX - offsetX;
      const newY = moveTouch.clientY - offsetY;
      
      // Keep window within bounds
      const boundedX = Math.max(0, Math.min(newX, window.innerWidth - windowRect.width));
      const boundedY = Math.max(0, Math.min(newY, window.innerHeight - windowRect.height));
      
      setPosition({ x: boundedX, y: boundedY });
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      updateWindowPosition(id, position.x, position.y);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
  };

  // Add or remove event listeners based on mouse and touch activity
  useEffect(() => {
    if (isResizing || isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isDragging, handleMouseMove, handleMouseUp]);


  return (
    <motion.div
      ref={windowRef}
      className={cn(
        "absolute bg-white/20 dark:bg-gray-700/20 backdrop-blur-lg border border-white/30 dark:border-gray-600/30 rounded-lg flex flex-col shadow-xl",
        isFocused ? "ring-2 ring-gray-500/30" : ""
      )}
      style={{
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
        zIndex,
      }}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      style={{ cursor: isMaximized ? 'default' : 'grab', WebkitAppRegion: 'drag' }}
    >
      <header
        ref={headerRef}
        className={cn(
          "flex items-center justify-center relative px-4 h-8 flex-shrink-0 rounded-t-lg",
          isFocused 
            ? "bg-gray-500/80 dark:bg-gray-600/80" 
            : "bg-gray-300/50 dark:bg-gray-700/50"
        )}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: isMaximized ? 'default' : 'grab', WebkitAppRegion: 'drag' }}
      >
        {/* Ubuntu-style traffic lights */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              closeWindow(id);
            }} 
            className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center group/btn hover:bg-red-600 transition-colors"
            aria-label="Close"
            style={{ WebkitAppRegion: 'no-drag' }}
          >
          </button>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              toggleMinimize(id);
            }} 
            className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center group/btn hover:bg-yellow-600 transition-colors"
            aria-label="Minimize"
            style={{ WebkitAppRegion: 'no-drag' }}
          >
          </button>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              toggleMaximize(id);
            }} 
            className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center group/btn hover:bg-green-600 transition-colors"
            aria-label="Maximize"
            style={{ WebkitAppRegion: 'no-drag' }}
          >
          </button>
        </div>
        <span className={cn(
            "font-medium text-sm truncate max-w-md",
            isFocused ? "text-white" : "text-gray-800 dark:text-gray-200"
          )}>
          {title}
        </span>
      </header>
      <div className="flex-1 rounded-b-lg overflow-hidden">
        <div className="w-full h-full overflow-auto">
          {content}
        </div>
      </div>
      <div
        className={cn(
          "absolute bottom-0 right-0 w-5 h-5 cursor-se-resize flex items-end justify-end p-1",
          isMaximized && "hidden"
        )}
        onMouseDown={handleResizeStart}
        style={{ WebkitAppRegion: 'no-drag' }}
      >
        <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-gray-600 dark:border-gray-400"></div>
      </div>
    </motion.div>
  );
};

export default Window;