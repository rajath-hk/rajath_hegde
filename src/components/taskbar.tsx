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

const Taskbar = () => {
  const { windows, focusWindow, openWindow } = useWindows();
  const { theme, setTheme } = useTheme();
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <>
      {/* Ubuntu-style Menu Bar */}
      <div className="fixed top-0 left-0 right-0 h-6 bg-gray-500/80 dark:bg-gray-600/80 backdrop-blur-lg border-b border-gray-400/50 dark:border-gray-700/50 z-40 flex items-center justify-between px-4 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-medium text-white">PortfolioOS</span>
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-white hover:text-gray-200 transition-colors text-xs"
                onClick={() => handleStartApp(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-gray-400/50 dark:hover:bg-gray-700/50 transition-colors"
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? (
              <Sun className="h-3 w-3 text-white" />
            ) : (
              <Moon className="h-3 w-3 text-white" />
            )}
          </button>
          <div className="flex items-center gap-2 text-white">
            <Wifi className="h-3 w-3" />
            <Volume2 className="h-3 w-3" />
          </div>
          <div className="flex items-center gap-1 text-white">
            <span>{time}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      {/* Ubuntu-style Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto bg-white/20 dark:bg-gray-700/20 backdrop-blur-lg border border-white/30 dark:border-gray-600/30 shadow-xl rounded-2xl p-2 z-[1000] flex flex-row items-end gap-2 h-14 hidden md:flex">
        {/* Running Applications */}
        <div className="flex items-end gap-1 h-full">
          {windows
            .filter(window => !window.isMinimized)
            .map(window => {
              const IconComponent = window.icon;
              return (
                <Button
                  key={window.id}
                  variant="ghost"
                  size="icon"
                  className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
                    window.isFocused 
                      ? 'bg-white/40 dark:bg-gray-600/40' 
                      : 'hover:bg-white/30 dark:hover:bg-gray-600/30'
                  }`}
                  onClick={() => focusWindow(window.id)}
                  aria-label={`Focus ${window.title} window`}
                >
                  <IconComponent className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                </Button>
              );
            })}
        </div>
      </div>

      {/* Start Menu - Ubuntu-style Application Menu */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 w-96 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-xl shadow-xl z-50 p-4"
          >
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FileSearch className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-100/50 dark:bg-gray-600/50 border border-gray-300/50 dark:border-gray-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500/30 text-gray-800 dark:text-gray-200"
                placeholder="Search apps, files, and more..."
              />
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {startMenuApps.map(app => {
                const IconComponent = app.icon;
                return (
                  <button
                    key={app.id}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-white/40 dark:hover:bg-gray-600/40 transition-colors"
                    onClick={() => handleStartApp(app.id)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-gray-600/80 flex items-center justify-center mb-2 border border-white/30 dark:border-gray-500/30">
                      <IconComponent className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                    </div>
                    <span className="text-xs text-center text-gray-800 dark:text-gray-200">{app.title}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-300/30 dark:border-gray-600/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">RH</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Rajath Hegde</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Full Stack Developer</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border border-gray-300/50 dark:border-gray-500/50 text-gray-800 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-gray-600/40"
                  onClick={() => setStartMenuOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Taskbar;