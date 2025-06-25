'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { X, Minus, Square } from 'lucide-react';
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
  const [isResizing, setIsResizing] = useState(false);
  
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setSize({ width, height }); }, [width, height]);

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
    if (isResizing) {
      if (!windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      const newHeight = e.clientY - rect.top;
      setSize({ width: Math.max(300, newWidth), height: Math.max(200, newHeight) });
    }
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      updateWindowSize(id, size.width, size.height);
    }
  }, [isResizing, id, size, updateWindowSize]);

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
      className="absolute bg-card/80 backdrop-blur-md border border-black/10 dark:border-white/20 rounded-lg flex flex-col shadow-lg"
      style={{
        width: size.width,
        height: size.height,
        zIndex,
      }}
      layout
      initial={{ opacity: 0, scale: 0.9, x, y: y + 20 }}
      animate={{ opacity: 1, scale: 1, x, y }}
      exit={{ opacity: 0, scale: 0.9, y: y + 20 }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      onMouseDown={() => focusWindow(id)}
      drag={!isMaximized && !isResizing}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        updateWindowPosition(id, x + info.offset.x, y + info.offset.y);
      }}
    >
      <header
        className="flex items-center justify-center relative px-3 h-9 flex-shrink-0 border-b"
        onDoubleClick={handleDoubleClick}
        style={{ cursor: isMaximized ? 'default' : isResizing ? 'default' : 'grab' }}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); closeWindow(id) }} className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] flex items-center justify-center group/btn" aria-label="Close">
                <X className="w-2 h-2 text-[#9d252b] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); toggleMinimize(id) }} className="w-3.5 h-3.5 rounded-full bg-[#febc2e] flex items-center justify-center group/btn" aria-label="Minimize">
                <Minus className="w-2 h-2 text-[#9a542c] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); toggleMaximize(id) }} className="w-3.5 h-3.5 rounded-full bg-[#28c840] flex items-center justify-center group/btn" aria-label="Maximize">
                <Square className="w-1.5 h-1.5 fill-current text-[#226534] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
        </div>
        <span className={cn(
            "font-medium text-sm truncate transition-colors",
            isFocused ? "text-foreground" : "text-muted-foreground/80"
          )}>{title}</span>
      </header>
      <div className="flex-1 rounded-b-lg overflow-hidden bg-card/90">
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
      />
    </motion.div>
  );
};

export default Window;
