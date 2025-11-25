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
      className={`relative w-full h-screen anime-wallpaper glassy-window ${
        isMobile ? 'overflow-y-scroll' : 'overflow-y-auto'
      } bg-cover bg-center`}
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
          className="fixed bottom-20 right-6 glassy-icon text-foreground p-2 rounded-full shadow-lg hover:bg-black/20 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
      
      {/* Reset icon positions button - only show on desktop */}
      {!isMobile && (
        <button
          onClick={resetIconPositions}
          className="fixed bottom-20 left-6 glassy-icon text-foreground p-2 rounded-full shadow-lg hover:bg-black/20 dark:hover:bg-white/20 transition-all z-30 backdrop-blur-lg"
          aria-label="Reset icon positions"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Desktop;
