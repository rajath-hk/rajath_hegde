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
  const { windows, desktopIcons, closeWindow, toggleMinimize, openWindow } = useWindows();
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
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
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-t flex items-center justify-around px-2 z-50">
          {/* Start Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-12 w-12 rounded-full hover:bg-accent"
            onClick={() => setShowStartMenu(!showStartMenu)}
            aria-label="Start menu"
          >
            <Home className="w-6 h-6" />
          </Button>

          {/* Open Windows - simplified for mobile */}
          <div className="flex items-center space-x-1 flex-1 justify-center">
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
                    "h-12 w-12 rounded-full text-xs",
                    win.isFocused ? "bg-accent" : "hover:bg-accent"
                  )}
                  onClick={() => toggleMinimize(win.id)}
                  aria-label={`Show ${win.title}`}
                >
                  <win.icon className="w-6 h-6" />
                </Button>
              ))}
          </div>

          {/* System Tray - simplified for mobile */}
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-accent"
              aria-label="Search"
              onClick={() => {
                const app = desktopIcons.find(i => i.id === 'search');
                if (app) openWindow(app);
              }}
            >
              <Search className="w-6 h-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-accent"
              aria-label="Notifications"
              onClick={() => {
                const app = desktopIcons.find(i => i.id === 'notifications');
                if (app) openWindow(app);
              }}
            >
              <Bell className="w-6 h-6" />
            </Button>
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
                    "h-8 px-2 text-xs",
                    win.isFocused ? "bg-accent" : "hover:bg-accent",
                    isMinimized ? "opacity-50" : ""  // visually differentiate minimized windows
                  )}
                  onClick={() => toggleMinimize(win.id)}
                  title={win.title}
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
            onClick={() => {
              const app = desktopIcons.find(i => i.id === 'search');
              if (app) openWindow(app);
            }}
          >
            <Search className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-accent"
            aria-label="Notifications"
            onClick={() => {
              const app = desktopIcons.find(i => i.id === 'notifications');
              if (app) openWindow(app);
            }}
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