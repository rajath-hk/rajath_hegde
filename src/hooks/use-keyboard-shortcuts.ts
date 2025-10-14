'use client';

import { useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';
import { create } from 'zustand';

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

interface ShortcutAction {
  id: string;
  keys: string[];
  action: () => void;
  description: string;
}

interface ShortcutState {
  shortcuts: ShortcutAction[];
  registerShortcut: (shortcut: ShortcutAction) => void;
  unregisterShortcut: (id: string) => void;
}

export const useShortcutStore = create<ShortcutState>((set) => ({
  shortcuts: [],
  registerShortcut: (shortcut) =>
    set((state) => ({
      shortcuts: [...state.shortcuts.filter((s) => s.id !== shortcut.id), shortcut],
    })),
  unregisterShortcut: (id) =>
    set((state) => ({
      shortcuts: state.shortcuts.filter((s) => s.id !== id),
    })),
}));

export function useKeyboardShortcut(shortcut: ShortcutAction) {
  const registerShortcut = useShortcutStore((state) => state.registerShortcut);
  const unregisterShortcut = useShortcutStore((state) => state.unregisterShortcut);

  useEffect(() => {
    registerShortcut(shortcut);
    return () => unregisterShortcut(shortcut.id);
  }, [shortcut, registerShortcut, unregisterShortcut]);
}

export function KeyboardShortcuts() {
  const shortcuts = useShortcutStore((state) => state.shortcuts);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const pressedKeys: string[] = [];
      if (event.ctrlKey) pressedKeys.push('Ctrl');
      if (event.shiftKey) pressedKeys.push('Shift');
      if (event.altKey) pressedKeys.push('Alt');
      if (event.key !== 'Control' && event.key !== 'Shift' && event.key !== 'Alt') {
        pressedKeys.push(event.key.toLowerCase());
      }

      const matchingShortcut = shortcuts.find((shortcut) =>
        arraysEqual(shortcut.keys.map((k) => k.toLowerCase()), pressedKeys)
      );

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.action();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return null;
}

function arraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}

// Example usage:
// useKeyboardShortcut({
//   id: 'toggle-theme',
//   keys: ['Ctrl', 't'],
//   action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
//   description: 'Toggle theme',
// });