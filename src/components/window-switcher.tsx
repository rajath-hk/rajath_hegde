'use client';

import React, { useState, useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WindowSwitcher = () => {
  const { windows, focusWindow } = useWindows();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Tab
      if (e.key === 'Tab' && e.altKey) {
        e.preventDefault();
        
        if (!isOpen) {
          setIsOpen(true);
          setSelectedIndex(0);
        } else {
          // Cycle through windows
          setSelectedIndex(prev => (prev + 1) % windows.length);
        }
      }
      
      // Enter to select
      if (isOpen && e.key === 'Enter') {
        if (windows[selectedIndex]) {
          focusWindow(windows[selectedIndex].id);
          setIsOpen(false);
        }
      }
      
      // Escape to close
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Release Alt key
      if (e.key === 'Alt') {
        if (isOpen && windows[selectedIndex]) {
          focusWindow(windows[selectedIndex].id);
        }
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, selectedIndex, windows, focusWindow]);

  if (!isOpen || windows.length <= 1) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[999] flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-xl p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Switch Windows</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/40 dark:hover:bg-gray-600/40"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-gray-800 dark:text-gray-200" />
              </button>
            </div>
            
            <div className="flex gap-4">
              {windows.map((window, index) => {
                const IconComponent = window.icon;
                return (
                  <div
                    key={window.id}
                    className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${
                      index === selectedIndex 
                        ? 'bg-gray-500/20 dark:bg-gray-600/20 ring-2 ring-gray-500/30' 
                        : 'hover:bg-white/40 dark:hover:bg-gray-600/40'
                    }`}
                    onClick={() => {
                      focusWindow(window.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-gray-600/80 flex items-center justify-center mb-2 border border-white/30 dark:border-gray-600/30">
                      <IconComponent className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                    </div>
                    <span className="text-sm text-center max-w-[80px] truncate text-gray-800 dark:text-gray-200">
                      {window.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WindowSwitcher;