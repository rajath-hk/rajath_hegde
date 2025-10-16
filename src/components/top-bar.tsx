'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Expand, Shrink, Sun, Moon, Power } from 'lucide-react';
import NotificationCenter from '@/components/notification-center';

const TopBar = () => {
  const { theme, setTheme } = useTheme();
  const [time, setTime] = React.useState('');
  const [mounted, setMounted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    };
    updateClock();
    const timerId = setInterval(updateClock, 1000 * 60);

    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    
    return () => {
        clearInterval(timerId);
        document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-8 bg-background/80 backdrop-blur-lg text-foreground text-sm flex items-center justify-between px-3 z-[2000] border-b">
      <div className="flex items-center gap-1">
        <button onClick={toggleFullScreen} className="p-1 rounded-md" aria-label="Toggle Fullscreen">
          {isFullscreen ? <Shrink size={16} /> : <Expand size={16} />}
        </button>
        {mounted && (
          <button onClick={toggleTheme} className="p-1 rounded-md" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}
      </div>
      <div className="font-medium">
        {mounted ? time : ''}
      </div>
      <div className="flex items-center gap-4">
        <NotificationCenter />
        <Power size={16} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default TopBar;
