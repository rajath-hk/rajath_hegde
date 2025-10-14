'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextMenuOption {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  separator?: boolean;
}

interface ContextMenuProps {
  options: ContextMenuOption[];
  position: { x: number; y: number };
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ options, position, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.1 }}
        className="fixed z-[1000] bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-lg shadow-lg py-1 min-w-[200px]"
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {options.map((option, index) => (
          <React.Fragment key={index}>
            {option.separator && (
              <div className="border-t border-white/30 dark:border-gray-600/30 my-1" />
            )}
            <button
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-500/20 dark:hover:bg-gray-600/20 transition-colors text-sm text-gray-800 dark:text-gray-200"
              onClick={() => {
                option.action();
                onClose();
              }}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </button>
          </React.Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ContextMenu;