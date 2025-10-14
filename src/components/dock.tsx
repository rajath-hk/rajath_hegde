'use client';

import React from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Folder, 
  Mail, 
  Briefcase,
  Award,
  User
} from 'lucide-react';


const DockIcon = ({ win, mouseX }: { win: WindowInstance; mouseX: MotionValue<number> }) => {
    const { focusWindow } = useWindows();
    const ref = React.useRef<HTMLButtonElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const scale = useTransform(distance, [-100, 0, 100], [1, 1.5, 1], {
      clamp: false,
    });

    const isFocused = win.isFocused && !win.isMinimized;
    const IconComponent = win.icon;

    return (
        <Tooltip key={win.id} delayDuration={100}>
            <TooltipTrigger asChild>
                <motion.button
                    ref={ref}
                    onClick={() => focusWindow(win.id)}
                    style={{ scale }}
                    className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-ring backdrop-blur-xl border border-white/30 dark:border-gray-600/30",
                        isFocused ? 'bg-white/40 dark:bg-gray-600/40' : 'bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-600/30'
                    )}
                    aria-label={`Focus ${win.title}`}
                >
                    <IconComponent className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                    <div
                        className={cn(
                            "absolute -bottom-1 w-1 h-1 rounded-full bg-gray-500 transition-all duration-200",
                            isFocused ? "opacity-100" : "opacity-0"
                        )}
                    />
                </motion.button>
            </TooltipTrigger>
            <TooltipContent side="top" className="mb-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-gray-200 rounded-lg">
                <p>{win.title}</p>
            </TooltipContent>
        </Tooltip>
    );
};

const MobileNav = () => {
  const { openWindow } = useWindows();
  
  const navItems = [
    { id: 'about', title: 'About', icon: User },
    { id: 'projects', title: 'Projects', icon: Folder },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'skills', title: 'Skills', icon: Award },
    { id: 'contact', title: 'Contact', icon: Mail },
  ];

  const handleOpenWindow = (appId: string) => {
    const appConfigMap: Record<string, any> = {
      'about': { 
        id: 'about', 
        title: 'My Story', 
        icon: User, 
        content: null, // Will be set in context
        defaultSize: { width: 550, height: 400 }, 
        x: 20, 
        y: 50 
      },
      'projects': { 
        id: 'projects', 
        title: 'Projects', 
        icon: Folder, 
        content: null, // Will be set in context
        defaultSize: { width: 650, height: 500 }, 
        x: 20, 
        y: 150 
      },
      'experience': { 
        id: 'my-work', 
        title: 'My Work', 
        icon: Briefcase, 
        content: null, // Will be set in context
        defaultSize: { width: 500, height: 350 }, 
        x: 20, 
        y: 250 
      },
      'skills': { 
        id: 'skills', 
        title: 'Skills', 
        icon: Award, 
        content: null, // Will be set in context
        defaultSize: { width: 600, height: 500 }, 
        x: 130, 
        y: 150 
      },
      'contact': { 
        id: 'contact', 
        title: 'Contact Me', 
        icon: Mail, 
        content: null, // Will be set in context
        defaultSize: { width: 450, height: 580 }, 
        x: 130, 
        y: 150 
      },
    };
    
    const appConfig = appConfigMap[appId];
    if (appConfig) {
      openWindow(appConfig);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-500/80 dark:bg-gray-600/80 backdrop-blur-lg border-t border-white/30 dark:border-gray-600/30 md:hidden flex justify-around py-2 z-[1000]">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant="ghost"
          size="sm"
          onClick={() => handleOpenWindow(item.id)}
          className="flex flex-col items-center gap-1 h-auto p-1 text-white hover:bg-gray-400/50 dark:hover:bg-gray-700/50"
          aria-label={item.title}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-xs">{item.title}</span>
        </Button>
      ))}
    </div>
  );
};

const Dock = () => {
  const { windows } = useWindows();
  const mouseX = useMotionValue(Infinity);

  return (
    <>
      <TooltipProvider>
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto bg-white/20 dark:bg-gray-700/20 backdrop-blur-lg border border-white/30 dark:border-gray-600/30 shadow-xl rounded-2xl p-2 z-[1000] flex flex-row items-end gap-2 h-14 hidden md:flex"
        >
          {windows.map(win => (
              <DockIcon key={win.id} win={win} mouseX={mouseX} />
          ))}
        </motion.div>
      </TooltipProvider>
      <MobileNav />
    </>
  );
};

export default Dock;