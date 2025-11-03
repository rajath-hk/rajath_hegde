'use client';

import React, { useState, useEffect } from 'react';
import { WindowProvider } from '@/contexts/window-context';
import Desktop from './desktop';
import BootScreen from './boot-screen';
import Taskbar from './taskbar';

const OsUi = () => {
  const [booted, setBooted] = useState(false);
  const [showBootScreen, setShowBootScreen] = useState(true);

  // Check if we've already shown the boot screen in this session
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('portfolio-os-booted');
    if (hasBooted) {
      setShowBootScreen(false);
      setBooted(true);
    }
  }, []);

  const handleBootComplete = () => {
    setBooted(true);
    setShowBootScreen(false);
    sessionStorage.setItem('portfolio-os-booted', 'true');
  };

  if (showBootScreen) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  if (!booted) {
    return null;
  }

  return (
    <WindowProvider>
      <div className="fixed inset-0 bg-background font-body select-none">
        <Desktop />
        <Taskbar />
      </div>
    </WindowProvider>
  );
};

export default OsUi;