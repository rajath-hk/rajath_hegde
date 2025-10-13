"use client";

import React from 'react';
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
import { Expand, Shrink, Sun, Moon, Bell, Power } from 'lucide-react';

const notifications = [
    { title: "Welcome!", description: "Thanks for checking out my portfolio." },
    { title: "New Feature", description: "You can drag icons and windows around." },
    { title: "Tip", description: "Right-click the desktop for more options." }
];

const TopBar = () => {
  const { theme, setTheme } = useTheme();
  const { openWindow, desktopIcons } = useWindows();
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
        <nav aria-label="Quick navigation" className="hidden sm:flex items-center gap-2 mr-2">
          <button onClick={() => openWindow(desktopIcons.find(d => d.id === 'landing')!)} className="px-2 py-0.5 rounded text-sm hover:bg-accent/10" aria-label="Open Home">Home</button>
          <button onClick={() => openWindow(desktopIcons.find(d => d.id === 'about')!)} className="px-2 py-0.5 rounded text-sm hover:bg-accent/10" aria-label="Open About">About</button>
          <button onClick={() => openWindow(desktopIcons.find(d => d.id === 'projects')!)} className="px-2 py-0.5 rounded text-sm hover:bg-accent/10" aria-label="Open Projects">Projects</button>
          <button onClick={() => openWindow(desktopIcons.find(d => d.id === 'resume')!)} className="px-2 py-0.5 rounded text-sm hover:bg-accent/10" aria-label="Open Resume">Resume</button>
          <button onClick={() => openWindow(desktopIcons.find(d => d.id === 'contact')!)} className="px-2 py-0.5 rounded text-sm hover:bg-accent/10" aria-label="Open Contact">Contact</button>
        </nav>
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative p-1 rounded-md" aria-label="Open Notifications">
                    <Bell size={16} />
                    {notifications.length > 0 && (
                        <span className="absolute top-1 right-1 block h-1.5 w-1.5 rounded-full bg-primary ring-1 ring-background" />
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                    notifications.map((notif, index) => (
                        <DropdownMenuItem key={index} className="flex-col items-start gap-1 cursor-default">
                            <div className="font-medium">{notif.title}</div>
                            <div className="text-xs text-muted-foreground">{notif.description}</div>
                        </DropdownMenuItem>
                    ))
                ) : (
                    <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
        <Power size={16} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default TopBar;
