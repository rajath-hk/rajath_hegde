'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { AppConfig, WindowInstance } from '@/types';

import AboutContent from '@/components/content/about';
import ProjectsContent from '@/components/content/projects';
import ContactContent from '@/components/content/contact';
import ResumeContent from '@/components/content/resume';
import MyWorkContent from '@/components/content/my-work';
import SocialsContent from '@/components/content/socials';
import SkillsContent from '@/components/content/skills';
import TerminalContent from '@/components/content/terminal';
import SettingsContent from '@/components/content/settings';
import FileExplorerContent from '@/components/content/file-explorer';
import BrowserContent from '@/components/content/browser';
import MediaPlayerContent from '@/components/content/media-player';
import CalculatorContent from '@/components/content/calculator';
import WeatherContent from '@/components/content/weather';
import NotesContent from '@/components/content/notes';
import SystemInfoContent from '@/components/content/system-info';
import GalleryContent from '@/components/content/gallery';
import { FileText, Folder, Mail, Briefcase, Award, Terminal, Settings, HardDrive, Globe, Play, Calculator, Cloud, Notebook, Activity, Image } from 'lucide-react';

const ICON_STATE_KEY = 'retrofolio-icons-v2';
const WINDOW_STATE_KEY = 'retrofolio-windows-v2';

const LegalContent = () => <div className="p-6 text-card-foreground">This is my portfolio. To access this file, please contact me.</div>;

  const initialAppsData: AppConfig[] = [
  // Core personal apps (first row)
  { id: 'about', title: 'My Story', icon: FileText, content: null, defaultSize: { width: 550, height: 400 }, x: 20, y: 50, order: 1 },
  { id: 'resume', title: 'My Resume', icon: FileText, content: null, defaultSize: { width: 700, height: 800 }, x: 130, y: 50, order: 2 },
  { id: 'skills', title: 'Skills', icon: Award, content: null, defaultSize: { width: 700, height: 600 }, x: 240, y: 50, order: 3 },
  { id: 'projects', title: 'Projects', icon: Folder, content: null, defaultSize: { width: 650, height: 500 }, x: 350, y: 50, order: 4 },
  
  // Work and portfolio apps (second row)
  { id: 'my-work', title: 'My Work', icon: Briefcase, content: null, defaultSize: { width: 500, height: 350 }, x: 20, y: 200, order: 5 },
  { id: 'gallery', title: 'Gallery', icon: Image, content: null, defaultSize: { width: 800, height: 600 }, x: 130, y: 200, order: 6 },
  { id: 'media', title: 'Media Player', icon: Play, content: null, defaultSize: { width: 700, height: 500 }, x: 240, y: 200, order: 7 },
  
  // Utilities and tools (third row)
  { id: 'terminal', title: 'Terminal', icon: Terminal, content: null, defaultSize: { width: 650, height: 450 }, x: 20, y: 350, order: 8 },
  { id: 'explorer', title: 'File Explorer', icon: HardDrive, content: null, defaultSize: { width: 800, height: 500 }, x: 130, y: 350, order: 9 },
  { id: 'browser', title: 'Web Browser', icon: Globe, content: null, defaultSize: { width: 900, height: 600 }, x: 240, y: 350, order: 10 },
  { id: 'notes', title: 'Notes', icon: Notebook, content: null, defaultSize: { width: 600, height: 500 }, x: 350, y: 350, order: 11 },
  
  // System and settings (fourth row)
  { id: 'settings', title: 'Settings', icon: Settings, content: null, defaultSize: { width: 700, height: 500 }, x: 20, y: 500, order: 12 },
  { id: 'system', title: 'System Info', icon: Activity, content: null, defaultSize: { width: 700, height: 600 }, x: 130, y: 500, order: 13 },
  { id: 'calculator', title: 'Calculator', icon: Calculator, content: null, defaultSize: { width: 300, height: 400 }, x: 240, y: 500, order: 14 },
  { id: 'weather', title: 'Weather', icon: Cloud, content: null, defaultSize: { width: 500, height: 600 }, x: 300, y: 500, order: 15 },
  
  // Communication (bottom row)
  { id: 'contact', title: 'Contact Me', icon: Mail, content: null, defaultSize: { width: 450, height: 580 }, x: 20, y: 650, order: 16 },
  { id: 'socials', title: 'Socials', icon: Folder, content: null, defaultSize: { width: 450, height: 350 }, x: 130, y: 650, order: 17 },
  
  // Hidden/Legal
  { id: 'legal', title: 'Legal', icon: Folder, content: null, defaultSize: { width: 500, height: 300 }, x: 20, y: 800, order: 18 },
];

interface WindowContextType {
  windows: WindowInstance[];
  desktopIcons: AppConfig[];
  openWindow: (app: Partial<AppConfig>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  updateIconPosition: (id: string, x: number, y: number) => void;
  resetIconPositions: () => void;
  openAppById: (id: string) => void; // New function for keyboard shortcuts
  closeFocusedWindow: () => void; // New function for ESC key
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

// Helper to save serializable window state to localStorage
const saveWindowsState = (windowsToSave: WindowInstance[]) => {
  if (typeof window === 'undefined') return;
  const serializableWindows = windowsToSave.map(({ content, icon, ...rest }) => rest);
  localStorage.setItem(WINDOW_STATE_KEY, JSON.stringify(serializableWindows));
};

// Helper to save serializable icon state to localStorage
const saveIconsState = (iconsToSave: AppConfig[]) => {
  if (typeof window === 'undefined') return;
  const serializableIcons = iconsToSave.map(({ id, x, y }) => ({ id, x, y }));
  localStorage.setItem(ICON_STATE_KEY, JSON.stringify(serializableIcons));
};

// Create content element for a given app ID
const createContentElement = (id: string) => {
  switch (id) {
    case 'story':
      return <AboutContent />;
    case 'projects':
      return <ProjectsContent />;
    case 'my-work':
      return <MyWorkContent />;
    case 'resume':
      return <ResumeContent />;
    case 'skills':
      return <SkillsContent />;
    case 'contact':
      return <ContactContent />;
    case 'socials':
      return <SocialsContent />;
    case 'terminal':
      return <TerminalContent />;
    case 'settings':
      return <SettingsContent />;
    case 'explorer':
      return <FileExplorerContent />;
    case 'browser':
      return <BrowserContent />;
    case 'media':
      return <MediaPlayerContent />;
    case 'calculator':
      return <CalculatorContent />;
    case 'weather':
      return <WeatherContent />;
    case 'notes':
      return <NotesContent />;
    case 'system':
      return <SystemInfoContent />;
    case 'gallery':
      return <GalleryContent />;
    case 'legal':
      return <LegalContent />;
    default:
      return <div>Application not found</div>;
  }
};

export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [desktopIcons, setDesktopIcons] = useState<AppConfig[]>(initialAppsData);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [windowDimensions, setWindowDimensions] = useState({width: 0, height: 0});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set up resize listener and initial dimensions
    const updateDims = () => setWindowDimensions({width: window.innerWidth, height: window.innerHeight});
    
    checkMobile();
    updateDims();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', updateDims);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', updateDims);
    };
  }, []);

  // Load state from localStorage once dimensions are available
  useEffect(() => {
    if (typeof window === 'undefined' || windowDimensions.width === 0 || isLoaded) return;
    
    // Load windows state
    try {
      const savedWindows = localStorage.getItem(WINDOW_STATE_KEY);
      if (savedWindows) {
        const parsedWindows = JSON.parse(savedWindows);
        setWindows(parsedWindows.map((win: any) => {
          const appConfig = initialAppsData.find(app => app.id === win.id);
          
          // Ensure window is within screen bounds
          let x = win.x;
          let y = win.y;
          
          // Boundary checks to ensure window is visible
          if (typeof x === 'number' && typeof y === 'number') {
            x = Math.max(0, Math.min(x, windowDimensions.width - (win.width || 300)));
            y = Math.max(0, Math.min(y, windowDimensions.height - (win.height || 200)));
          } else {
            // Default positioning if none exists
            x = appConfig?.x ?? 100;
            y = appConfig?.y ?? 100;
          }
          
          return {
            ...win,
            x,
            y,
            icon: appConfig?.icon || FileText,
            content: createContentElement(win.id),
            defaultSize: appConfig?.defaultSize
          };
        }));
      }
    } catch (e) {
      console.warn('Failed to load window state from localStorage:', e);
    }
    
    // Load icons state
    try {
      const savedIcons = localStorage.getItem(ICON_STATE_KEY);
      if (savedIcons) {
        const parsedIcons = JSON.parse(savedIcons);
        setDesktopIcons(prevIcons => 
          prevIcons.map(icon => {
            const savedIcon = parsedIcons.find((si: any) => si.id === icon.id);
            // Only update position, keep the original content
            if (savedIcon) {
              return { ...icon, x: savedIcon.x, y: savedIcon.y };
            }
            return icon;
          })
        );
      }
    } catch (e) {
      console.warn('Failed to load icon state from localStorage:', e);
    }
    
    // Set the content for desktop icons
    setDesktopIcons(prevIcons => 
      prevIcons.map(icon => ({
        ...icon,
        content: createContentElement(icon.id)
      }))
    );
    
    setIsLoaded(true);
  }, [windowDimensions, isLoaded]);

  const focusWindow = (id: string) => {
    setZIndexCounter(prev => prev + 1);
    setWindows(prevWindows => {
        const newWindows = prevWindows.map(win =>
            win.id === id
            ? { ...win, zIndex: zIndexCounter + 1, isFocused: true, isMinimized: false }
            : { ...win, isFocused: false }
        );
        saveWindowsState(newWindows);
        return newWindows;
    });
  };

  const openWindow = (app: Partial<AppConfig>) => {
    const id = app.id;
    if (!id) return; // nothing to open

    setWindows(prev => {
      const existingWindow = prev.find(w => w.id === id);
      if (existingWindow) {
        // If window exists, bring it to front and unminimize it
        return prev.map(w => 
          w.id === id
            ? { ...w, isMinimized: false, zIndex: Math.max(...prev.map(win => win.zIndex), 0) + 1, isFocused: true } 
            : { ...w, isFocused: false }
        );
      } else {
        // Create new window with proper content
        const content = createContentElement(id);

        // Adjust default position and size for mobile
        let x = app.x ?? 100;
        let y = app.y ?? 100;
        let width = app.defaultSize?.width ?? 500;
        let height = app.defaultSize?.height ?? 400;
        
        if (isMobile) {
          // Center window on mobile with appropriate size
          x = Math.max(0, (windowDimensions.width - Math.min(windowDimensions.width - 20, width)) / 2);
          y = 60;
          width = Math.min(windowDimensions.width - 20, width);
          height = Math.min(windowDimensions.height - 100, height);
        }
        
        const newWindow: WindowInstance = {
          id: id,
          title: app.title ?? 'Untitled',
          icon: app.icon ?? FileText,
          content,
          defaultSize: app.defaultSize,
          x,
          y,
          width,
          height,
          zIndex: Math.max(...prev.map(w => w.zIndex), 0) + 1,
          isMinimized: false,
          isMaximized: false,
          isFocused: true,
        };
        
        // Unfocus other windows
        const updatedWindows = [...prev, newWindow].map(w => 
          w.id === id ? { ...w, isFocused: true } : { ...w, isFocused: false }
        );
        
        return updatedWindows;
      }
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prev => {
        const newWindows = prev.filter(win => win.id !== id);
        saveWindowsState(newWindows);
        return newWindows;
    });
  };
  
  const toggleMinimize = (id: string) => {
    setWindows(prev => {
        const newWindows = prev.map(win => {
            if (win.id === id) {
                const isMinimized = !win.isMinimized;
                return { ...win, isMinimized, isFocused: !isMinimized };
            }
            return win;
        });
        saveWindowsState(newWindows);
        return newWindows;
    });
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev => {
        const newWindows = prev.map(win => {
            if (win.id === id) {
                if (win.isMaximized) {
                    return { ...win, isMaximized: false, width: win.defaultSize?.width || 500, height: win.defaultSize?.height || 400, x: (windowDimensions.width - (win.defaultSize?.width || 500)) / 2, y: (windowDimensions.height - (win.defaultSize?.height || 400)) / 3 };
                } else {
                    return { ...win, isMaximized: true, width: windowDimensions.width, height: windowDimensions.height - 32, x: 0, y: 32 };
                }
            }
            return win;
        });
        saveWindowsState(newWindows);
        return newWindows;
    });
  }

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(prev => {
        const newWindows = prev.map(win => win.id === id ? { ...win, x, y } : win);
        saveWindowsState(newWindows);
        return newWindows;
    });
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows(prev => {
        const newWindows = prev.map(win => win.id === id ? { ...win, width, height } : win);
        saveWindowsState(newWindows);
        return newWindows;
    });
  };

  const updateIconPosition = (id: string, x: number, y: number) => {
    setDesktopIcons(prev => {
        const newIcons = prev.map(icon => icon.id === id ? { ...icon, x, y } : icon);
        saveIconsState(newIcons);
        return newIcons;
    });
  };
  
  const resetIconPositions = () => {
    setDesktopIcons(prevIcons => {
        const resetIcons = prevIcons.map(icon => {
            const initialIcon = initialAppsData.find(i => i.id === icon.id);
            return initialIcon ? { ...icon, x: initialIcon.x, y: initialIcon.y } : icon;
        });
        // Save the reset positions
        saveIconsState(resetIcons);
        return resetIcons;
    });
  };
  
  const openAppById = (id: string) => {
    const appConfig = initialAppsData.find(app => app.id === id);
    if (appConfig) {
      openWindow(appConfig);
    }
  };
  
  const closeFocusedWindow = () => {
    setWindows(prev => {
      const focusedWindow = prev.find(window => window.isFocused);
      if (focusedWindow) {
        const newWindows = prev.filter(win => win.id !== focusedWindow.id);
        saveWindowsState(newWindows);
        return newWindows;
      }
      return prev;
    });
  };

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
      openAppById,
      closeFocusedWindow
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