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
  
  const windowRef = useRef<HTMLDivElement>(null);

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
  };
  
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    toggleMaximize(id);
  };

  // Handle touch events for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMaximized) return;
    focusWindow(id);
    
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
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeDirection || !windowRef.current) return;
    
    const rect = windowRef.current.getBoundingClientRect();
    const minWidth = 300;
    const minHeight = 200;
    
    let newWidth = size.width;
    let newHeight = size.height;
    let newX = position.x;
    let newY = position.y;
    
    if (resizeDirection.includes('e')) {
      newWidth = Math.max(minWidth, e.clientX - rect.left);
    }
    
    if (resizeDirection.includes('s')) {
      newHeight = Math.max(minHeight, e.clientY - rect.top);
    }
    
    if (resizeDirection.includes('w')) {
      const widthChange = rect.left - e.clientX;
      if (size.width + widthChange > minWidth) {
        newWidth = size.width + widthChange;
        newX = position.x - widthChange;
      }
    }
    
    if (resizeDirection.includes('n')) {
      const heightChange = rect.top - e.clientY;
      if (size.height + heightChange > minHeight) {
        newHeight = size.height + heightChange;
        newY = position.y - heightChange;
      }
    }
    
    setSize({ width: newWidth, height: newHeight });
    setPosition({ x: newX, y: newY });
  }, [isResizing, resizeDirection, size, position]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      setResizeDirection(null);
      updateWindowSize(id, size.width, size.height);
      updateWindowPosition(id, position.x, position.y);
    }
  }, [isResizing, id, size, position, updateWindowSize, updateWindowPosition]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Don't render minimized windows
  if (isMinimized) {
    return null;
  }

  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-card/80 dark:bg-card/60 backdrop-blur-xl border rounded-lg flex flex-col shadow-lg"
      style={{
        width: size.width,
        height: size.height,
        zIndex,
        left: position.x,
        top: position.y,
      }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      onMouseDown={() => focusWindow(id)}
      drag={!isMaximized && !isResizing && !isMobile}
      dragMomentum={false}
      onDragStart={(event, info) => {
        if (isMaximized) return;
        // Check if the target is a button
        if ((event.target as HTMLElement).closest('button')) {
          return;
        }
        focusWindow(id);
      }}
      onDragEnd={(e, info) => {
        updateWindowPosition(id, position.x + info.offset.x, position.y + info.offset.y);
      }}
    >
      <header
        className="flex items-center justify-between relative px-3 h-9 flex-shrink-0 border-b bg-black/5 dark:bg-white/5 cursor-move"
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        style={{ cursor: isMaximized ? 'default' : isResizing ? 'default' : 'grab' }}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); closeWindow(id); }} 
              className="w-6 h-6 rounded-full bg-[#ff5f57] flex items-center justify-center group/btn hover:bg-[#ff3b30] transition-colors"
              aria-label="Close"
            >
                <X className="w-3 h-3 text-[#9d252b] group-hover/btn:text-white transition-colors" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }} 
              className="w-6 h-6 rounded-full bg-[#febc2e] flex items-center justify-center group/btn hover:bg-[#ff9500] transition-colors"
              aria-label="Minimize"
            >
                <Minus className="w-3 h-3 text-[#9a542c] group-hover/btn:text-white transition-colors" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }} 
              className="w-6 h-6 rounded-full bg-[#28c840] flex items-center justify-center group/btn hover:bg-[#00c700] transition-colors"
              aria-label={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? (
                <Minimize className="w-3 h-3 text-[#226534] group-hover/btn:text-white transition-colors" />
              ) : (
                <Square className="w-3 h-3 text-[#226534] group-hover/btn:text-white transition-colors" />
              )}
            </button>
        </div>
        <span className={cn(
            "font-medium text-sm truncate transition-colors max-w-[60%] sm:max-w-[70%]",
            isFocused ? "text-foreground" : "text-muted-foreground/80"
          )}>
          {title}
        </span>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3"></div>
      </header>
      <div className="flex-1 rounded-b-lg overflow-hidden">
        <div className="w-full h-full overflow-auto">
          {content}
        </div>
      </div>
      
      {/* Resize handles - hidden on mobile */}
      {!isMaximized && !isMobile && (
        <>
          {/* Edges */}
          <div 
            className="absolute top-0 left-2 right-2 h-1 cursor-n-resize" 
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div 
            className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize" 
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div 
            className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize" 
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div 
            className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize" 
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          
          {/* Corners */}
          <div 
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize" 
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div 
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize" 
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div 
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" 
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div 
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" 
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
        </>
      )}
    </motion.div>
  );
};

export default Window;