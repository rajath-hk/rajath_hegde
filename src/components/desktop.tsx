'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWindows } from '@/contexts/window-context';
import DesktopIcon from '@/components/desktop-icon';
import Window from '@/components/window';
import Taskbar from '@/components/taskbar';
import TopBar from '@/components/top-bar';
import SystemSearch from '@/components/system-search';
import KeyboardShortcuts from '@/components/keyboard-shortcuts';
import {
  ArrowDownUp,
  RefreshCw,
  Wallpaper,
  Folder,
  Monitor,
  User,
  Settings,
  HelpCircle,
  Power
} from 'lucide-react';


const Desktop = () => {
  const { windows, desktopIcons, resetIconPositions, openWindow } = useWindows();
  const desktopRef = React.useRef<HTMLDivElement>(null);
  const [contextMenuOpen, setContextMenuOpen] = React.useState(false);
  const [contextMenuPosition, setContextMenuPosition] = React.useState({ x: 0, y: 0 });

  const handleContextMenu = (event: React.MouseEvent) => {
    // Prevent the default browser context menu
    event.preventDefault();
    
    // Set the position for our custom context menu
    setContextMenuPosition({ x: event.clientX, y: event.clientY });

    // Show the context menu
    setContextMenuOpen(true);
  };

  const openApp = (appId: string) => {
    const app = desktopIcons.find(icon => icon.id === appId);
    if (app) {
      openWindow(app);
    }
    setContextMenuOpen(false);
  };

  return (
    <>
      <TopBar />
      <div
        ref={desktopRef}
        id="desktop-area"
        className="absolute inset-0 pt-8 pb-10"
        onContextMenu={handleContextMenu}
      >
        <DropdownMenu open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div
              style={{
                position: 'fixed',
                left: contextMenuPosition.x,
                top: contextMenuPosition.y,
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => openApp('about')}>
                <User className="mr-2 h-4 w-4" />
                <span>My Story</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openApp('projects')}>
                <Folder className="mr-2 h-4 w-4" />
                <span>Projects</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openApp('my-work')}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>My Work</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => openApp('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openApp('help')}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                <span>Sort by</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem disabled>Name</DropdownMenuItem>
                  <DropdownMenuItem disabled>Date Modified</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            
            <DropdownMenuItem onClick={() => { resetIconPositions(); setContextMenuOpen(false); }}>
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Reset Icon Positions</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem disabled>
              <Wallpaper className="mr-2 h-4 w-4" />
              <span>Change Wallpaper</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Folder className="mr-2 h-4 w-4" />
              <span>New Folder</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem disabled className="text-red-500 focus:text-red-500">
              <Power className="mr-2 h-4 w-4" />
              <span>Shut Down</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {desktopIcons.map((app) => (
          <DesktopIcon key={app.id} app={app} constraintsRef={desktopRef} />
        ))}
      </div>

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