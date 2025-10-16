'use client';

import React, { useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';

const KeyboardShortcuts: React.FC = () => {
  const { 
    windows, 
    desktopIcons, 
    openWindow, 
    closeWindow, 
    toggleMinimize,
    focusWindow
  } = useWindows();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Alt + T - Open Terminal
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        const terminalApp = desktopIcons.find(app => app.id === 'terminal');
        if (terminalApp) {
          openWindow(terminalApp);
        }
      }
      
      // Ctrl/Cmd + Alt + F - Open File Explorer
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const explorerApp = desktopIcons.find(app => app.id === 'explorer');
        if (explorerApp) {
          openWindow(explorerApp);
        }
      }
      
      // Ctrl/Cmd + Alt + B - Open Browser
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        const browserApp = desktopIcons.find(app => app.id === 'browser');
        if (browserApp) {
          openWindow(browserApp);
        }
      }
      
      // Ctrl/Cmd + Alt + S - Open Settings
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        const settingsApp = desktopIcons.find(app => app.id === 'settings');
        if (settingsApp) {
          openWindow(settingsApp);
        }
      }
      
      // Alt + Tab - Switch between windows
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        if (windows.length > 0) {
          // Find the currently focused window
          const focusedWindow = windows.find(win => win.isFocused);
          if (focusedWindow) {
            // Find the next window in the list
            const currentIndex = windows.findIndex(win => win.id === focusedWindow.id);
            const nextIndex = (currentIndex + 1) % windows.length;
            focusWindow(windows[nextIndex].id);
          } else {
            // If no window is focused, focus the first one
            focusWindow(windows[0].id);
          }
        }
      }
      
      // Escape - Minimize focused window
      if (e.key === 'Escape') {
        const focusedWindow = windows.find(win => win.isFocused);
        if (focusedWindow) {
          toggleMinimize(focusedWindow.id);
        }
      }
      
      // Ctrl/Cmd + W - Close focused window
      if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault();
        const focusedWindow = windows.find(win => win.isFocused);
        if (focusedWindow) {
          closeWindow(focusedWindow.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [windows, desktopIcons, openWindow, closeWindow, toggleMinimize, focusWindow]);

  return null; // This component doesn't render anything
};

export default KeyboardShortcuts;