"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useWindows } from '@/contexts/window-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Expand, Shrink, Sun, Moon, Bell } from 'lucide-react';

const notifications = [
  { title: "Welcome!", description: "Thanks for checking out my portfolio." },
  { title: "New Feature", description: "You can drag icons and windows around." },
  { title: "Tip", description: "Right-click the desktop for more options." }
];

const TopBar = () => {
  const { theme, setTheme } = useTheme();
  const { openWindow, desktopIcons } = useWindows();
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateClock();
    const intervalId = setInterval(updateClock, 60000);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // 防止 SSR 错误：仅在客户端渲染
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-8 bg-black/10 dark:bg-white/10 backdrop-blur-lg border-b border-black/10 dark:border-white/10 flex items-center justify-between px-4 text-sm z-50">
      <div className="flex items-center gap-4">
        <div className="font-medium">Rajath Hegde</div>
        <div className="hidden sm:block">{time}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors" aria-label="Notifications">
              <Bell className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification, index) => (
              <DropdownMenuItem key={index} className="flex flex-col items-start p-3">
                <div className="font-medium">{notification.title}</div>
                <div className="text-sm text-muted-foreground">{notification.description}</div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <button 
          onClick={toggleFullscreen}
          className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors" aria-label="Theme">
              {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <Sun className="mr-2 h-4 w-4" /> {/* 使用 Sun 作为占位符，可根据需要替换为其他图标 */}
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopBar;
