'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { X, Minus, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    updateWindowPosition,
    updateWindowSize,
    toggleMaximize,
    toggleMinimize,
  } = useWindows();

  const [size, setSize] = useState({ width, height });
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const windowRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => { 
    // On mobile, make windows take up most of the screen
    if (isMobile) {
      setSize({ 
        width: window.innerWidth - 20, 
        height: Math.min(window.innerHeight - 100, 500) 
      });
    } else {
      setSize({ width, height }); 
    }
  }, [width, height, isMobile]);

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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing && !isMobile) {
      if (!windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const newHeight = e.clientY - rect.top;
      setSize({ width: Math.max(300, newWidth), height: Math.max(200, newHeight) });
    }
  }, [isResizing, isMobile]);

  const handleMouseUp = useCallback(() => {
    if (isResizing && !isMobile) {
      setIsResizing(false);
      updateWindowSize(id, size.width, size.height);
    }
  }, [isResizing, id, size, updateWindowSize, isMobile]);

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


  return (
    <motion.div
      ref={windowRef}
      className="absolute bg-card/80 dark:bg-card/60 backdrop-blur-xl border rounded-lg flex flex-col shadow-lg"
      style={{
        width: isMobile ? 'calc(100vw - 20px)' : size.width,
        height: isMobile ? Math.min(window.innerHeight - 100, 500) : size.height,
        zIndex,
        left: isMobile ? 10 : x,
        top: isMobile ? 50 : y,
      }}
      layout
      initial={{ opacity: 0, scale: 0.8, x: isMobile ? 10 : x, y: (isMobile ? 50 : y) + 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        x: isMobile ? 10 : x, 
        y: isMobile ? 50 : y,
        transition: { type: 'spring', stiffness: 500, damping: 40 }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.8, 
        y: (isMobile ? 50 : y) + 20,
        transition: { duration: 0.2 }
      }}
      onMouseDown={() => focusWindow(id)}
      drag={!isMobile && !isMaximized && !isResizing}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        if (!isMobile) {
          updateWindowPosition(id, x + info.offset.x, y + info.offset.y);
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
      <div className="flex-1 rounded-b-lg overflow-hidden">
        <motion.div 
          className="w-full h-full overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          exit={{ opacity: 0 }}
        >
          {content}
        </motion.div>
      </div>
       <div
        className={cn(
          "absolute bottom-0 right-0 w-4 h-4 cursor-se-resize",
          (isMaximized || isMobile) && "hidden"
        )}
        onMouseDown={handleResizeStart}
      />
    </motion.div>
  );
};

export default Window;