'use client';

import React, { useState, useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';
import { Button } from '@/components/ui/button';
import { 
  ChevronUp, 
  Wifi, 
  Battery, 
  Volume2, 
  Search,
  Bell,
  Calendar,
  User,
  Minus
} from 'lucide-react';
import { format } from 'date-fns';
import StartMenu from '@/components/start-menu';

const Taskbar = () => {
  const { windows, closeWindow, toggleMinimize } = useWindows();
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Start Menu */}
      {showStartMenu && (
        <div className="fixed bottom-12 left-0 z-50">
          <StartMenu />
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-background/80 backdrop-blur-xl border-t flex items-center justify-between px-2 z-50">
        {/* Start Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 hover:bg-accent"
          onClick={() => setShowStartMenu(!showStartMenu)}
          aria-label="Start menu"
        >
          <span className="font-bold text-lg">_portfolio</span>
        </Button>

        {/* Open Windows */}
        <div className="flex items-center space-x-1 flex-1 justify-center">
          {windows
            .filter(win => !win.isMinimized)
            .map((win) => (
              <Button
                key={win.id}
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs hover:bg-accent"
                onClick={() => toggleMinimize(win.id)}
              >
                <win.icon className="w-4 h-4 mr-1" />
                <span className="max-w-[80px] truncate">{win.title}</span>
                <ChevronUp className="w-3 h-3 ml-1" />
              </Button>
            ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-accent"
            onClick={() => {
              // Minimize all windows
              windows.forEach(window => {
                if (!window.isMinimized) {
                  toggleMinimize(window.id);
                }
              });
            }}
            aria-label="Show desktop"
          >
            <Minus className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-accent"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-accent"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center px-2 text-sm">
            <Wifi className="w-4 h-4 mr-1 text-muted-foreground" />
            <Battery className="w-4 h-4 mr-1 text-muted-foreground" />
            <Volume2 className="w-4 h-4 mr-2 text-muted-foreground" />
            <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
            <span>{format(time, 'h:mm aa')}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-accent"
            aria-label="User profile"
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Taskbar;