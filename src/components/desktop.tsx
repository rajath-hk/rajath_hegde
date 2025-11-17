'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindows } from '@/contexts/window-context';
import DesktopIcon from '@/components/desktop-icon';
import * as Window from '@/components/window';
import {
  RefreshCw,
  ChevronUp
} from 'lucide-react';

const Desktop = () => {
  const { windows, desktopIcons, resetIconPositions, openWindow } = useWindows();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [wallpaper, setWallpaper] = useState('/images/wallpaper.jpg');

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Handle right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Handle desktop click to close context menu
  const handleDesktopClick = () => {
    setContextMenu(null);
  };

  // Context menu actions
  const handleRefresh = () => {
    window.location.reload();
    setContextMenu(null);
  };

  const handleNewFolder = () => {
    // Implementation for creating new folder on desktop
    console.log('Create new folder on desktop');
    setContextMenu(null);
  };

  const handleChangeWallpaper = () => {
    // Cycle through wallpapers
    const wallpapers = ['/images/wallpaper.jpg', '/images/wallpaper2.jpg', '/images/wallpaper3.jpg'];
    const currentIndex = wallpapers.indexOf(wallpaper);
    const nextIndex = (currentIndex + 1) % wallpapers.length;
    setWallpaper(wallpapers[nextIndex]);
    setContextMenu(null);
  };

  // Stable, deterministic ordering: sort by order first, then row (y), then column (x), then title
  const sortedIcons = [...desktopIcons].sort((a, b) => {
    const ao = a.order ?? Infinity;
    const bo = b.order ?? Infinity;
    if (ao !== bo) return ao - bo;
    const ay = a.y ?? 0;
    const by = b.y ?? 0;
    if (ay !== by) return ay - by;
    const ax = a.x ?? 0;
    const bx = b.x ?? 0;
    if (ax !== bx) return ax - bx;
    return (a.title || '').localeCompare(b.title || '');
  });

  return (
    <div
      ref={desktopRef}
      className={`relative w-full h-screen ${
        isMobile ? 'overflow-y-scroll' : 'overflow-y-auto'
      } bg-cover bg-center`}
      style={{ backgroundImage: `url(${wallpaper})` }}
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(128, 128, 128, 0.5);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(128, 128, 128, 0.7);
        }
      `}</style>
      
      <AnimatePresence>
        {windows.map((window) => (
          <Window.default key={window.id} {...window} />
        ))}
      </AnimatePresence>
      
      {/* Render differently on mobile: a simple grid/list with deterministic order */}
      {isMobile ? (
        <div className="p-4 grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {sortedIcons.map(icon => {
            const IconComp = icon.icon;
            return (
              <button
                key={icon.id}
                onClick={() => openWindow(icon)}
                className="flex flex-col items-center justify-center text-center p-2 select-none w-full"
                aria-label={`Open ${icon.title}`}
              >
                <div className="w-12 h-12 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shadow border border-black/5 dark:border-white/5">
                  <IconComp className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-xs mt-1 text-foreground font-medium truncate w-full">{icon.title}</span>
              </button>
            );
          })}
        </div>
      ) : (
        sortedIcons.map((icon) => (
          <DesktopIcon 
            key={icon.id} 
            app={icon} 
            constraintsRef={desktopRef}
          />
        ))
      )}
      
      {/* Scroll to top button - only show on desktop */}
      {!isMobile && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-black/50 dark:bg-white/20 backdrop-blur-lg text-white p-2 rounded-full shadow-lg hover:bg-black/70 dark:hover:bg-white/30 transition-all z-30"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
      
      {/* Reset icon positions button - only show on desktop */}
      {!isMobile && (
        <button
          onClick={resetIconPositions}
          className="fixed bottom-20 left-6 bg-black/50 dark:bg-white/20 backdrop-blur-lg text-white p-2 rounded-full shadow-lg hover:bg-black/70 dark:hover:bg-white/30 transition-all z-30"
          aria-label="Reset icon positions"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      )}

      {/* Desktop Context Menu */}
      {contextMenu && !isMobile && (
        <div
          className="fixed bg-background/90 backdrop-blur-xl border rounded shadow-lg py-1 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            className="w-full text-left px-3 py-1 hover:bg-accent"
            onClick={handleRefresh}
          >
            Refresh
          </button>
          <button
            className="w-full text-left px-3 py-1 hover:bg-accent"
            onClick={handleNewFolder}
          >
            New Folder
          </button>
          <button
            className="w-full text-left px-3 py-1 hover:bg-accent"
            onClick={handleChangeWallpaper}
          >
            Change Wallpaper
          </button>
        </div>
      )}
    </div>
  );
};

export default Desktop;