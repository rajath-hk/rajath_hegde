'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindows } from '@/contexts/window-context';
import DesktopIcon from '@/components/desktop-icon';
import Window from '@/components/window';
import {
  RefreshCw,
  ChevronUp
} from 'lucide-react';

const Desktop = () => {
  const { windows, desktopIcons, resetIconPositions, openWindow } = useWindows();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wallpaper, setWallpaper] = useState('/wallpapers/default.jpg');

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle wallpaper changes
  useEffect(() => {
    const handleWallpaperChange = (e: CustomEvent) => {
      setWallpaper(e.detail);
    };

    window.addEventListener('wallpaperChange', handleWallpaperChange as EventListener);
    return () => window.removeEventListener('wallpaperChange', handleWallpaperChange as EventListener);
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

  // Handle desktop context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Context menu functionality can be implemented here
  };

  // Handle wallpaper loading errors
  const handleWallpaperError = (e: React.SyntheticEvent<HTMLDivElement>) => {
    // Fallback to a solid color if wallpaper fails to load
    const target = e.target as HTMLDivElement;
    target.style.backgroundImage = 'none';
    target.style.backgroundColor = 'var(--background)';
  };

  // Validate window object has required properties
  const isValidWindow = (window: any) => {
    return window && 
           typeof window === 'object' && 
           window.id && 
           typeof window.x === 'number' && 
           typeof window.y === 'number' &&
           typeof window.width === 'number' && 
           typeof window.height === 'number';
  };

  return (
    <div 
      ref={desktopRef}
      className="relative w-full h-[calc(100vh-3rem)] overflow-auto bg-cover bg-center"
      style={{ 
        backgroundImage: `url('${wallpaper}')`,
        backgroundColor: 'var(--background)'
      }}
      onContextMenu={handleContextMenu}
      aria-label="Desktop environment"
      role="main"
      tabIndex={-1}
      onError={handleWallpaperError}
    >
      {/* Desktop Icons */}
      <div className="relative w-full h-full p-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon key={icon.id} app={icon} />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows
          .filter(isValidWindow) // Filter out invalid windows with robust validation
          .map((window) => (
            <Window key={window.id} window={window} />
          ))}
      </AnimatePresence>

      {/* Scroll to top button - hidden on mobile */}
      {!isMobile && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 p-2 bg-background/80 backdrop-blur-xl border rounded-lg shadow-lg hover:bg-accent transition-all duration-200 z-30"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Reset icons button - hidden on mobile */}
      {!isMobile && (
        <button
          onClick={resetIconPositions}
          className="fixed bottom-20 left-6 p-2 bg-background/80 backdrop-blur-xl border rounded-lg shadow-lg hover:bg-accent transition-all duration-200 z-30"
          aria-label="Reset icon positions"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Desktop;