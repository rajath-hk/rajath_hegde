'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWindows } from '@/contexts/window-context';
import { Button } from '@/components/ui/button';
import { 
  ChevronUp, 
  Wifi, 
  Battery, 
  Volume2, 
  Search,
  Calendar,
  User,
  Minus,
  Home
} from 'lucide-react';
import { format } from 'date-fns';
import StartMenu from '@/components/start-menu';
import NotificationCenter from '@/components/notification-center';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Taskbar = () => {
  const { windows, desktopIcons, closeWindow, toggleMinimize, openWindow } = useWindows();
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const isMobile = useIsMobile();
  const taskbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handle closing start menu from other components
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const closeStartMenu = () => setShowStartMenu(false);
    window.addEventListener('closeStartMenu', closeStartMenu);
    return () => window.removeEventListener('closeStartMenu', closeStartMenu);
  }, []);

  // On mobile, we want a simplified taskbar with just the essentials
  if (isMobile) {
    return (
      <>
        {/* Start Menu */}
        {showStartMenu && (
          <div className="fixed bottom-16 left-0 right-0 z-50">
            <StartMenu />
          </div>
        )}

        {/* Mobile Taskbar */}
        <div 
          ref={taskbarRef}
          className="fixed bottom-0 left-0 right-0 h-16 glassy-taskbar border-t flex items-center justify-around px-2 z-50"
          role="toolbar"
          aria-label="Taskbar"
        >
          {/* Start Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-12 w-12 rounded-full hover:bg-accent/50"
            onClick={() => setShowStartMenu(!showStartMenu)}
            aria-label="Start menu"
            aria-expanded={showStartMenu}
            aria-controls={showStartMenu ? "start-menu" : undefined}
          >
            <Home className="w-6 h-6" />
          </Button>

          {/* Open Windows - simplified for mobile */}
          <div className="flex items-center space-x-1 flex-1 justify-center" role="group" aria-label="Open windows">
            {windows
              .filter(win => !win.isMinimized)
              .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
              .slice(0, 4) // Show up to 4 windows on mobile
              .map((win) => (
                <Button
                  key={win.id}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full text-xs backdrop-blur-sm",
                    win.isFocused ? "bg-accent/50" : "hover:bg-accent/30"
                  )}
                  onClick={() => toggleMinimize(win.id)}
                  aria-label={`Show ${win.title}`}
                >
                  <win.icon className="w-6 h-6" />
                </Button>
              ))}
          </div>

          {/* System Tray - simplified for mobile */}
          <div className="flex items-center space-x-1" role="group" aria-label="System controls">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-accent/50"
              aria-label="Search"
              onClick={() => {
                const app = desktopIcons.find(i => i.id === 'search');
                if (app) openWindow(app);
              }}
            >
              <Search className="w-6 h-6" />
            </Button>
            
            <NotificationCenter />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Start Menu */}
      {showStartMenu && (
        <div className="fixed bottom-12 left-0 z-50">
          <StartMenu />
        </div>
      )}

      {/* Desktop Taskbar */}
      <div 
        ref={taskbarRef}
        className="fixed bottom-0 left-0 right-0 h-10 glassy-taskbar border-t flex items-center justify-between px-2 z-50"
        role="toolbar"
        aria-label="Taskbar"
      >
        {/* Start Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 hover:bg-accent/50"
          onClick={() => setShowStartMenu(!showStartMenu)}
          aria-label="Start menu"
          aria-expanded={showStartMenu}
          aria-controls={showStartMenu ? "start-menu" : undefined}
        >
          <span className="font-bold text-lg">_portfolio</span>
        </Button>

        {/* Open Windows */}
        <div className="flex items-center space-x-1 flex-1 justify-center" role="group" aria-label="Open windows">
        {windows
            //.filter(win => !win.isMinimized)  // Show all windows, including minimized
            .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
            .map((win) => {
              const isMinimized = win.isMinimized;
              return (
                <Button
                  key={win.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 px-2 text-xs backdrop-blur-sm",
                    win.isFocused ? "bg-accent/50" : "hover:bg-accent/30",
                    isMinimized ? "opacity-50" : ""  // visually differentiate minimized windows
                  )}
                  onClick={() => toggleMinimize(win.id)}
                  title={win.title}
                  aria-label={`${win.title} window`}
                >
                  <win.icon className="w-4 h-4 mr-1" />
                  <span className="max-w-[80px] truncate">{win.title}</span>
                  <ChevronUp className="w-3 h-3 ml-1" />
                </Button>
              );
            })
        }
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-1" role="group" aria-label="System controls">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-accent/50"
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
            className="h-8 w-8 p-0 hover:bg-accent/50"
            aria-label="Search"
            onClick={() => {
              const app = desktopIcons.find(i => i.id === 'search');
              if (app) openWindow(app);
            }}
          >
            <Search className="w-4 h-4" />
          </Button>
          
          <NotificationCenter />
          
          <div className="flex items-center px-2 text-sm backdrop-blur-sm rounded" aria-label="System information">
            <Wifi className="w-4 h-4 mr-1 text-muted-foreground" aria-hidden="true" />
            <Battery className="w-4 h-4 mr-1 text-muted-foreground" aria-hidden="true" />
            <Volume2 className="w-4 h-4 mr-2 text-muted-foreground" aria-hidden="true" />
            <Calendar className="w-4 h-4 mr-1 text-muted-foreground" aria-hidden="true" />
            <span>{format(time, 'h:mm aa')}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-accent/50"
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