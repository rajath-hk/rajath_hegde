'use client';

import React, { useState, useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';
import StartMenu from './start-menu';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Minus, Battery, Wifi, Volume2 } from 'lucide-react';

const Taskbar = () => {
  const { windows, focusWindow, toggleMinimize } = useWindows();
  const { theme } = useTheme();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Only show non-minimized windows in the taskbar
  const visibleWindows = windows.filter(window => !window.isMinimized);

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 h-10 bg-background/80 backdrop-blur-lg border-t flex items-center justify-between px-2 z-[1000]",
      "dark:bg-black/50"
    )}>
      <div className="flex items-center h-full">
        {/* Start Menu */}
        <StartMenu />
        
        {/* Running Applications */}
        <div className="flex items-center h-full ml-2 gap-1">
          {visibleWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => {
                if (window.isFocused) {
                  toggleMinimize(window.id);
                } else {
                  focusWindow(window.id);
                }
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-sm text-sm h-full",
                window.isFocused 
                  ? "bg-primary/20 text-primary" 
                  : "hover:bg-accent"
              )}
            >
              <window.icon className="h-4 w-4" />
              <span className="max-w-[120px] truncate">{window.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-xs">
          <Wifi className="h-4 w-4" />
          <Volume2 className="h-4 w-4" />
          <Battery className="h-4 w-4" />
        </div>
        <div className="flex flex-col items-end text-xs">
          <div>{time}</div>
          <div>{date}</div>
        </div>
        <button 
          onClick={() => {
            // Minimize all windows
            windows.forEach(window => {
              if (!window.isMinimized) {
                toggleMinimize(window.id);
              }
            });
          }}
          className="p-1 rounded hover:bg-accent"
          aria-label="Show Desktop"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Taskbar;