'use client';

import React, { useState, useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Folder, 
  Mail, 
  Briefcase,
  Award,
  Terminal,
  FileSearch,
  Calendar,
  Menu,
  ChevronUp,
  Wifi,
  Volume2,
  Battery
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Taskbar = () => {
  const { windows, focusWindow, closeWindow } = useWindows();
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [startMenuOpen, setStartMenuOpen] = useState(false);

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

  const startMenuApps = [
    { id: 'terminal', title: 'Terminal', icon: Terminal },
    { id: 'about', title: 'About Me', icon: FileText },
    { id: 'projects', title: 'Projects', icon: Folder },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'skills', title: 'Skills', icon: Award },
    { id: 'resume', title: 'Resume', icon: FileText },
    { id: 'contact', title: 'Contact', icon: Mail },
    { id: 'blog', title: 'Blog', icon: FileSearch },
  ];

  const handleStartApp = (appId: string) => {
    const appConfigMap: Record<string, any> = {
      'terminal': { 
        id: 'terminal', 
        title: 'Terminal', 
        icon: Terminal, 
        defaultSize: { width: 600, height: 400 }, 
        x: 100, 
        y: 100 
      },
      'about': { 
        id: 'about', 
        title: 'About Me', 
        icon: FileText, 
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
      // We'll need to implement the openWindow function in the context
      // For now, we'll just log it
      console.log(`Opening app: ${appId}`);
    }
    
    setStartMenuOpen(false);
  };

  return (
    <>
      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/20 dark:bg-white/10 backdrop-blur-lg border-t border-border/30 z-40 flex items-center px-2">
        {/* Start Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-10 px-3 mr-2 flex items-center gap-2"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          aria-label="Start menu"
        >
          <Menu className="h-5 w-5" />
          <span className="hidden md:inline">Start</span>
        </Button>

        {/* Running Applications */}
        <div className="flex-1 flex items-center gap-1 h-full">
          {windows
            .filter(window => !window.isMinimized)
            .map(window => {
              const IconComponent = window.icon;
              return (
                <Button
                  key={window.id}
                  variant="ghost"
                  size="sm"
                  className={`h-10 px-3 flex items-center gap-2 ${
                    window.isFocused ? 'bg-white/20' : ''
                  }`}
                  onClick={() => focusWindow(window.id)}
                  aria-label={`Focus ${window.title} window`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden md:inline text-sm">{window.title}</span>
                </Button>
              );
            })}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-1">
          <Wifi className="h-4 w-4 text-muted-foreground" />
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Battery className="h-4 w-4 text-muted-foreground" />
          <div className="hidden md:flex items-center gap-1 px-2">
            <span className="text-sm">{time}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm">{date}</span>
          </div>
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-12 left-2 w-80 bg-card/80 backdrop-blur-xl border rounded-lg shadow-xl z-50 p-4"
          >
            <div className="grid grid-cols-4 gap-2">
              {startMenuApps.map(app => {
                const IconComponent = app.icon;
                return (
                  <button
                    key={app.id}
                    className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => handleStartApp(app.id)}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-center">{app.title}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">RH</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Rajath Hegde</p>
                    <p className="text-xs text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Sign out
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