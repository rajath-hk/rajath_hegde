
'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  Mail,
  FileText
} from 'lucide-react';
import ContextMenu from '@/components/context-menu';
import type { AppConfig } from '@/types';


const Desktop = () => {
  const { windows, desktopIcons, resetIconPositions, openWindow } = useWindows();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [organizedIcons, setOrganizedIcons] = useState<AppConfig[]>([]);
  const [contextMenuOptions, setContextMenuOptions] = useState<any[]>([]);

  // Organize desktop icons in a grid
  const organizeIcons = () => {
    const organizedIcons = [...desktopIcons];
    const iconWidth = 80; // Approximate width of an icon with label
    const iconHeight = 100; // Approximate height of an icon with label
    const horizontalSpacing = 100;
    const verticalSpacing = 120;
    
    // Get desktop dimensions
    const desktopWidth = desktopRef.current?.clientWidth || window.innerWidth;
    const desktopHeight = (desktopRef.current?.clientHeight || window.innerHeight) - 64; // Subtract taskbar height
    
    // Calculate grid
    const iconsPerRow = Math.floor(desktopWidth / horizontalSpacing);
    
    // Position icons
    organizedIcons.forEach((icon, index) => {
      const row = Math.floor(index / iconsPerRow);
      const col = index % iconsPerRow;
      
      icon.x = col * horizontalSpacing + 20;
      icon.y = row * verticalSpacing + 20;
    });
    
    return organizedIcons;
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    
    setContextMenuOptions([
      {
        label: 'Terminal',
        icon: <Terminal className="h-4 w-4" />,
        action: () => {
          openWindow({
            id: 'terminal',
            title: 'Terminal',
            icon: Terminal,
            content: <TerminalContent />,
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
            content: <FileExplorerContent />,
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
            content: <AboutContent />,
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
        label: 'Organize Icons',
        action: () => setOrganizedIcons(organizeIcons()),
        icon: <Folder className="w-4 h-4" />,
      },
      {
        separator: true,
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
        icon: <FileSearch className="w-4 h-4" />,
        action: () => console.log('View options'),
      },
      {
        label: 'Sort By',
        icon: <ArrowDownUp className="w-4 h-4" />,
        action: () => console.log('Sort options'),
      },
      {
        separator: true
      },
      {
        label: 'Reset Icon Positions',
        action: resetIconPositions
      }
    ]);
    
    setContextMenuOpen(true);
  };

  // Refresh function to reorganize icons
  const refreshIcons = () => {
    setOrganizedIcons(organizeIcons());
  };

  // Add refresh to the window context so other components can trigger it
  useEffect(() => {
    // Initialize icons
    refreshIcons();
    
    // Handle window resize
    const handleResize = () => {
      refreshIcons();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div
        ref={desktopRef}
        id="desktop-area"
        className="absolute inset-0 pt-6 pb-16 md:pb-0"
        onContextMenu={handleContextMenu}
      >
        {/* Render desktop icons with organized grid positioning */}
        {organizedIcons.map((icon) => (
          <DesktopIcon key={icon.id} app={icon} />
        ))}
        
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
