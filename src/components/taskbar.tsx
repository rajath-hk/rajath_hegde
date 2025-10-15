'use client';

import React, { useState, useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Folder, 
  Mail, 
  Briefcase,
  Award,
  Terminal,
  FileSearch,
  Menu,
  ChevronUp,
  Wifi,
  Volume2,
  Battery,
  User,
  Phone,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const Taskbar = () => {
  const { windows, focusWindow, openWindow } = useWindows();
  const { theme, setTheme } = useTheme();
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const startMenuApps = [
    { id: 'terminal', title: 'Terminal', icon: Terminal },
    { id: 'about', title: 'About Me', icon: User },
    { id: 'projects', title: 'Projects', icon: Folder },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'skills', title: 'Skills', icon: Award },
    { id: 'resume', title: 'Resume', icon: FileText },
    { id: 'contact', title: 'Contact', icon: Mail },
    { id: 'blog', title: 'Blog', icon: FileSearch },
  ];

  const navItems = [
    { id: 'about', title: 'About', icon: User },
    { id: 'projects', title: 'Projects', icon: Folder },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'skills', title: 'Skills', icon: Award },
    { id: 'resume', title: 'Resume', icon: FileText },
    { id: 'contact', title: 'Contact', icon: Mail },
  ];

  const handleStartApp = (appId: string) => {
    const appConfigMap: Record<string, any> = {
      'terminal': { 
        id: 'terminal', 
        title: 'Terminal', 
        icon: Terminal, 
        content: null, // Will be set in context
        defaultSize: { width: 650, height: 450 }, 
        x: 100, 
        y: 100 
      },
      'about': { 
        id: 'about', 
        title: 'About Me', 
        icon: User, 
        content: null, // Will be set in context
        defaultSize: { width: 550, height: 400 }, 
        x: 120, 
        y: 120 
      },
      'projects': { 
        id: 'projects', 
        title: 'Projects', 
        icon: Folder, 
        defaultSize: { width: 650, height: 500 }, 
        x: 140, 
        y: 140 
      },
      'experience': { 
        id: 'my-work', 
        title: 'Experience', 
        icon: Briefcase, 
        defaultSize: { width: 500, height: 350 }, 
        x: 160, 
        y: 160 
      },
      'skills': { 
        id: 'skills', 
        title: 'Skills', 
        icon: Award, 
        defaultSize: { width: 600, height: 500 }, 
        x: 180, 
        y: 180 
      },
      'resume': { 
        id: 'resume', 
        title: 'Resume', 
        icon: FileText, 
        defaultSize: { width: 700, height: 800 }, 
        x: 200, 
        y: 200 
      },
      'contact': { 
        id: 'contact', 
        title: 'Contact', 
        icon: Mail, 
        defaultSize: { width: 450, height: 580 }, 
        x: 220, 
        y: 220 
      },
      'blog': { 
        id: 'blog', 
        title: 'Blog', 
        icon: FileSearch, 
        defaultSize: { width: 600, height: 500 }, 
        x: 240, 
        y: 240 
      },
    };
    
    const appConfig = appConfigMap[appId];
    if (appConfig) {
      openWindow(appConfig);
    }
    
    setStartMenuOpen(false);
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-md border-t border-border flex items-center justify-between px-2 sm:px-4 z-50",
      isMobile ? "h-14" : "h-12"
    )}>
      {/* Start Button */}
      <DropdownMenu open={startMenuOpen} onOpenChange={setStartMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={cn(
              "flex items-center gap-2 px-2 py-1 h-10 hover:bg-accent",
              isMobile ? "h-12" : "h-10"
            )}
            aria-label="Start menu"
          >
            <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">R</span>
            </div>
            <span className="hidden sm:inline font-medium">Start</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>Terminal</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>About Me</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Folder className="w-4 h-4" />
            <span>Projects</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>Experience</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Skills</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <FileSearch className="w-4 h-4" />
            <span>Blog</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Open Windows */}
      <div className="flex-1 flex justify-center mx-4 overflow-x-auto">
        <div className="flex gap-1 min-w-0">
          {windows.map((window) => (
            <Button
              key={window.id}
              variant={window.isFocused ? "default" : "outline"}
              className={cn(
                "h-8 px-2 text-xs truncate max-w-[120px]",
                isMobile ? "h-10 px-3" : "h-8 px-2"
              )}
              onClick={() => focusWindow(window.id)}
            >
              <window.icon className="w-4 h-4 mr-1.5" />
              <span className="truncate">{window.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={toggleTheme}
          className="p-1 rounded-full hover:bg-accent transition-colors"
          aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === 'dark' ? (
            <Sun className="h-3 w-3" />
          ) : (
            <Moon className="h-3 w-3" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <Wifi className="h-3 w-3" />
          <Volume2 className="h-3 w-3" />
        </div>
        <div className={cn(
          "flex items-center text-xs font-medium px-2 py-1 rounded",
          isMobile ? "text-[10px] px-1 py-0.5" : "text-xs px-2 py-1"
        )}>
          <span className="hidden sm:inline mr-2">{date}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;