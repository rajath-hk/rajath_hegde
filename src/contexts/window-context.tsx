'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { AppConfig, WindowInstance } from '@/types';

import AboutContent from '@/components/content/about';
import ProjectsContent from '@/components/content/projects';
import ContactContent from '@/components/content/contact';
import ResumeContent from '@/components/content/resume';
import MyWorkContent from '@/components/content/my-work';
import SocialsContent from '@/components/content/socials';
import LandingContent from '@/components/content/landing';
import StoryContent from '@/components/content/story';
import { FileText, Folder, Mail, Briefcase } from 'lucide-react';

const ICON_STATE_KEY = 'retrofolio-icons-v2';
const WINDOW_STATE_KEY = 'retrofolio-windows-v2';

const LegalContent = () => <div className="p-6 text-card-foreground">This is my portfolio. To access this file, please contact me.</div>;

const initialAppsData: AppConfig[] = [
  { id: 'landing', title: 'Home', icon: FileText, content: <LandingContent />, defaultSize: { width: 700, height: 420 }, x: 20, y: 20 },
  { id: 'about', title: 'My Story', icon: FileText, content: <AboutContent />, defaultSize: { width: 550, height: 400 }, x: 20, y: 100 },
  { id: 'projects', title: 'Projects', icon: Folder, content: <ProjectsContent />, defaultSize: { width: 650, height: 500 }, x: 20, y: 150 },
  { id: 'my-work', title: 'My Work', icon: Briefcase, content: <MyWorkContent />, defaultSize: { width: 500, height: 350 }, x: 20, y: 250 },
  { id: 'resume', title: 'My Resume', icon: FileText, content: <ResumeContent />, defaultSize: { width: 700, height: 800 }, x: 130, y: 50 },
  { id: 'contact', title: 'Contact Me', icon: Mail, content: <ContactContent />, defaultSize: { width: 450, height: 580 }, x: 130, y: 150 },
  { id: 'socials', title: 'Socials', icon: Folder, content: <SocialsContent />, defaultSize: { width: 450, height: 350 }, x: 130, y: 250 },
  { id: 'story', title: 'Testimonials', icon: Folder, content: <StoryContent />, defaultSize: { width: 550, height: 400 }, x: 20, y: 350 },
  { id: 'legal', title: 'Legal', icon: Folder, content: <LegalContent />, defaultSize: { width: 500, height: 300 }, x: 20, y: 450 },
];

interface WindowContextType {
  windows: WindowInstance[];
  desktopIcons: AppConfig[];
  openWindow: (app: AppConfig) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  updateIconPosition: (id: string, x: number, y: number) => void;
  resetIconPositions: () => void;
  isMobile: boolean;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [desktopIcons, setDesktopIcons] = useState<AppConfig[]>(initialAppsData);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if we're on mobile
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    
    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);
    }
    
    // Load saved icon positions
    if (typeof localStorage !== 'undefined') {
      const savedIcons = localStorage.getItem(ICON_STATE_KEY);
      if (savedIcons) {
        try {
          const parsedIcons = JSON.parse(savedIcons);
          setDesktopIcons(prev => 
            prev.map(icon => {
              const savedIcon = parsedIcons.find((saved: AppConfig) => saved.id === icon.id);
              return savedIcon ? { ...icon, x: savedIcon.x, y: savedIcon.y } : icon;
            })
          );
        } catch (e) {
          console.error('Failed to parse saved icon positions', e);
        }
      }
      
      // Load saved window states
      const savedWindows = localStorage.getItem(WINDOW_STATE_KEY);
      if (savedWindows) {
        try {
          const parsedWindows = JSON.parse(savedWindows);
          setWindows(parsedWindows);
        } catch (e) {
          console.error('Failed to parse saved window states', e);
        }
      }
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

  // Save icon positions to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(ICON_STATE_KEY, JSON.stringify(desktopIcons));
    }
  }, [desktopIcons, mounted]);

  // Save window states to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(WINDOW_STATE_KEY, JSON.stringify(windows));
    }
  }, [windows, mounted]);

  const openWindow = (app: AppConfig) => {
    setWindows(prev => {
      const existingWindow = prev.find(w => w.id === app.id);
      if (existingWindow) {
        // If window exists, bring it to front, unminimize it, and focus it
        return prev.map(w =>
          w.id === app.id
            ? {
                ...w,
                isMinimized: false,
                isFocused: true,
                zIndex: Math.max(...prev.map(win => win.zIndex), 0) + 1,
              }
            : { ...w, isFocused: false }
        );
      } else {
        // Create new window (unfocus others, then append)
        const newWindow: WindowInstance = {
          ...app,
          x: app.x ?? 100,
          y: app.y ?? 100,
          width: app.defaultSize?.width ?? 500,
          height: app.defaultSize?.height ?? 400,
          zIndex: Math.max(...prev.map(w => w.zIndex), 0) + 1,
          isMinimized: false,
          isMaximized: false,
          isFocused: true,
        };
        return [...prev.map(w => ({ ...w, isFocused: false })), newWindow];
      }
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => {
      const maxZIndex = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(w => 
        w.id === id 
          ? { ...w, zIndex: maxZIndex + 1, isFocused: true, isMinimized: false } 
          : { ...w, isFocused: false }
      );
    });
  };

  const toggleMinimize = (id: string) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      )
    );
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === id ? { ...w, x, y } : w
      )
    );
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === id ? { ...w, width, height } : w
      )
    );
  };

  const updateIconPosition = (id: string, x: number, y: number) => {
    setDesktopIcons(prev => 
      prev.map(icon => 
        icon.id === id ? { ...icon, x, y } : icon
      )
    );
  };

  const resetIconPositions = () => {
    setDesktopIcons(prev => 
      prev.map(icon => {
        const initialApp = initialAppsData.find(app => app.id === icon.id);
        return initialApp ? { ...icon, x: initialApp.x, y: initialApp.y } : icon;
      })
    );
  };

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  return (
    <WindowContext.Provider value={{
      windows,
      desktopIcons,
      openWindow,
      closeWindow,
      focusWindow,
      toggleMinimize,
      toggleMaximize,
      updateWindowPosition,
      updateWindowSize,
      updateIconPosition,
      resetIconPositions,
      isMobile
    }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
};
