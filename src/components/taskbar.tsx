'use client';

import React from 'react';
import { X, Minimize2, Square, Play, Search, Bell, Wifi, Battery, Calendar, User, Power, Settings, HelpCircle, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWindows } from '@/contexts/window-context';
import StartMenu from '@/components/start-menu';
import NotificationCenter from '@/components/notification-center';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Taskbar = () => {
  const { windows, closeWindow, toggleMinimize, toggleMaximize, focusWindow } = useWindows();
  const [startMenuOpen, setStartMenuOpen] = React.useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  const [contextMenuOpen, setContextMenuOpen] = React.useState(false);
  const [contextWindowId, setContextWindowId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleContextMenu = (e: React.MouseEvent, windowId: string) => {
    e.preventDefault();
    setContextWindowId(windowId);
    setContextMenuOpen(true);
  };

  const closeAllWindows = () => {
    windows.forEach(win => closeWindow(win.id));
  };

  const showDesktop = () => {
    windows.forEach(win => {
      if (!win.isMinimized) {
        toggleMinimize(win.id);
      }
    });
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-background/80 backdrop-blur-sm border-t flex items-center px-2 z-50">
        {/* Start Button */}
        <DropdownMenu open={startMenuOpen} onOpenChange={setStartMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button 
              className="h-8 px-3 flex items-center gap-2 hover:bg-accent rounded mr-2"
              aria-label="Start menu"
            >
              <div className="w-4 h-4 bg-[#E0553B] rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 border border-white rotate-45"></div>
              </div>
              <span className="font-medium">Start</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="p-0 w-[500px] h-[400px] ml-2 mb-2 rounded-sm" 
            align="start"
            side="top"
          >
            <StartMenu />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Running Windows */}
        <div className="flex-1 flex items-center gap-1 h-full">
          {windows.map((win) => (
            <DropdownMenu key={win.id} open={contextMenuOpen && contextWindowId === win.id} onOpenChange={(open) => {
              if (!open) setContextMenuOpen(false);
            }}>
              <DropdownMenuTrigger asChild>
                <button
                  onContextMenu={(e) => handleContextMenu(e, win.id)}
                  onClick={() => {
                    if (win.isMinimized) {
                      toggleMinimize(win.id);
                    }
                    focusWindow(win.id);
                  }}
                  className={`h-8 px-3 flex items-center gap-2 rounded transition-colors ${
                    win.isFocused 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent'
                  }`}
                >
                  <win.icon className="w-4 h-4" />
                  <span className="text-sm truncate max-w-[120px]">{win.title}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => toggleMinimize(win.id)}>
                    <Minimize2 className="mr-2 h-4 w-4" />
                    <span>Minimize</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleMaximize(win.id)}>
                    <Square className="mr-2 h-4 w-4" />
                    <span>Maximize</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => closeWindow(win.id)}>
                    <X className="mr-2 h-4 w-4" />
                    <span>Close</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  // Restore and focus window
                  if (win.isMinimized) {
                    toggleMinimize(win.id);
                  }
                  focusWindow(win.id);
                }}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>Restore</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-1 h-full">
          <button 
            onClick={showDesktop}
            className="h-8 px-2 hover:bg-accent rounded flex items-center"
            aria-label="Show desktop"
          >
            <Square className="w-4 h-4" />
          </button>
          
          <div className="h-5 w-px bg-border mx-1"></div>
          
          <NotificationCenter open={notificationCenterOpen} onOpenChange={setNotificationCenterOpen} />
          
          <div className="h-5 w-px bg-border mx-1"></div>
          
          <div className="flex items-center gap-2 px-2 text-sm">
            <Wifi className="w-4 h-4" />
            <Battery className="w-4 h-4" />
            <div className="flex flex-col">
              <span>{formatTime(time)}</span>
              <span className="text-xs text-muted-foreground">{formatDate(time)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right-click menu for desktop */}
      <DropdownMenu open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
        <DropdownMenuTrigger asChild>
          <div className="fixed inset-0 z-40" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={closeAllWindows}>
              <X className="mr-2 h-4 w-4" />
              <span>Close All Windows</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={showDesktop}>
              <Square className="mr-2 h-4 w-4" />
              <span>Show Desktop</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {}}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Taskbar Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Taskbar Help</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Taskbar;