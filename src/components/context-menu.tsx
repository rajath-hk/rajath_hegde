'use client';

import React, { useRef, useEffect } from 'react';
import { Move, Brush } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onArrangeIcons: () => void;
  onNotImplemented: () => void;
}

export function ContextMenu({ x, y, onClose, onArrangeIcons, onNotImplemented }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    // Use timeout to prevent the same click that opened the menu from closing it
    const timerId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    
    return () => {
      clearTimeout(timerId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleArrange = () => {
    onArrangeIcons();
    onClose();
  };

  const handleNotImplemented = () => {
    onNotImplemented();
    onClose();
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-[3000] w-52 rounded-md border bg-popover/80 backdrop-blur-lg p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95"
      style={{ top: y, left: x }}
    >
      <div
        className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground"
        onClick={handleArrange}
      >
        <Move className="h-4 w-4" />
        <span>Arrange Icons</span>
      </div>
      <div
        className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground"
        onClick={handleNotImplemented}
      >
        <Brush className="h-4 w-4" />
        <span>Change Wallpaper</span>
      </div>
    </div>
  );
}
