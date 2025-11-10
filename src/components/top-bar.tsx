'use client';

import React, { useState } from 'react';
import { useWindows } from '@/contexts/window-context';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Bell, 
  ChevronDown,
  User,
  Settings,
  Power,
  Minimize2
} from 'lucide-react';
import StartMenu from '@/components/start-menu';
import SystemSearch from '@/components/system-search';

const TopBar = () => {
  const { windows, closeWindow, toggleMinimize, desktopIcons, openWindow } = useWindows();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Helper: find an icon/app by id and open it (avoids repeating guarded logic)
  const openIconById = (id: string) => {
    const app = (desktopIcons || []).find(i => i.id === id);
    if (app) openWindow(app);
  };

  // Filter minimized windows for the dock
  const minimizedWindows = windows.filter(win => win.isMinimized);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-8 bg-background/80 backdrop-blur-xl border-b flex items-center justify-between px-2 z-40">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 hover:bg-accent"
            onClick={() => setShowStartMenu(!showStartMenu)}
          >
            <span className="font-bold text-sm">PortfolioOS</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>
        
        {/* Dock for minimized windows */}
        <div className="flex items-center space-x-1">
          {minimizedWindows.map((win) => (
            <Button
              key={win.id}
              variant="ghost"
              size="sm"
              className="h-6 px-2 hover:bg-accent"
              onClick={() => toggleMinimize(win.id)}
            >
              <win.icon className="w-3 h-3 mr-1" />
              <span className="text-xs max-w-[60px] truncate">{win.title}</span>
              <Minimize2 className="w-3 h-3 ml-1" />
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-accent"
            onClick={() => setShowSearch(true)}
          >
            <Search className="w-3 h-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-accent"
          >
            <Bell className="w-3 h-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-accent"
            onClick={() => openIconById('about')}
          >
            <User className="w-3 h-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-accent"
            onClick={() => openIconById('settings')}
          >
            <Settings className="w-3 h-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-accent"
            onClick={() => openIconById('legal')}
          >
            <Power className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      {showStartMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowStartMenu(false)}
          />
          <StartMenu />
        </>
      )}
      
      <SystemSearch open={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
};

export default TopBar;