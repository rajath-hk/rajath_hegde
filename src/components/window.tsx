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
  
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    setSize({ width, height }); 
    setPosition({ x, y });
  }, [width, height, x, y]);

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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      if (!windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const newHeight = e.clientY - rect.top;
      setSize({ 
        width: Math.max(300, newWidth), 
        height: Math.max(200, newHeight) 
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
        "absolute bg-card/90 backdrop-blur-xl border rounded-lg flex flex-col shadow-lg",
        isFocused ? "border-blue-500" : "border-border"
      )}
      style={{
        width: size.width,
        height: size.height,
        x: position.x,
        y: position.y,
        zIndex,
      }}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      onMouseDown={handleMouseDown}
    >
      <header
        ref={headerRef}
        className={cn(
          "flex items-center justify-center relative px-3 h-9 flex-shrink-0 border-b",
          isFocused 
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white" 
            : "bg-muted text-muted-foreground"
        )}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: isMaximized ? 'default' : 'grab' }}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                closeWindow(id);
              }} 
              className="w-6 h-6 rounded hover:bg-red-500/80 flex items-center justify-center group/btn"
              aria-label="Close"
            >
                <X className="w-3 h-3 group-hover/btn:text-white" />
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                toggleMinimize(id);
              }} 
              className="w-6 h-6 rounded hover:bg-gray-500/50 flex items-center justify-center group/btn"
              aria-label="Minimize"
            >
                <Minus className="w-3 h-3 group-hover/btn:text-white" />
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                toggleMaximize(id);
              }} 
              className="w-6 h-6 rounded hover:bg-gray-500/50 flex items-center justify-center group/btn"
              aria-label="Maximize"
            >
                {isMaximized ? (
                  <Minimize className="w-3 h-3 group-hover/btn:text-white" />
                ) : (
                  <Square className="w-3 h-3 group-hover/btn:text-white" />
                )}
            </button>
        </div>
        <span className={cn(
            "font-medium text-sm truncate",
            isFocused ? "text-white" : "text-muted-foreground"
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
          "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
          isMaximized && "hidden"
        )}
        onMouseDown={handleResizeStart}
      >
        <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-muted-foreground"></div>
      </div>
    </motion.div>
  );
};

export default Window;