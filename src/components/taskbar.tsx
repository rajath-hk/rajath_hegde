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
  Minus,
  Home
} from 'lucide-react';
import { format } from 'date-fns';
import StartMenu from '@/components/start-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Taskbar = () => {
  const { windows, closeWindow, toggleMinimize } = useWindows();
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-background border-t" />
    );
  }

  // On mobile, we want a simplified taskbar with just the essentials
  if (isMobile) {
    return (
      <React.Fragment>
        {/* Start Menu */}
        {showStartMenu && (
          <div className="fixed bottom-16 left-0 right-0 z-50">
            <StartMenu />
          </div>
        )}

        {/* Mobile Taskbar */}
        <div 
          className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-t flex items-center justify-around px-2 z-50"
          role="toolbar"
          aria-label="Mobile taskbar"
        >
          {/* Start Button */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowStartMenu(!showStartMenu)}
            className="rounded-xl w-12 h-12"
            aria-label="Start menu"
            aria-expanded={showStartMenu}
          >
            <Home className="w-5 h-5" />
          </Button>
          
          {/* Windows */}
          <div className="flex gap-1 overflow-x-auto flex-1 px-2">
            {windows
              .filter(win => !win.isMinimized)
              .map((win) => {
                const IconComponent = win.icon;
                return (
                  <Button
                    key={win.id}
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleMinimize(win.id)}
                    className="rounded-xl w-12 h-12 flex-shrink-0"
                    aria-label={`Minimize ${win.title} window`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Button>
                );
              })}
          </div>
          
          {/* System Tray */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-xl w-12 h-12" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="text-xs font-medium px-2" aria-label={`Current time: ${format(time, 'h:mm a')}`}>
              {format(time, 'h:mm a')}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {/* Start Menu */}
      {showStartMenu && (
        <div className="fixed bottom-16 left-0 z-50">
          <StartMenu />
        </div>
      )}
      
      {/* Desktop Taskbar */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-xl border-t flex items-center px-2 z-50"
        role="toolbar"
        aria-label="Taskbar"
      >
        {/* Start Button */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="rounded-lg mr-2"
          aria-label="Start menu"
          aria-expanded={showStartMenu}
        >
          <Home className="w-4 h-4 mr-1" />
          Start
        </Button>
        
        {/* Windows */}
        <div className="flex gap-1 flex-1">
          {windows.map((win) => {
            const IconComponent = win.icon;
            return (
              <Button
                key={win.id}
                variant={win.isFocused ? "secondary" : "ghost"}
                size="sm"
                onClick={() => toggleMinimize(win.id)}
                className={cn(
                  "rounded-lg px-2 py-1 h-10 flex items-center gap-2 min-w-0 transition-all",
                  win.isMinimized && "opacity-60"
                )}
                aria-label={`${win.isMinimized ? 'Restore' : 'Minimize'} ${win.title} window`}
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate max-w-[120px]">{win.title}</span>
              </Button>
            );
          })}
        </div>
        
        {/* System Tray */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-lg w-8 h-8" aria-label="Search">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-lg w-8 h-8" aria-label="Network">
            <Wifi className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-lg w-8 h-8" aria-label="Sound">
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-lg w-8 h-8" aria-label="Battery">
            <Battery className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-1 px-2 text-sm" aria-label={`Current time: ${format(time, 'h:mm a')}`}>
            <Calendar className="w-4 h-4" />
            <span>{format(time, 'h:mm a')}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Taskbar;