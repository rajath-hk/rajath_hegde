'use client';

import React from 'react';
import { WindowProvider } from '@/contexts/window-context';
import Dock from './dock';
import TopBar from './top-bar';
import Desktop from './desktop';
import PersistentNav from './persistent-nav';

const OsUi = () => {
  return (
    <WindowProvider>
      <div className="fixed inset-0 bg-background font-body select-none">
        <PersistentNav />
        <TopBar />
        <Desktop />
        <Dock />
      </div>
    </WindowProvider>
  );
};

export default OsUi;