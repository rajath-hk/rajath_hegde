'use client';

import React from 'react';
import { WindowProvider, useWindows } from '@/contexts/window-context';
import DesktopIcon from './desktop-icon';
import Window from './window';
import Dock from './dock';
import {
  Maximize,
  Sun,
  Moon,
  Bell,
  Power,
  Wallpaper,
  ArrowDownUp,
  RefreshCw,
  Folder,
} from 'lucide-react';
import { useTheme } from 'next-themes';
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

const TopBar = () => {
  const { theme, setTheme } = useTheme();
  const [time, setTime] = React.useState('');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    };
    updateClock();
    const timerId = setInterval(updateClock, 1000 * 60);
    return () => clearInterval(timerId);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-8 bg-background/80 backdrop-blur-lg text-foreground text-sm flex items-center justify-between px-3 z-[2000] border-b">
      <div className="flex items-center gap-2">
        <Maximize size={16} className="cursor-pointer" />
        {mounted && (
          <button onClick={toggleTheme} className="p-1 rounded-md">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}
      </div>
      <div className="font-medium">
        {mounted ? time : ''}
      </div>
      <div className="flex items-center gap-4">
        <Bell size={16} className="cursor-pointer" />
        <Power size={16} className="cursor-pointer" />
      </div>
    </div>
  );
};


const Desktop = () => {
  const { windows, desktopIcons, resetIconPositions } = useWindows();
  const desktopRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={desktopRef}
        id="desktop-area"
        className="absolute inset-0 pt-8"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="absolute inset-0" />
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
            <DropdownMenuItem onClick={resetIconPositions}>
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Reset Icon Positions</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <Wallpaper className="mr-2 h-4 w-4" />
              <span>Change Wallpaper</span>
            </DropdownMenuItem>
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
    </>
  );
};


const OsUi = () => {
  return (
    <WindowProvider>
      <div className="fixed inset-0 bg-background font-body select-none">
        <TopBar />
        <Desktop />
        <Dock />
      </div>
    </WindowProvider>
  );
};

export default OsUi;
