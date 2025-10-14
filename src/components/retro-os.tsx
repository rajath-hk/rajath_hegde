'use client';

import React, { useState, useEffect } from 'react';
import { WindowProvider } from '@/contexts/window-context';
import Dock from './dock';
import TopBar from './top-bar';
import Desktop from './desktop';
import PersistentNav from './persistent-nav';
import BootScreen from './boot-screen';
import Taskbar from './taskbar';
import WindowSwitcher from './window-switcher';

const OsUi = () => {
  const [booted, setBooted] = useState(false);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <WindowProvider>
      <div className="fixed inset-0 bg-background font-body select-none">
        <PersistentNav />
        <TopBar />
        <Desktop />
        <Dock />
        <Taskbar />
        <WindowSwitcher />
      </div>
    </WindowProvider>
  );
};

export default OsUi;