'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWindows } from '@/contexts/window-context';
import DesktopIcon from '@/components/desktop-icon';
import Window from '@/components/window';
import TopBar from '@/components/top-bar';
import SystemSearch from '@/components/system-search';
import NotificationCenter from '@/components/notification-center';
import {
  ArrowDownUp,
  RefreshCw,
  Wallpaper,
  Folder,
  Image,
  Monitor,
  Palette,
  Minimize2
} from 'lucide-react';

const Desktop = () => {
  const { windows, desktopIcons, resetIconPositions, toggleMinimize } = useWindows();
  const desktopRef = React.useRef<HTMLDivElement>(null);
  const [contextMenuOpen, setContextMenuOpen] = React.useState(false);
  const [contextMenuPosition, setContextMenuPosition] = React.useState({ x: 0, y: 0 });
  const [wallpaper, setWallpaper] = useState('/wallpapers/default.jpg');
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContextMenu = (event: React.MouseEvent) => {
    // Prevent the default browser context menu
    event.preventDefault();
    
    // Set the position for our custom context menu
    setContextMenuPosition({ x: event.clientX, y: event.clientY });

    // Show the context menu
    setContextMenuOpen(true);
  };

  // Handle wallpaper change
  const changeWallpaper = (newWallpaper: string) => {
    setWallpaper(newWallpaper);
    localStorage.setItem('portfolio-wallpaper', newWallpaper);
  };

  // Load wallpaper from localStorage on mount
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('portfolio-wallpaper');
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }
  }, []);

  // Filter minimized windows for the dock
  const minimizedWindows = windows.filter(win => win.isMinimized);

  return (
    <>
      <TopBar />
      
      <div
        ref={desktopRef}
        id="desktop-area"
        className="absolute inset-0 pt-8 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${wallpaper})` }}
        onContextMenu={handleContextMenu}
      >
        <DropdownMenu open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div
              style={{
                position: 'fixed',
                left: contextMenuPosition.x,
                top: contextMenuPosition.y,
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                <span>Sort by</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem disabled>Name</DropdownMenuItem>
                  <DropdownMenuItem disabled>Date Modified</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            
            <DropdownMenuItem onClick={() => { resetIconPositions(); setContextMenuOpen(false); }}>
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Reset Icon Positions</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Wallpaper className="mr-2 h-4 w-4" />
                <span>Wallpaper</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => { changeWallpaper('/wallpapers/default.jpg'); setContextMenuOpen(false); }}>
                    <Image className="mr-2 h-4 w-4" />
                    <span>Default</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { changeWallpaper('/wallpapers/dark-blue.jpg'); setContextMenuOpen(false); }}>
                    <Palette className="mr-2 h-4 w-4" />
                    <span>Dark Blue</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { changeWallpaper('/wallpapers/gradient.jpg'); setContextMenuOpen(false); }}>
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>Gradient</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            
            <DropdownMenuItem disabled>
              <Folder className="mr-2 h-4 w-4" />
              <span>New Folder</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {desktopIcons.map((app) => (
          <DesktopIcon key={app.id} app={app} constraintsRef={desktopRef} />
        ))}
      </div>

      <AnimatePresence>
        {windows.map((win) => (
          !win.isMinimized && <Window key={win.id} {...win} />
        ))}
      </AnimatePresence>
      
      {/* Mobile bottom navigation for minimized windows */}
      {isMobile && minimizedWindows.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-xl border-t flex items-center justify-center px-2 z-40">
          <div className="flex items-center space-x-2 overflow-x-auto w-full">
            {minimizedWindows.map((win) => (
              <button
                key={win.id}
                className="flex flex-col items-center justify-center p-1 min-w-[60px]"
                onClick={() => toggleMinimize(win.id)}
              >
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <win.icon className="w-4 h-4" />
                </div>
                <span className="text-xs mt-1 truncate max-w-[60px]">{win.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <SystemSearch />
      <NotificationCenter 
        open={showNotificationCenter} 
        onOpenChange={setShowNotificationCenter} 
      />
    </>
  );
};

export default Desktop;