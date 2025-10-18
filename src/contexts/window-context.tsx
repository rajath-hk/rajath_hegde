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
  { id: 'about', title: 'My Story', icon: FileText, content: <AboutContent />, defaultSize: { width: 550, height: 400 }, x: 20, y: 50 },
  { id: 'resume', title: 'My Resume', icon: FileText, content: <ResumeContent />, defaultSize: { width: 700, height: 800 }, x: 130, y: 50 },
  { id: 'skills', title: 'Skills', icon: Award, content: <SkillsContent />, defaultSize: { width: 700, height: 600 }, x: 240, y: 50 },
  { id: 'projects', title: 'Projects', icon: Folder, content: <ProjectsContent />, defaultSize: { width: 650, height: 500 }, x: 350, y: 50 },
  
  // Work and portfolio apps (second row)
  { id: 'my-work', title: 'My Work', icon: Briefcase, content: <MyWorkContent />, defaultSize: { width: 500, height: 350 }, x: 20, y: 200 },
  { id: 'gallery', title: 'Gallery', icon: Image, content: <GalleryContent />, defaultSize: { width: 800, height: 600 }, x: 130, y: 200 },
  { id: 'media', title: 'Media Player', icon: Play, content: <MediaPlayerContent />, defaultSize: { width: 700, height: 500 }, x: 240, y: 200 },
  
  // Utilities and tools (third row)
  { id: 'terminal', title: 'Terminal', icon: Terminal, content: <TerminalContent />, defaultSize: { width: 650, height: 450 }, x: 20, y: 350 },
  { id: 'explorer', title: 'File Explorer', icon: HardDrive, content: <FileExplorerContent />, defaultSize: { width: 800, height: 500 }, x: 130, y: 350 },
  { id: 'browser', title: 'Web Browser', icon: Globe, content: <BrowserContent />, defaultSize: { width: 900, height: 600 }, x: 240, y: 350 },
  { id: 'notes', title: 'Notes', icon: Notebook, content: <NotesContent />, defaultSize: { width: 600, height: 500 }, x: 350, y: 350 },
  
  // System and settings (fourth row)
  { id: 'settings', title: 'Settings', icon: Settings, content: <SettingsContent />, defaultSize: { width: 700, height: 500 }, x: 20, y: 500 },
  { id: 'system', title: 'System Info', icon: Activity, content: <SystemInfoContent />, defaultSize: { width: 700, height: 600 }, x: 130, y: 500 },
  { id: 'calculator', title: 'Calculator', icon: Calculator, content: <CalculatorContent />, defaultSize: { width: 300, height: 400 }, x: 240, y: 500 },
  { id: 'weather', title: 'Weather', icon: Cloud, content: <WeatherContent />, defaultSize: { width: 500, height: 600 }, x: 300, y: 500 },
  
  // Communication (bottom row)
  { id: 'contact', title: 'Contact Me', icon: Mail, content: <ContactContent />, defaultSize: { width: 450, height: 580 }, x: 20, y: 650 },
  { id: 'socials', title: 'Socials', icon: Folder, content: <SocialsContent />, defaultSize: { width: 450, height: 350 }, x: 130, y: 650 },
  
  // Hidden/Legal
  { id: 'legal', title: 'Legal', icon: Folder, content: <LegalContent />, defaultSize: { width: 500, height: 300 }, x: 20, y: 800 },
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


export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [desktopIcons, setDesktopIcons] = useState<AppConfig[]>(initialAppsData);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [windowDimensions, setWindowDimensions] = useState({width: 0, height: 0});
  const [isLoaded, setIsLoaded] = useState(false);

  // Set up resize listener and initial dimensions
  useEffect(() => {
    const updateDims = () => setWindowDimensions({width: window.innerWidth, height: window.innerHeight});
    window.addEventListener('resize', updateDims);
    updateDims();
    return () => window.removeEventListener('resize', updateDims);
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
          return {
            ...win,
            icon: appConfig?.icon || FileText,
            content: appConfig?.content || <div>Application not found</div>,
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
            return savedIcon ? { ...icon, x: savedIcon.x, y: savedIcon.y } : icon;
          })
        );
      }
    } catch (e) {
      console.warn('Failed to load icon state from localStorage:', e);
    }
    
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

  const openWindow = (app: AppConfig) => {
    const existingWindowIndex = windows.findIndex(win => win.id === app.id);
    
    if (existingWindowIndex > -1) {
      focusWindow(app.id);
    } else {
      setWindows(prev => {
        const newZIndex = zIndexCounter + 1;
        setZIndexCounter(newZIndex);

        const width = app.defaultSize?.width || 500;
        const height = app.defaultSize?.height || 400;

        // Cascade new windows to prevent perfect overlap
        const offset = (prev.length % 5) * 30;

        const newX = Math.max(0, (windowDimensions.width - width) / 2) + offset;
        const newY = Math.max(32, (windowDimensions.height - height) / 2) + offset; // 32px for top bar

        const newWindow: WindowInstance = {
          ...app,
          x: newX,
          y: newY,
          width,
          height,
          zIndex: newZIndex,
          isMinimized: false,
          isMaximized: false,
          isFocused: true,
        };

        const newWindows = [...prev.map(w => ({...w, isFocused: false})), newWindow];
        saveWindowsState(newWindows);
        return newWindows;
      });
    }
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
        saveIconsState(resetIcons);
        return resetIcons;
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