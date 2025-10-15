
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
  FileText,
  ChevronUp
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
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (desktopRef.current) {
        setShowScrollTop(desktopRef.current.scrollTop > 300);
      }
    };

    const desktopElement = desktopRef.current;
    if (desktopElement) {
      desktopElement.addEventListener('scroll', handleScroll);
      return () => desktopElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (desktopRef.current) {
      desktopRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
    
    // Update context menu options with actions
    const updatedOptions = [
      {
        label: 'View',
        icon: FileSearch,
        submenu: [
          { label: 'Large icons', action: () => console.log('Large icons') },
          { label: 'Medium icons', action: () => console.log('Medium icons') },
          { label: 'Small icons', action: () => console.log('Small icons') },
        ]
      },
      {
        label: 'Sort by',
        icon: ArrowDownUp,
        submenu: [
          { label: 'Name', action: () => console.log('Sort by name') },
          { label: 'Date', action: () => console.log('Sort by date') },
          { label: 'Type', action: () => console.log('Sort by type') },
        ]
      },
      {
        separator: true
      },
      {
        label: 'Refresh',
        icon: RefreshCw,
        action: () => window.location.reload()
      },
      {
        label: 'Change Wallpaper',
        icon: Wallpaper,
        action: () => console.log('Change wallpaper')
      },
      {
        separator: true
      },
      {
        label: 'New',
        icon: FileText,
        submenu: [
          { label: 'Folder', action: () => console.log('New folder') },
          { label: 'Text Document', action: () => console.log('New text document') },
          { 
            label: 'Terminal', 
            icon: Terminal,
            action: openTerminal
          },
        ]
      },
      {
        label: 'Open File Explorer',
        icon: Folder,
        action: openFileExplorer
      },
      {
        label: 'About Me',
        icon: User,
        action: openAbout
      }
    ];
    
    setContextMenuOptions(updatedOptions);
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

  // Add missing components
  const TerminalContent = React.lazy(() => import('@/components/content/terminal'));
  const FileExplorerContent = React.lazy(() => import('@/components/content/file-explorer'));
  const AboutContent = React.lazy(() => import('@/components/content/about'));

  // Context menu actions
  const openTerminal = () => {
    const TerminalContent = React.lazy(() => import('@/components/content/terminal'));
    openWindow({
      id: 'terminal-' + Date.now(),
      title: 'Terminal',
      icon: Terminal,
      content: <TerminalContent />,
      defaultSize: { width: 600, height: 400 },
      x: 100,
      y: 100
    });
  };

  const openFileExplorer = () => {
    const FileExplorerContent = React.lazy(() => import('@/components/content/file-explorer'));
    openWindow({
      id: 'explorer-' + Date.now(),
      title: 'File Explorer',
      icon: Folder,
      content: <FileExplorerContent />,
      defaultSize: { width: 800, height: 500 },
      x: 150,
      y: 150
    });
  };

  const openAbout = () => {
    const AboutContent = React.lazy(() => import('@/components/content/about'));
    openWindow({
      id: 'about-' + Date.now(),
      title: 'About Me',
      icon: User,
      content: <AboutContent />,
      defaultSize: { width: 600, height: 400 },
      x: 200,
      y: 200
    });
  };

  return (
    <>
      <div
        ref={desktopRef}
        id="desktop-area"
        className="absolute inset-0 pt-8 sm:pt-8 overflow-y-auto"
        onContextMenu={handleContextMenu}
      >

        {/* Desktop Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-4">
          {desktopIcons.map((app) => (
            <DesktopIcon key={app.id} app={app} />
          ))}
        </div>

        {/* Windows */}
        <AnimatePresence>
          {windows.map((window) => (
            <Window key={window.id} {...window} />
          ))}
        </AnimatePresence>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 md:bottom-4"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      <ContextMenu 
        position={contextMenuPosition}
        options={contextMenuOptions}
        onClose={() => setContextMenuOpen(false)}
      />
    </>
  );
};

export default Desktop;
