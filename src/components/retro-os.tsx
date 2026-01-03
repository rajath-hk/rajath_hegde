'use client';

import React, { useState, useEffect } from 'react';
import { WindowProvider, useWindows } from '@/contexts/window-context';
import Desktop from './desktop';
import BootScreen from './boot-screen';
import Taskbar from './taskbar';
import ErrorBoundary from './error-boundary';

const OsUi = () => {
  const [booted, setBooted] = useState(false);
  const [showBootScreen, setShowBootScreen] = useState(true);

  // Check if we've already shown the boot screen in this session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasBooted = sessionStorage.getItem('portfolio-os-booted');
    if (hasBooted) {
      setShowBootScreen(false);
      setBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    setBooted(true);
    setShowBootScreen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio-os-booted', 'true');
    }
  };

  if (showBootScreen) {
    return (
      <ErrorBoundary>
        <BootScreen onComplete={handleBootComplete} />
      </ErrorBoundary>
    );
  }

  if (!booted) {
    return null;
  }

  return (
    <ErrorBoundary>
      <WindowProvider>
        <OsUiInner />
      </WindowProvider>
    </ErrorBoundary>
  );
};

const OsUiInner = () => {
  const { openAppById, closeFocusedWindow } = useWindows();
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Alt+T for terminal
      if (e.ctrlKey && e.altKey && e.key === 't') {
        e.preventDefault();
        openAppById('terminal');
      }
      
      // Ctrl+Alt+C for contact
      if (e.ctrlKey && e.altKey && e.key === 'c') {
        e.preventDefault();
        openAppById('contact');
      }
      
      // ESC to close focused window
      if (e.key === 'Escape') {
        closeFocusedWindow();
      }
    };

    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openAppById, closeFocusedWindow]);

  return (
    <div className="fixed inset-0 bg-background font-body select-none">
      <Desktop />
      <Taskbar />
    </div>
  );
};

export default OsUi;