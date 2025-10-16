'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindows } from '@/contexts/window-context';
import DesktopIcon from '@/components/desktop-icon';
import Window from '@/components/window';
import Taskbar from '@/components/taskbar';
import TopBar from '@/components/top-bar';
import SystemSearch from '@/components/system-search';
import KeyboardShortcuts from '@/components/keyboard-shortcuts';
import DesktopContextMenu from '@/components/desktop-context-menu';

const Desktop = () => {
  const { windows, desktopIcons } = useWindows();
  const desktopRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <TopBar />
      <DesktopContextMenu>
        <div
          ref={desktopRef}
          id="desktop-area"
          className="absolute inset-0 pt-8 pb-10"
          onContextMenu={(e) => e.preventDefault()}
        >
          {desktopIcons.map((app) => (
            <DesktopIcon key={app.id} app={app} constraintsRef={desktopRef} />
          ))}
        </div>
      </DesktopContextMenu>

      <AnimatePresence>
        {windows.map((win) => (
          !win.isMinimized && <Window key={win.id} {...win} />
        ))}
      </AnimatePresence>
      
      <Taskbar />
      <SystemSearch />
      <KeyboardShortcuts />
    </>
  );
};

export default Desktop;