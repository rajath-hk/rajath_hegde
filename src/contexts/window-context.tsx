'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { AppConfig, WindowInstance } from '@/types';
import { initialAppsData } from '@/lib/apps';
import AppContent from '@/components/app-content';

const ICON_STATE_KEY = 'retrofolio-icons-v2';
const WINDOW_STATE_KEY = 'retrofolio-windows-v2';

interface WindowContextType {
  windows: WindowInstance[];
  desktopIcons: Omit<AppConfig, 'content'>[];
  openWindow: (app: Omit<AppConfig, 'content'>) => void;
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

const saveWindowsState = (windowsToSave: WindowInstance[]) => {
  if (typeof window === 'undefined') return;
  const serializableWindows = windowsToSave.map(({ content, icon, ...rest }) => rest);
  localStorage.setItem(WINDOW_STATE_KEY, JSON.stringify(serializableWindows));
};

const saveIconsState = (iconsToSave: Omit<AppConfig, 'content'>[]) => {
  if (typeof window === 'undefined') return;
  const serializableIcons = iconsToSave.map(({ id, x, y }) => ({ id, x, y }));
  localStorage.setItem(ICON_STATE_KEY, JSON.stringify(serializableIcons));
};

export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [desktopIcons, setDesktopIcons] = useState<Omit<AppConfig, 'content'>[]>(initialAppsData);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [windowDimensions, setWindowDimensions] = useState({width: 0, height: 0});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const updateDims = () => setWindowDimensions({width: window.innerWidth, height: window.innerHeight});
    window.addEventListener('resize', updateDims);
    updateDims();
    return () => window.removeEventListener('resize', updateDims);
  }, []);
  
  useEffect(() => {
    if (typeof window === 'undefined' || windowDimensions.width === 0 || isLoaded) return;

    try {
      const savedIconsJSON = localStorage.getItem(ICON_STATE_KEY);
      if (savedIconsJSON) {
        const savedIcons = JSON.parse(savedIconsJSON) as { id: string; x: number; y: number }[];
        setDesktopIcons(prevIcons => {
            const updatedIcons = prevIcons.map(icon => {
                const savedIcon = savedIcons.find(s => s.id === icon.id);
                return savedIcon ? { ...icon, x: savedIcon.x, y: savedIcon.y } : icon;
            });
            return updatedIcons;
        });
      }
    } catch (error) {
      console.error("Failed to load icon state from localStorage", error);
      localStorage.removeItem(ICON_STATE_KEY);
    }

    try {
      const savedWindowsJSON = localStorage.getItem(WINDOW_STATE_KEY);
      if (savedWindowsJSON) {
        const savedWindows = JSON.parse(savedWindowsJSON) as Omit<WindowInstance, 'content' | 'icon'>[];
        const restoredWindows = savedWindows.map(savedWin => {
            const appConfig = initialAppsData.find(app => app.id === savedWin.id);
            if (!appConfig) return null;
            
            const width = savedWin.width || appConfig.defaultSize?.width || 500;
            const height = savedWin.height || appConfig.defaultSize?.height || 400;
            const clampedX = Math.max(0, Math.min(savedWin.x, windowDimensions.width - width));
            const clampedY = Math.max(32, Math.min(savedWin.y, windowDimensions.height - height));
            
            return { ...savedWin, ...appConfig, content: <AppContent appId={savedWin.id} />, x: clampedX, y: clampedY };
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

  const openWindow = (app: Omit<AppConfig, 'content'>) => {
    const existingWindowIndex = windows.findIndex(win => win.id === app.id);
    
    if (existingWindowIndex > -1) {
      focusWindow(app.id);
    } else {
      setWindows(prev => {
        const newZIndex = zIndexCounter + 1;
        setZIndexCounter(newZIndex);

        const width = app.defaultSize?.width || 500;
        const height = app.defaultSize?.height || 400;

        const offset = (prev.length % 5) * 30;

        const newX = Math.max(0, (windowDimensions.width - width) / 2) + offset;
        const newY = Math.max(32, (windowDimensions.height - height) / 2) + offset;

        const newWindow: WindowInstance = {
          ...app,
          content: <AppContent appId={app.id} />,
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
