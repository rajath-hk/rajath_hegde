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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-card border rounded-lg p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Switch Windows</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-accent"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
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
                        ? 'bg-primary/20 ring-2 ring-primary' 
                        : 'hover:bg-accent'
                    }`}
                    onClick={() => {
                      focusWindow(window.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm text-center max-w-[80px] truncate">
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