'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { X, Minus, Square } from 'lucide-react';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus window on mount
  useEffect(() => {
    if (mounted) {
      focusWindow(id);
    }
  }, [id, focusWindow, mounted]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    focusWindow(id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.target !== e.currentTarget) return;
    focusWindow(id);
  };

  // Drag handling
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isMaximized) return;
    
    e.preventDefault();
    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startLeft = x;
    const startTop = y;

    const handleDrag = (moveEvent: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const clientY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      
      const dx = clientX - startX;
      const dy = clientY - startY;
      
      updateWindowPosition(id, startLeft + dx, startTop + dy);
    };

    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('touchend', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', handleDragEnd);
  }, [id, isMaximized, updateWindowPosition, x, y]);

  // Resize handling
  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;
    const startXPos = x;
    const startYPos = y;

    const handleResize = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startXPos;
      let newY = startYPos;

      if (direction.includes('e')) {
        newWidth = Math.max(200, startWidth + dx);
      }
      if (direction.includes('s')) {
        newHeight = Math.max(100, startHeight + dy);
      }
      if (direction.includes('w')) {
        const delta = Math.min(dx, startWidth - 200);
        newWidth = startWidth - delta;
        newX = startXPos + delta;
      }
      if (direction.includes('n')) {
        const delta = Math.min(dy, startHeight - 100);
        newHeight = startHeight - delta;
        newY = startYPos + delta;
      }

      updateWindowSize(id, newWidth, newHeight);
      updateWindowPosition(id, newX, newY);
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      setResizeDirection(null);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [id, updateWindowSize, updateWindowPosition, width, height, x, y]);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute bg-background border rounded-lg shadow-xl flex flex-col overflow-hidden transition-all duration-200",
        isFocused ? "shadow-2xl ring-2 ring-primary/30" : "opacity-90",
        isMaximized && "inset-0 rounded-none"
      )}
      style={{
        left: isMaximized ? 0 : x,
        top: isMaximized ? 0 : y,
        width: isMaximized ? '100%' : width,
        height: isMaximized ? '100%' : height,
        zIndex: zIndex,
        transition: isResizing ? 'none' : 'all 0.2s ease-out',
      }}
      onClick={() => focusWindow(id)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Title Bar */}
      <div
        className={cn(
          "flex items-center justify-between p-2 border-b cursor-move select-none",
          isFocused ? "bg-primary/10" : "bg-muted"
        )}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <button
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(id);
              }}
              aria-label="Close window"
            >
              <X className="w-2 h-2 text-red-500 opacity-0 hover:opacity-100" />
            </button>
            <button
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize(id);
              }}
              aria-label="Minimize window"
            >
              <Minus className="w-2 h-2 text-yellow-500 opacity-0 hover:opacity-100" />
            </button>
            <button
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize(id);
              }}
              aria-label="Maximize window"
            >
              <Square className="w-2 h-2 text-green-500 opacity-0 hover:opacity-100" />
            </button>
          </div>
          <span className="text-sm font-medium truncate max-w-[120px]">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {content}
      </div>

      {/* Resize handles */}
      {!isMobile && !isMaximized && (
        <>
          <div
            className="absolute w-2 h-2 cursor-nw-resize bg-transparent"
            style={{ top: -1, left: -1 }}
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute w-2 h-2 cursor-ne-resize bg-transparent"
            style={{ top: -1, right: -1 }}
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute w-2 h-2 cursor-sw-resize bg-transparent"
            style={{ bottom: -1, left: -1 }}
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute w-2 h-2 cursor-se-resize bg-transparent"
            style={{ bottom: -1, right: -1 }}
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div
            className="absolute w-1 h-full cursor-w-resize bg-transparent"
            style={{ top: 0, left: -1 }}
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute w-1 h-full cursor-e-resize bg-transparent"
            style={{ top: 0, right: -1 }}
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          <div
            className="absolute w-full h-1 cursor-n-resize bg-transparent"
            style={{ top: -1, left: 0 }}
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute w-full h-1 cursor-s-resize bg-transparent"
            style={{ bottom: -1, left: 0 }}
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
        </>
      )}
    </div>
  );
};

export default Window;