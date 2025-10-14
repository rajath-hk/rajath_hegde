'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { X, Minus, Square } from 'lucide-react';
import { motion } from 'framer-motion';

type WindowProps = WindowInstance & {
  children?: React.ReactNode;
};

const Window = (props: WindowProps) => {
  const {
    id, title, content, x, y, width, height, zIndex, isFocused, isMaximized
  } = props;
  
  const {
    closeWindow,
    focusWindow,
    toggleMinimize,
    toggleMaximize,
    updateWindowPosition,
    updateWindowSize,
    isMobile
  } = useWindows();

  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const [localPosition, setLocalPosition] = useState({ x, y });
  const [localSize, setLocalSize] = useState({ width, height });

  // Update local state when props change
  useEffect(() => {
    setLocalPosition({ x, y });
    setLocalSize({ width, height });
  }, [x, y, width, height]);


  const handleFocus = useCallback((e: React.MouseEvent) => {
    focusWindow(id);
    e.stopPropagation();
  }, [focusWindow, id]);

  const handleDoubleClick = useCallback(() => {
    if (!isMobile) {
      toggleMaximize(id);
    }
  }, [isMobile, toggleMaximize, id]);

  const handleResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    
    const current = windowRef.current;
    if (!current) return;
    
    focusWindow(id);
    setIsResizing(true);
    setResizeDirection(direction);
    
    const rect = current.getBoundingClientRect();
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: rect.width,
      height: rect.height
    };
  }, [focusWindow, id]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || isMobile || !resizeDirection || !windowRef.current) return;
    
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    
    let newWidth = startPos.current.width;
    let newHeight = startPos.current.height;
    let newX = localPosition.x;
    let newY = localPosition.y;
    
    // Handle different resize directions
    if (resizeDirection.includes('right')) {
      newWidth = Math.max(300, startPos.current.width + dx);
    } else if (resizeDirection.includes('left')) {
      const delta = Math.min(dx, startPos.current.width - 300);
      newWidth = Math.max(300, startPos.current.width - delta);
      newX = localPosition.x + delta;
    }
    
    if (resizeDirection.includes('bottom')) {
      newHeight = Math.max(200, startPos.current.height + dy);
    } else if (resizeDirection.includes('top')) {
      const delta = Math.min(dy, startPos.current.height - 200);
      newHeight = Math.max(200, startPos.current.height - delta);
      newY = localPosition.y + delta;
    }
    
    setLocalSize({ width: newWidth, height: newHeight });
    setLocalPosition({ x: newX, y: newY });
  }, [isResizing, isMobile, resizeDirection, localPosition]);

  const handleMouseUp = useCallback(() => {
    if (isResizing && !isMobile) {
      setIsResizing(false);
      setResizeDirection(null);
      updateWindowSize(id, localSize.width, localSize.height);
      updateWindowPosition(id, localPosition.x, localPosition.y);
    }
  }, [isResizing, isMobile, id, localSize, localPosition, updateWindowSize, updateWindowPosition]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      // Prevent text selection while resizing
      document.body.style.userSelect = 'none';
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);


  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-card/80 dark:bg-card/60 backdrop-blur-xl border rounded-lg flex flex-col shadow-lg"
      style={{
        width: isMobile ? 'calc(100vw - 20px)' : localSize.width,
        height: isMobile ? Math.min(window.innerHeight - 100, 500) : localSize.height,
        zIndex,
        left: isMobile ? 10 : localPosition.x,
        top: isMobile ? 50 : localPosition.y,
      }}
      onMouseDown={handleFocus}
      drag={!isMobile && !isMaximized && !isResizing}
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(e, info) => {
        if (!isMobile) {
          const newX = localPosition.x + info.offset.x;
          const newY = localPosition.y + info.offset.y;
          setLocalPosition({ x: newX, y: newY });
          updateWindowPosition(id, newX, newY);
        }
      }}
    >
      <header
        className="flex items-center justify-center relative px-3 h-9 flex-shrink-0 border-b bg-black/5 dark:bg-white/5"
        onDoubleClick={handleDoubleClick}
        style={{ cursor: isMobile ? 'default' : isMaximized ? 'default' : isResizing ? 'default' : 'grab' }}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id) }} 
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] flex items-center justify-center group/btn" 
            aria-label="Close"
          >
            <svg 
              className="w-2 h-2 text-[#9d252b] opacity-0 group-hover/btn:opacity-100 transition-opacity" 
              fill="currentColor" 
              viewBox="0 0 8 8"
            >
              <path d="M1.5 1.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMinimize(id) }} 
            className="w-3.5 h-3.5 rounded-full bg-[#febc2e] flex items-center justify-center group/btn" 
            aria-label="Minimize"
          >
            <svg 
              className="w-2 h-2 text-[#9a542c] opacity-0 group-hover/btn:opacity-100 transition-opacity" 
              fill="currentColor" 
              viewBox="0 0 8 8"
            >
              <path d="M1 4h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMaximize(id) }} 
            className="w-3.5 h-3.5 rounded-full bg-[#28c840] flex items-center justify-center group/btn" 
            aria-label="Maximize"
          >
            <svg 
              className="w-1.5 h-1.5 fill-current text-[#226534] opacity-0 group-hover/btn:opacity-100 transition-opacity" 
              viewBox="0 0 6 6"
            >
              <path d="M1 1h4v4H1z" />
            </svg>
          </button>
        </div>
        <span className={cn(
          "font-medium text-sm truncate transition-colors",
          isFocused ? "text-foreground" : "text-muted-foreground/80"
        )}>{title}</span>
      </header>
      <div className="flex-1 rounded-b-lg overflow-auto">
        {content}
      </div>
       {/* Resize handles */}
       {!isMobile && !isMaximized && (
        <>
          {/* Bottom-right handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          />
          {/* Bottom edge handle */}
          <div
            className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
          {/* Right edge handle */}
          <div
            className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, 'right')}
          />
        </>
       )}
    </motion.div>
  );
};

export default Window;