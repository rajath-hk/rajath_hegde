'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { X, Minus, Square, Minimize } from 'lucide-react';
import { motion } from 'framer-motion';
import ErrorBoundary from './error-boundary';

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
  const [isLoading, setIsLoading] = useState(true);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust window size and position for mobile
  useEffect(() => { 
    if (typeof window === 'undefined') return;
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

  // Simulate content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

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
        const windowWidth = windowRef.current.offsetWidth;
        const windowHeight = windowRef.current.offsetHeight;
        
        const newX = moveTouch.clientX - offsetX;
        const newY = moveTouch.clientY - offsetY;
        
        // Keep window within bounds
        if (typeof window !== 'undefined') {
          const boundedX = Math.max(0, Math.min(newX, window.innerWidth - windowWidth));
          const boundedY = Math.max(0, Math.min(newY, window.innerHeight - windowHeight));
          setPosition({ x: boundedX, y: boundedY });
        }
      };
      
      const handleTouchEnd = () => {
        updateWindowPosition(id, position.x, position.y);
        setIsDragging(false);
        // Ensure window remains focused and visible after dragging
        focusWindow(id);
        if (typeof window !== 'undefined') {
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('touchend', handleTouchEnd);
        }
      };
      
      if (typeof window !== 'undefined') {
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
      }
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
      if (!windowRef.current) return;
      
      const windowWidth = windowRef.current.offsetWidth;
      const windowHeight = windowRef.current.offsetHeight;
      
      // Calculate new position based on mouse movement
      const newX = e.clientX - windowWidth / 2;
      const newY = e.clientY - 20;
      
      // Boundary checks to keep window within screen
      if (typeof window !== 'undefined') {
        const boundedX = Math.max(0, Math.min(newX, window.innerWidth - windowWidth));
        const boundedY = Math.max(0, Math.min(newY, window.innerHeight - windowHeight));
        setPosition({ x: boundedX, y: boundedY });
      }
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
      
      // Implement window snapping
      const snapThreshold = 20; // pixels from edge to snap
      let finalX = position.x;
      let finalY = position.y;
      
      // Snap to edges
      if (typeof window !== 'undefined') {
        if (position.x < snapThreshold) {
          finalX = 0; // Snap to left edge
        } else if (position.x + size.width > window.innerWidth - snapThreshold) {
          finalX = window.innerWidth - size.width; // Snap to right edge
        }
        
        if (position.y < snapThreshold) {
          finalY = 0; // Snap to top edge
        } else if (position.y + size.height > window.innerHeight - snapThreshold) {
          finalY = window.innerHeight - size.height; // Snap to bottom edge
        }
      }
      
      // Update position if snapped
      if (finalX !== position.x || finalY !== position.y) {
        setPosition({ x: finalX, y: finalY });
      }
      
      updateWindowPosition(id, finalX, finalY);
      // Ensure window remains focused and visible after dragging
      focusWindow(id);
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
    if (typeof window === 'undefined') return;
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
      // But ensure window stays within bounds
      const boundedX = Math.max(0, Math.min(x, window.innerWidth - width));
      const boundedY = Math.max(0, Math.min(y, window.innerHeight - height));
      
      setSize({ width, height });
      setPosition({ x: boundedX, y: boundedY });
    }
  }, [isMaximized, isMobile, width, height, x, y]);

  if (isMinimized) {
    return null;
  }

  return (
    <motion.div
      ref={windowRef}
      className={cn(
        "fixed bg-background glassy-window border rounded-lg shadow-2xl overflow-hidden flex flex-col transition-shadow",
        isFocused ? "border-blue-500 shadow-lg" : "border-gray-300 dark:border-gray-600"
      )}
      style={{
        width: size.width,
        height: size.height,
        zIndex,
        left: position.x,
        top: position.y,
        willChange: 'transform'
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        focusWindow(id);
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
        focusWindow(id);
        handleDragStart(e);
      }}
    >
      {/* Window Header */}
      <div 
        ref={headerRef}
        className={cn(
          "h-10 flex items-center justify-between px-4 cursor-move border-b glassy-window transition-colors duration-300 ease-in-out",
          isFocused 
            ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white backdrop-blur-lg" 
            : "bg-gray-100/30 dark:bg-gray-800/30 text-gray-800 dark:text-gray-200 backdrop-blur-md"
        )}
        onDoubleClick={handleDoubleClick}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        role="banner"
      >
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="w-3 h-3 rounded-full bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            aria-label="Minimize window"
            title="Minimize"
            onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}
          />
          
          <button
            type="button"
            className="w-3 h-3 rounded-full bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
            title={isMaximized ? 'Restore' : 'Maximize'}
            onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
          />

          <button
            type="button"
            className="w-3 h-3 rounded-full bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label="Close window"
            title="Close"
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
          />

          {/* Screen-reader only description so color cues are not the only signal */}
          <span className="sr-only">Window controls: close, minimize, maximize</span>
        </div>
        
        <div className="text-sm font-medium truncate mx-4 flex-grow text-center" role="heading" aria-level={2}>
          {title}
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-grow overflow-auto bg-background/70 dark:bg-background/80 relative backdrop-blur-sm" role="main">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center" role="status">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <ErrorBoundary>
            {content}
          </ErrorBoundary>
        )}
      </div>

      {/* Resize Handles (only on desktop) */}
      {!isMobile && !isMaximized && (
        <>
          <div 
            className="absolute w-2 h-full top-0 left-0 cursor-w-resize"
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleResizeStart(e, 'w')}
          />
          <div 
            className="absolute w-2 h-full top-0 right-0 cursor-e-resize"
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleResizeStart(e, 'e')}
          />
          <div 
            className="absolute w-full h-2 top-0 left-0 cursor-n-resize"
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleResizeStart(e, 'n')}
          />
          <div 
            className="absolute w-full h-2 bottom-0 left-0 cursor-s-resize"
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleResizeStart(e, 's')}
          />
          <div 
            className="absolute w-4 h-4 bottom-0 right-0 cursor-se-resize"
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleResizeStart(e, 'se')}
          />
          <div 
            className="absolute w-4 h-4 bottom-0 left-0 cursor-sw-resize"
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleResizeStart(e, 'sw')}
          />
          <div 
            className="absolute w-4 h-4 top-0 right-0 cursor-ne-resize"
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute w-4 h-4 top-0 left-0 cursor-nw-resize"
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleResizeStart(e, 'nw')}
          />
        </>
      )}
    </motion.div>
  );
};

export default Window;