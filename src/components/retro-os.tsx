'use client';

import React from 'react';
import { WindowProvider, useWindows } from '@/contexts/window-context';
import DesktopIcon from './desktop-icon';
import Window from './window';
import Dock from './dock';
import { ContextMenu } from './context-menu';
import { Maximize, Sun, Moon, Bell, Power } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence } from 'framer-motion';

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
    <div className="absolute top-0 left-0 right-0 h-8 bg-secondary/30 backdrop-blur-sm text-foreground text-sm flex items-center justify-between px-3 z-[2000] border-b">
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
  const { windows, desktopIcons, arrangeIcons } = useWindows();
  const { toast } = useToast();
  const [menu, setMenu] = React.useState<{ x: number, y: number, visible: boolean }>({ x: 0, y: 0, visible: false });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Only show context menu if right-clicking on the desktop itself, not on an icon or window
    if ((e.target as HTMLElement).id === 'desktop-background') {
      setMenu({ x: e.clientX, y: e.clientY, visible: true });
    } else {
       closeMenu();
    }
  };

  const closeMenu = () => {
    setMenu({ ...menu, visible: false });
  };
  
  const handleDesktopClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'desktop-background') {
      closeMenu();
    }
  };

  const handleNotImplemented = () => {
    toast({
      title: 'Feature Not Available',
      description: 'This feature has not been implemented yet.',
    });
  };

  return (
    <>
      <div id="desktop-background" className="absolute inset-0 pt-8" onContextMenu={handleContextMenu} onClick={handleDesktopClick}>
        {desktopIcons.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>
      {menu.visible && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={closeMenu}
          onArrangeIcons={arrangeIcons}
          onNotImplemented={handleNotImplemented}
        />
      )}
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
