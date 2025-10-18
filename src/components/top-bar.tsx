'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Bell, 
  ChevronDown,
  User,
  Settings,
  Power
} from 'lucide-react';
import StartMenu from '@/components/start-menu';
import SystemSearch from '@/components/system-search';

interface TopBarProps {
  onNotificationClick?: () => void;
}

const TopBar = ({ onNotificationClick }: TopBarProps) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
            onClick={onNotificationClick}
          >
            <Bell className="w-3 h-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-accent"
          >
            <User className="w-3 h-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-accent"
          >
            <Settings className="w-3 h-3" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 hover:bg-accent"
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
      
      {showSearch && (
        <SystemSearch onClose={() => setShowSearch(false)} />
      )}
    </>
  );
};

export default TopBar;