'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, Suspense } from 'react';
import type { AppConfig, WindowInstance } from '@/types';

import { FileText, Folder, Mail, Briefcase } from 'lucide-react';

// Constants for localStorage keys
const ICON_STATE_KEY = 'retrofolio-icons-v2';
const WINDOW_STATE_KEY = 'retrofolio-windows-v2';

// Define a type for our content components
type ContentComponent = React.ComponentType;

// Create lazy-loaded components with better error handling
const getContentComponent = (id: string): ContentComponent => {
  try {
    switch (id) {
      case 'landing':
        return React.lazy(() => import('@/components/content/landing'));
      case 'about':
        return React.lazy(() => import('@/components/content/about'));
      case 'projects':
        return React.lazy(() => import('@/components/content/projects'));
      case 'my-work':
        return React.lazy(() => import('@/components/content/my-work'));
      case 'resume':
        return React.lazy(() => import('@/components/content/resume'));
      case 'contact':
        return React.lazy(() => import('@/components/content/contact'));
      case 'socials':
        return React.lazy(() => import('@/components/content/socials'));
      case 'story':
        return React.lazy(() => import('@/components/content/story'));
      case 'legal':
        const LegalContent = () => <div className="p-6 text-card-foreground">This is my portfolio. To access this file, please contact me.</div>;
        return LegalContent;
      default:
        return () => <div>Content not found</div>;
    }
  } catch (error) {
    console.error(`Failed to load component for ${id}:`, error);
    return () => <div>Error loading content</div>;
  }
};

// Store component references instead of React elements
const createContentComponent = (id: string) => {
  return getContentComponent(id);
};

const initialAppsData = [
  { id: 'landing', title: 'Home', icon: FileText, content: undefined, defaultSize: { width: 700, height: 420 }, x: 20, y: 20 },
  { id: 'about', title: 'My Story', icon: FileText, content: undefined, defaultSize: { width: 550, height: 400 }, x: 20, y: 100 },
  { id: 'projects', title: 'Projects', icon: Folder, content: undefined, defaultSize: { width: 650, height: 500 }, x: 20, y: 150 },
  { id: 'my-work', title: 'My Work', icon: Briefcase, content: undefined, defaultSize: { width: 500, height: 350 }, x: 20, y: 250 },
  { id: 'resume', title: 'My Resume', icon: FileText, content: undefined, defaultSize: { width: 700, height: 800 }, x: 130, y: 50 },
  { id: 'contact', title: 'Contact Me', icon: Mail, content: undefined, defaultSize: { width: 450, height: 580 }, x: 130, y: 150 },
  { id: 'socials', title: 'Socials', icon: Folder, content: undefined, defaultSize: { width: 450, height: 350 }, x: 130, y: 250 },
  { id: 'story', title: 'Testimonials', icon: Folder, content: undefined, defaultSize: { width: 550, height: 400 }, x: 20, y: 350 },
  { id: 'legal', title: 'Legal', icon: Folder, content: undefined, defaultSize: { width: 500, height: 300 }, x: 20, y: 450 },
] as const satisfies AppConfig[];

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
                    const initialApp = initialAppsData.find(app => app.id === icon.id);
                    return savedIcon && initialApp ? { ...icon, x: savedIcon.x, y: savedIcon.y, icon: initialApp.icon } : icon;
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
          // Validate that we have an array
          if (Array.isArray(parsedWindows)) {
            const windowsWithContent = parsedWindows
              .map((win: any) => {
                // Validate window structure
                if (!win || !win.id) {
                  console.warn('Invalid window data found in localStorage', win);
                  return null;
                }
                
                try {
                  const contentComponent = createContentComponent(win.id);
                  return {
                    ...win,
                    content: contentComponent,
                  };
                } catch (error) {
                  console.error(`Failed to create content component for window ${win.id}:`, error);
                  return null;
                }
              })
              .filter(Boolean) as WindowInstance[]; // Filter out null values
            
            setWindows(windowsWithContent);
          } else {
            console.warn('Invalid window data structure in localStorage');
            localStorage.removeItem(WINDOW_STATE_KEY);
          }
        } catch (e) {
          console.error('Failed to parse saved window states', e);
          // Reset windows state if parsing fails
          localStorage.removeItem(WINDOW_STATE_KEY);
          setWindows([]);
        }
      }
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, []);

  // Clear invalid localStorage data
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      try {
        const savedWindows = localStorage.getItem(WINDOW_STATE_KEY);
        if (savedWindows) {
          const parsedWindows = JSON.parse(savedWindows);
          if (!Array.isArray(parsedWindows)) {
            localStorage.removeItem(WINDOW_STATE_KEY);
          }
        }
      } catch (e) {
        console.error('Failed to validate saved window states', e);
        localStorage.removeItem(WINDOW_STATE_KEY);
      }
    }
  }, []);

  // Save icon positions to localStorage
  useEffect(() => {
    if (mounted && typeof localStorage !== 'undefined') {
      localStorage.setItem(ICON_STATE_KEY, JSON.stringify(desktopIcons));
    }
  }, [desktopIcons, mounted]);

  // Save window states to localStorage
  useEffect(() => {
    if (mounted && typeof localStorage !== 'undefined') {
      localStorage.setItem(WINDOW_STATE_KEY, JSON.stringify(windows));
    }
  }, [windows, mounted]);

  const openWindow = (app: AppConfig) => {
    try {
      setWindows(prev => {
        const existingWindow = prev.find(w => w.id === app.id);
        if (existingWindow) {
          // If window exists, bring it to front and unminimize it
          return prev.map(w => 
            w.id === app.id 
              ? { ...w, isMinimized: false, zIndex: Math.max(0, ...prev.map(win => win.zIndex)) + 1 } 
              : w
          );
        } else {
          // Create new window with component reference
          const contentComponent = createContentComponent(app.id);
          // Validate that we have a proper component
          if (!contentComponent) {
            console.error(`Failed to create content component for ${app.id}`);
            return prev;
          }
          
          const newWindow: WindowInstance = {
            ...app,
            content: contentComponent,
            x: app.x ?? 100,
            y: app.y ?? 100,
            width: app.defaultSize?.width ?? 500,
            height: app.defaultSize?.height ?? 400,
            zIndex: Math.max(...prev.map(w => w.zIndex), 0) + 1,
            isMinimized: false,
            isMaximized: false,
            isFocused: true,
          };
          return [...prev, newWindow];
        }
      });
      
      // Unfocus other windows
      setWindows(prev => 
        prev.map(w => 
          w.id === app.id ? { ...w, isFocused: true } : { ...w, isFocused: false }
        )
      );
    } catch (error) {
      console.error('Error opening window:', error);
    }
  };

  const closeWindow = (id: string) => {
    try {
      setWindows(prev => prev.filter(w => w.id !== id));
    } catch (error) {
      console.error('Error closing window:', error);
    }
  };

  const focusWindow = (id: string) => {
    try {
      setWindows(prev => {
        const maxZIndex = Math.max(0, ...prev.map(w => w.zIndex));
        return prev.map(w => 
          w.id === id 
            ? { ...w, zIndex: maxZIndex + 1, isFocused: true, isMinimized: false } 
            : { ...w, isFocused: false }
        );
      });
    } catch (error) {
      console.error('Error focusing window:', error);
    }
  };

  const toggleMinimize = (id: string) => {
    try {
      setWindows(prev => 
        prev.map(w => 
          w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
        )
      );
    } catch (error) {
      console.error('Error toggling window minimize:', error);
    }
  };

  const toggleMaximize = (id: string) => {
    try {
      setWindows(prev => 
        prev.map(w => 
          w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
        )
      );
    } catch (error) {
      console.error('Error toggling window maximize:', error);
    }
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
