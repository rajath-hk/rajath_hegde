'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const DockIcon = ({ win }: { win: WindowInstance }) => {
    const { focusWindow } = useWindows();
    const ref = useRef<HTMLButtonElement>(null);
    const [scale, setScale] = useState(1);

    const isFocused = win.isFocused && !win.isMinimized;
    const IconComponent = win.icon;

    const handleMouseEnter = () => {
        setScale(1.5);
    };

    const handleMouseLeave = () => {
        setScale(1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        focusWindow(win.id);
      }
    };

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            ref={ref}
            className={cn(
              "p-2 rounded-lg transition-all duration-200 flex items-center justify-center",
              isFocused 
                ? "bg-primary/20 text-primary" 
                : "bg-background/80 text-foreground hover:bg-accent"
            )}
            style={{ 
              transform: `scale(${scale})`,
              transition: 'transform 0.2s ease-out'
            }}
            onClick={() => focusWindow(win.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            aria-label={win.title}
          >
            <IconComponent className="w-6 h-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{win.title}</p>
        </TooltipContent>
      </Tooltip>
    );
};

const Dock = () => {
  const { windows } = useWindows();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-end space-x-1 bg-background/80 backdrop-blur-sm border rounded-2xl p-2 shadow-lg">
          {windows.map((win) => (
            <DockIcon key={win.id} win={win} />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dock;