'use client';

import { useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';

export const useKeyboardShortcuts = () => {
  const { openWindow, windows, closeWindow, minimizeWindow } = useWindows();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      // Handle Ctrl/Cmd + Shift + [Number] to open windows
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const windowIndex = parseInt(e.key) - 1;
        if (windowIndex < windows.length) {
          openWindow(windows[windowIndex]);
        }
      }

      // Handle Ctrl/Cmd + W to close focused window
      if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault();
        const focusedWindow = windows.find(win => win.isFocused);
        if (focusedWindow) {
          closeWindow(focusedWindow.id);
        }
      }

      // Handle Ctrl/Cmd + N to open a new window (first app)
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        if (windows.length > 0) {
          openWindow(windows[0]);
        }
      }

      // Handle Escape to minimize focused window
      if (e.key === 'Escape') {
        e.preventDefault();
        const focusedWindow = windows.find(win => win.isFocused);
        if (focusedWindow) {
          minimizeWindow(focusedWindow.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openWindow, windows, closeWindow, minimizeWindow]);
};