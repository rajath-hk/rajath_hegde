
'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
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
import {
  ArrowDownUp,
  RefreshCw,
  Wallpaper,
  Folder,
  Terminal,
  FileSearch,
  User,
  Award,
  Mail
} from 'lucide-react';
import ContextMenu from '@/components/context-menu';


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

  const contextMenuOptions = [
    {
      label: 'Terminal',
      icon: <Terminal className="h-4 w-4" />,
      action: () => {
        openWindow({
          id: 'terminal',
          title: 'Terminal',
          icon: Terminal,
          content: null, // Will be set in context
          defaultSize: { width: 650, height: 450 },
          x: 100,
          y: 100
        });
      }
    },
    {
      label: 'File Explorer',
      icon: <Folder className="h-4 w-4" />,
      action: () => {
        openWindow({
          id: 'explorer',
          title: 'File Explorer',
          icon: Folder,
          content: null, // Will be set in context
          defaultSize: { width: 700, height: 500 },
          x: 150,
          y: 150
        });
      }
    },
    {
      label: 'About Me',
      icon: <User className="h-4 w-4" />,
      action: () => {
        openWindow({
          id: 'about',
          title: 'About Me',
          icon: User,
          content: null, // Will be set in context
          defaultSize: { width: 550, height: 400 },
          x: 200,
          y: 200
        });
      }
    },
    {
      separator: true
    },
    {
      label: 'Refresh',
      icon: <RefreshCw className="h-4 w-4" />,
      action: () => window.location.reload()
    },
    {
      label: 'Change Wallpaper',
      icon: <Wallpaper className="h-4 w-4" />,
      action: () => console.log('Change wallpaper')
    },
    {
      separator: true
    },
    {
      label: 'View',
      icon: <ArrowDownUp className="h-4 w-4" />,
      action: () => console.log('Sort icons')
    },
    {
      label: 'Reset Icon Positions',
      action: resetIconPositions
    }
  ];

  return (
    <>
      <div
        ref={desktopRef}
        id="desktop-area"
        className="absolute inset-0 pt-24 pb-16 md:pb-0"
        onContextMenu={handleContextMenu}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-6">
          {desktopIcons.map((icon) => (
            <DesktopIcon key={icon.id} app={icon} />
          ))}
        </div>
        
        <AnimatePresence>
          {windows
            .filter(win => !win.isMinimized)
            .map(win => (
              <Window key={win.id} {...win} />
            ))}
        </AnimatePresence>
      </div>

      {contextMenuOpen && (
        <ContextMenu
          options={contextMenuOptions}
          position={contextMenuPosition}
          onClose={() => setContextMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Desktop;
