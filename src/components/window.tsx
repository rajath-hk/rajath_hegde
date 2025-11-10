'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { X, Minus, Square, Minimize } from 'lucide-react';
import { motion } from 'framer-motion';

type WindowProps = WindowInstance;

const Window = (props: WindowProps) => {
  const {
    id, title, content, x, y, width, height, zIndex, isFocused, isMaximized, isMinimized
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
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
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
      // On mobile, make windows take up most of the screen with proper margins
      const newWidth = Math.min(window.innerWidth - 20, 600);
      const newHeight = Math.min(window.innerHeight - 100, 700);
      
      setSize({ width: newWidth, height: newHeight });
      setPosition({ 
        x: Math.max(0, (window.innerWidth - newWidth) / 2),
        y: 60 
      });
    } else {
      setSize({ width, height }); 
      setPosition({ x, y });
    }
  }, [width, height, x, y, isMobile]);

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    focusWindow(id);
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    focusWindow(id);
    
    // Handle touch events for mobile
    if ('touches' in e) {
      setIsDragging(true);
      const touch = e.touches[0];
      const windowRect = windowRef.current?.getBoundingClientRect();
      if (!windowRect) return;
      
      const offsetX = touch.clientX - windowRect.left;
      const offsetY = touch.clientY - windowRect.top;
      
      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (!windowRef.current) return;
        
        const moveTouch = moveEvent.touches[0];
        const newX = moveTouch.clientX - offsetX;
        const newY = moveTouch.clientY - offsetY;
        
        // Keep window within bounds
        const boundedX = Math.max(0, Math.min(newX, window.innerWidth - windowRect.width));
        const boundedY = Math.max(0, Math.min(newY, window.innerHeight - windowRect.height));
        
        setPosition({ x: boundedX, y: boundedY });
      };
      
      const handleTouchEnd = () => {
        updateWindowPosition(id, position.x, position.y);
        setIsDragging(false);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
      
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      // Handle mouse events for desktop
      if (headerRef.current && headerRef.current.contains(e.target as Node)) {
        setIsDragging(true);
      }
    }
  };
  
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    toggleMaximize(id);
  };

  // Handle mouse events for desktop dragging and resizing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      if (!windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const minWidth = 300;
      const minHeight = 200;
      
      let newWidth = size.width;
      let newHeight = size.height;
      let newX = position.x;
      let newY = position.y;
      
      if (resizeDirection?.includes('e')) {
        newWidth = Math.max(minWidth, e.clientX - rect.left);
      }
      
      if (resizeDirection?.includes('s')) {
        newHeight = Math.max(minHeight, e.clientY - rect.top);
      }
      
      if (resizeDirection?.includes('w')) {
        const widthChange = rect.left - e.clientX;
        if (size.width + widthChange > minWidth) {
          newWidth = size.width + widthChange;
          newX = position.x - widthChange;
        }
      }
      
      if (resizeDirection?.includes('n')) {
        const heightChange = rect.top - e.clientY;
        if (size.height + heightChange > minHeight) {
          newHeight = size.height + heightChange;
          newY = position.y - heightChange;
        }
      }
      
      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    } else if (isDragging) {
      const newX = e.clientX - (windowRef.current?.offsetWidth || 0) / 2;
      const newY = e.clientY - 20;
      
      // Boundary checks
      const boundedX = Math.max(0, Math.min(newX, window.innerWidth - (windowRef.current?.offsetWidth || 0)));
      const boundedY = Math.max(0, Math.min(newY, window.innerHeight - (windowRef.current?.offsetHeight || 0)));
      
      setPosition({ x: boundedX, y: boundedY });
    }
  }, [isResizing, resizeDirection, isDragging, size, position]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      setResizeDirection(null);
      updateWindowSize(id, size.width, size.height);
      updateWindowPosition(id, position.x, position.y);
    } else if (isDragging) {
      setIsDragging(false);
      updateWindowPosition(id, position.x, position.y);
    }
  }, [isResizing, isDragging, id, size, position, updateWindowSize, updateWindowPosition]);

  useEffect(() => {
    if (isResizing || isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, isDragging, handleMouseMove, handleMouseUp]);

  // Handle window maximization for mobile
  useEffect(() => {
    if (isMobile && isMaximized) {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - 40 // Leave space for taskbar
      });
      setPosition({ x: 0, y: 0 });
    } else if (isMobile && !isMaximized) {
      // Reset to mobile-friendly size when unmaximizing
      const newWidth = Math.min(window.innerWidth - 20, 600);
      const newHeight = Math.min(window.innerHeight - 100, 700);
      
      setSize({ width: newWidth, height: newHeight });
      setPosition({ 
        x: Math.max(0, (window.innerWidth - newWidth) / 2),
        y: 60 
      });
    } else if (!isMobile && isMaximized) {
      // Desktop maximization logic
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - 40 // Leave space for taskbar
      });
      setPosition({ x: 0, y: 0 });
    } else if (!isMobile && !isMaximized) {
      // Reset to original size when unmaximizing on desktop
      setSize({ width, height });
      setPosition({ x, y });
    }
  }, [isMaximized, isMobile, width, height, x, y]);

  if (isMinimized) {
    return null;
  }

  return (
    <motion.div
      ref={windowRef}
      className={cn(
        "fixed bg-background border rounded-lg shadow-2xl overflow-hidden flex flex-col",
        isFocused ? "border-blue-500 shadow-lg" : "border-gray-300 dark:border-gray-600"
      )}
      style={{
        width: size.width,
        height: size.height,
        zIndex,
        left: position.x,
        top: position.y,
      }}
      onMouseDown={() => focusWindow(id)}
      onTouchStart={(e) => {
        focusWindow(id);
        handleDragStart(e);
      }}
    >
      {/* Window Header */}
      <div 
        ref={headerRef}
        className={cn(
          "h-10 flex items-center px-4 cursor-move border-b",
          isFocused 
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        )}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="text-sm font-medium truncate w-full text-center">
          {title}
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10"
            onClick={() => toggleMinimize(id)}
            aria-label="Minimize window"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button 
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10"
            onClick={() => toggleMaximize(id)}
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
          >
            {isMaximized ? <Minimize className="w-4 h-4" /> : <Square className="w-4 h-4" />}
          </button>
          <button 
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500"
            onClick={() => closeWindow(id)}
            aria-label="Close window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-grow overflow-auto bg-background">
        {content}
      </div>

      {/* Resize Handles (only on desktop) */}
      {!isMobile && !isMaximized && (
        <>
          <div 
            className="absolute w-2 h-full top-0 left-0 cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div 
            className="absolute w-2 h-full top-0 right-0 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          <div 
            className="absolute w-full h-2 top-0 left-0 cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div 
            className="absolute w-full h-2 bottom-0 left-0 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div 
            className="absolute w-4 h-4 bottom-0 right-0 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div 
            className="absolute w-4 h-4 bottom-0 left-0 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div 
            className="absolute w-4 h-4 top-0 right-0 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div 
            className="absolute w-4 h-4 top-0 left-0 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
        </>
      )}
    </motion.div>
  );
};

export default Window;