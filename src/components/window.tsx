'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useWindows } from '@/contexts/window-context';
import { 
  X, 
  Square, 
  Minus,
  GripVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WindowInstance } from '@/types';

interface WindowProps {
  window: WindowInstance;
}

const Window: React.FC<WindowProps> = ({ window }) => {
  const { 
    closeWindow, 
    toggleMinimize, 
    toggleMaximize, 
    updateWindowPosition, 
    updateWindowSize,
    focusWindow
  } = useWindows();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: window.width || 500,
    height: window.height || 400
  });
  
  // Update dimensions when window prop changes
  useEffect(() => {
    setDimensions({
      width: window.width || 500,
      height: window.height || 400
    });
  }, [window.width, window.height]);

  // Focus window on mount
  useEffect(() => {
    if (window.isFocused) {
      windowRef.current?.focus();
    }
  }, [window.isFocused]);

  const handleFocus = () => {
    focusWindow(window.id);
    windowRef.current?.focus();
  };

  const handleDragStart = () => {
    setIsDragging(true);
    handleFocus();
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    // Ensure x and y are valid numbers before updating position
    const x = typeof window.x === 'number' ? window.x : 100;
    const y = typeof window.y === 'number' ? window.y : 100;
    updateWindowPosition(window.id, x + info.offset.x, y + info.offset.y);
  };

  const handleResizeStart = () => {
    setIsResizing(true);
    handleFocus();
  };

  const handleResizeEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsResizing(false);
    const newWidth = Math.max(300, dimensions.width + info.offset.x);
    const newHeight = Math.max(200, dimensions.height + info.offset.y);
    updateWindowSize(window.id, newWidth, newHeight);
  };

  const handleResize = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const newWidth = Math.max(300, dimensions.width + info.delta.x);
    const newHeight = Math.max(200, dimensions.height + info.delta.y);
    setDimensions({
      width: newWidth,
      height: newHeight
    });
  };

  // Ensure x and y are valid numbers for positioning
  const x = typeof window.x === 'number' ? window.x : 100;
  const y = typeof window.y === 'number' ? window.y : 100;

  return (
    <motion.div
      ref={windowRef}
      className={cn(
        "fixed bg-background border shadow-2xl rounded-lg overflow-hidden flex flex-col",
        window.isMinimized && "hidden",
        isDragging && "cursor-grabbing",
        isResizing && "cursor-se-resize"
      )}
      style={{
        x: x,
        y: y,
        width: dimensions.width,
        height: dimensions.height,
        zIndex: window.zIndex,
      }}
      drag={!window.isMaximized}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleFocus}
      whileDrag={{ 
        zIndex: 1000,
        scale: 1.02
      }}
      transition={{ 
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 300, damping: 30 },
        width: { type: "spring", stiffness: 300, damping: 30 },
        height: { type: "spring", stiffness: 300, damping: 30 }
      }}
      aria-labelledby={`window-title-${window.id}`}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {/* Title Bar */}
      <div 
        className={cn(
          "h-8 flex items-center justify-between px-2 border-b cursor-grab active:cursor-grabbing",
          window.isFocused 
            ? "bg-primary/10 border-primary/30" 
            : "bg-muted/50 border-border"
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {/* Traffic Light Buttons */}
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(window.id);
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-red-500 hover:text-red-200 transition-colors"
              aria-label={`Close ${window.title} window`}
            >
              <X className="w-2 h-2 opacity-0 hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize(window.id);
              }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-yellow-500 hover:text-yellow-200 transition-colors"
              aria-label={`Minimize ${window.title} window`}
            >
              <Minus className="w-2 h-2 opacity-0 hover:opacity-100" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize(window.id);
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-green-500 hover:text-green-200 transition-colors"
              aria-label={`Maximize ${window.title} window`}
            >
              <Square className="w-2 h-2 opacity-0 hover:opacity-100" />
            </button>
          </div>
          
          {/* Window Title */}
          <h2 
            id={`window-title-${window.id}`}
            className="text-sm font-medium truncate"
          >
            {window.title}
          </h2>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-auto">
        {window.content}
      </div>
      
      {/* Resize Handle */}
      {!window.isMaximized && (
        <motion.div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize"
          onPanStart={handleResizeStart}
          onPan={handleResize}
          onPanEnd={handleResizeEnd}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.05 }}
          aria-hidden="true"
        >
          <GripVertical className="w-4 h-4 opacity-30 absolute bottom-1 right-1" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Window;