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

const DEFAULT_WALLPAPER = '/images/wallpaper-aurora.png';
const legacyRemoteWallpaper = 'wallpaperaccess.com';

const Desktop = () => {
  const { windows, desktopIcons, resetIconPositions, openWindow } = useWindows();
  const desktopRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [wallpaper, setWallpaper] = useState(DEFAULT_WALLPAPER);

  // Check if we're on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load wallpaper from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedWallpaper = localStorage.getItem('portfolio-wallpaper');
    const nextWallpaper = savedWallpaper?.includes(legacyRemoteWallpaper) ? DEFAULT_WALLPAPER : savedWallpaper;
    setWallpaper(nextWallpaper || DEFAULT_WALLPAPER);
  }, []);

  // Listen for wallpaper changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleWallpaperChange = (event: CustomEvent) => {
      setWallpaper(event.detail);
    };

    window.addEventListener('wallpaperChange', handleWallpaperChange as EventListener);
    return () => {
      window.removeEventListener('wallpaperChange', handleWallpaperChange as EventListener);
    };
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

  // Stable, deterministic ordering: sort by row (y), then column (x), then title
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
      style={{ backgroundImage: `url('${wallpaper}')` }}
      role="main"
      aria-label="Desktop"
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

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.06),rgba(4,8,16,0.46)),linear-gradient(90deg,rgba(15,23,42,0.18),transparent_42%,rgba(15,23,42,0.16))]" />
      
      <AnimatePresence>
        {windows.map((window) => (
          <Window.default key={window.id} {...window} />
        ))}
      </AnimatePresence>
      
      {/* Render differently on mobile: a simple grid/list with deterministic order */}
      {isMobile ? (
        <div className="relative z-10 grid grid-cols-4 gap-3 p-4 pb-24 pt-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {sortedIcons.map(icon => {
            const IconComp = icon.icon;
            return (
              <button
                key={icon.id}
                onClick={() => openWindow(icon)}
                className="flex w-full select-none flex-col items-center justify-center rounded-md p-2 text-center transition-colors hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={`Open ${icon.title}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/25 bg-black/10 shadow-lg backdrop-blur-md dark:bg-white/10">
                  <IconComp className="w-6 h-6 text-foreground" />
                </div>
                <span className="mt-1 w-full truncate rounded bg-black/25 px-1 py-0.5 text-xs font-medium text-white shadow-sm">{icon.title}</span>
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
          className="fixed bottom-20 right-6 z-30 rounded-full border border-white/25 bg-black/30 p-2 text-white shadow-lg backdrop-blur-lg transition-all hover:bg-black/45"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
      
      {/* Reset icon positions button - only show on desktop */}
      {!isMobile && (
        <button
          onClick={resetIconPositions}
          className="fixed bottom-20 left-6 z-30 rounded-full border border-white/25 bg-black/30 p-2 text-white shadow-lg backdrop-blur-lg transition-all hover:bg-black/45"
          aria-label="Reset icon positions"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Desktop;
