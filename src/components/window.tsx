'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { X, Minus, Square, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    setSize({ width, height }); 
    setPosition({ x, y });
  }, [width, height, x, y]);

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    focusWindow(id);
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setContextMenuOpen(true);
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
    <DropdownMenu open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
      <DropdownMenuTrigger asChild>
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
          onContextMenu={handleContextMenu}
          drag={!isMaximized && !isResizing}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={(e, info) => {
            updateWindowPosition(id, position.x + info.offset.x, position.y + info.offset.y);
          }}
        >
      <header
        className="flex items-center justify-center relative px-3 h-9 flex-shrink-0 border-b bg-black/5 dark:bg-white/5"
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
      <div className="flex-1 rounded-b-lg overflow-hidden">
        <div className="w-full h-full overflow-auto">
          {content}
        </div>
      </div>
      
      {/* Resize handles */}
      {!isMaximized && (
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
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => toggleMinimize(id)}>
            <Minus className="mr-2 h-4 w-4" />
            <span>Minimize</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleMaximize(id)}>
            <Maximize className="mr-2 h-4 w-4" />
            <span>{isMaximized ? 'Restore' : 'Maximize'}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => closeWindow(id)}>
            <X className="mr-2 h-4 w-4" />
            <span>Close</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          // Reset to default size
          const defaultWidth = 500;
          const defaultHeight = 400;
          const newWidth = Math.max(300, defaultWidth);
          const newHeight = Math.max(200, defaultHeight);
          updateWindowSize(id, newWidth, newHeight);
          
          // Center the window
          const centerX = (window.innerWidth - newWidth) / 2;
          const centerY = (window.innerHeight - newHeight) / 2;
          updateWindowPosition(id, centerX, centerY);
        }}>
          <Square className="mr-2 h-4 w-4" />
          <span>Reset Size & Position</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Window;