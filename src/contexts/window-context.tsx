'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { AppConfig, WindowInstance } from '@/types';

import AboutContent from '@/components/content/about';
import ProjectsContent from '@/components/content/projects';
import ContactContent from '@/components/content/contact';
import ResumeContent from '@/components/content/resume';
import MyWorkContent from '@/components/content/my-work';
import SocialsContent from '@/components/content/socials';
import { FileText, Folder, Mail, Briefcase } from 'lucide-react';

const ICON_STATE_KEY = 'retrofolio-icons-v2';
const WINDOW_STATE_KEY = 'retrofolio-windows-v2';

const LegalContent = () => <div className="p-6 text-card-foreground">This is my portfolio. To access this file, please contact me.</div>;


const initialAppsData: AppConfig[] = [
  { id: 'about', title: 'My Story', icon: FileText, content: <AboutContent />, defaultSize: { width: 550, height: 400 } },
  { id: 'projects', title: 'Projects', icon: Folder, content: <ProjectsContent />, defaultSize: { width: 650, height: 500 } },
  { id: 'my-work', title: 'My Work', icon: Briefcase, content: <MyWorkContent />, defaultSize: { width: 500, height: 350 } },
  { id: 'resume', title: 'My Resume', icon: FileText, content: <ResumeContent />, defaultSize: { width: 700, height: 800 } },
  { id: 'contact', title: 'Contact Me', icon: Mail, content: <ContactContent />, defaultSize: { width: 450, height: 580 } },
  { id: 'socials', title: 'Socials', icon: Folder, content: <SocialsContent />, defaultSize: { width: 450, height: 350 } },
  { id: 'legal', title: 'Legal', icon: Folder, content: <LegalContent />, defaultSize: { width: 500, height: 300 } },
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
  arrangeIcons: () => void;
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

  const arrangeIcons = useCallback(() => {
    setDesktopIcons(prevIcons => {
        const newIcons = initialAppsData.map((icon, index) => {
            const gridX = 20;
            const gridY = 50;
            const iconWidth = 110;
            const iconHeight = 120;
            const numRows = Math.floor((windowDimensions.height - gridY) / iconHeight) -1;
            const col = Math.floor(index / numRows);
            const row = index % numRows;
            return {
                ...icon,
                x: gridX + (col * iconWidth),
                y: gridY + (row * iconHeight),
            };
        });
        saveIconsState(newIcons);
        return newIcons;
    });
  }, [windowDimensions.height]);

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

    // Load Icon Positions
    try {
      const savedIconsJSON = localStorage.getItem(ICON_STATE_KEY);
      if (savedIconsJSON) {
        const savedIcons = JSON.parse(savedIconsJSON) as { id: string; x: number; y: number }[];
        setDesktopIcons(prevIcons => {
            const updatedIcons = prevIcons.map(icon => {
                const savedIcon = savedIcons.find(s => s.id === icon.id);
                return savedIcon ? { ...icon, x: savedIcon.x, y: savedIcon.y } : icon;
            });
            return updatedIcons.length > 0 ? updatedIcons : prevIcons;
        });
      } else {
        // If no saved state, arrange icons initially
        arrangeIcons();
      }
    } catch (error) {
      console.error("Failed to load icon state from localStorage", error);
      localStorage.removeItem(ICON_STATE_KEY);
    }

    // Load Window State
    try {
      const savedWindowsJSON = localStorage.getItem(WINDOW_STATE_KEY);
      if (savedWindowsJSON) {
        const savedWindows = JSON.parse(savedWindowsJSON) as Omit<WindowInstance, 'content' | 'icon'>[];
        const restoredWindows = savedWindows.map(savedWin => {
            const appConfig = initialAppsData.find(app => app.id === savedWin.id);
            if (!appConfig) return null;
            
            // Clamp saved position to be within the current viewport
            const width = savedWin.width || appConfig.defaultSize?.width || 500;
            const height = savedWin.height || appConfig.defaultSize?.height || 400;
            const clampedX = Math.max(0, Math.min(savedWin.x, windowDimensions.width - width));
            const clampedY = Math.max(32, Math.min(savedWin.y, windowDimensions.height - height));
            
            return { ...savedWin, ...appConfig, x: clampedX, y: clampedY };
        }).filter((w): w is WindowInstance => w !== null);

        setWindows(restoredWindows);

        if (restoredWindows.length > 0) {
            const maxZIndex = Math.max(...restoredWindows.map(w => w.zIndex), 10);
            setZIndexCounter(maxZIndex + 1);
        }
      }
    } catch (error) {
        console.error("Failed to load window state from localStorage", error);
        localStorage.removeItem(WINDOW_STATE_KEY);
    }

    setIsLoaded(true);
  }, [windowDimensions, isLoaded, arrangeIcons]);


  const focusWindow = useCallback((id: string) => {
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
  }, [zIndexCounter]);

  const openWindow = useCallback((app: AppConfig) => {
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
  }, [windows, zIndexCounter, focusWindow, windowDimensions]);

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
      arrangeIcons,
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
