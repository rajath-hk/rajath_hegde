'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindows } from '@/contexts/window-context';
import DesktopIcon from '@/components/desktop-icon';
import * as Window from '@/components/window';
import {
  RefreshCw,
  Wallpaper,
  ChevronUp
} from 'lucide-react';

const Desktop = () => {
  const { windows, desktopIcons, resetIconPositions, openWindow } = useWindows();
  const desktopRef = useRef<HTMLDivElement>(null);
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

  return (
    <div 
      ref={desktopRef}
      className="relative w-full h-screen overflow-y-auto bg-cover bg-center"
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
      
      {desktopIcons.map((icon) => (
        <DesktopIcon 
          key={icon.id} 
          app={icon} 
          constraintsRef={desktopRef}
        />
      ))}
      
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-black/50 dark:bg-white/20 backdrop-blur-lg text-white p-2 rounded-full shadow-lg hover:bg-black/70 dark:hover:bg-white/30 transition-all z-30"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
      
      {/* Reset icon positions button */}
      <button
        onClick={resetIconPositions}
        className="fixed bottom-20 left-6 bg-black/50 dark:bg-white/20 backdrop-blur-lg text-white p-2 rounded-full shadow-lg hover:bg-black/70 dark:hover:bg-white/30 transition-all z-30"
        aria-label="Reset icon positions"
      >
        <RefreshCw className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Desktop;