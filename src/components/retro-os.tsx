'use client';

import React from 'react';
import { WindowProvider } from '@/contexts/window-context';
import Dock from './dock';
import TopBar from './top-bar';
import Desktop from './desktop';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

const OsUi = () => {
  useKeyboardShortcuts();

  return (
    <WindowProvider>
      <div className="fixed inset-0 bg-background font-body select-none">
        <TopBar />
        <Desktop />
        <Dock />
      </div>
    </WindowProvider>
  );
};

export default OsUi;