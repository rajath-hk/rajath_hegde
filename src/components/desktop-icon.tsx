'use client';

import type { AppConfig } from '@/types';
import { useWindows } from '@/contexts/window-context';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface DesktopIconProps {
  app: AppConfig;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}

const DesktopIcon = ({ app, constraintsRef }: DesktopIconProps) => {
  const { openWindow, updateIconPosition, desktopIcons } = useWindows();
  const IconComponent = app.icon;
  const [isMobile, setIsMobile] = useState(false);
  const isDraggingRef = React.useRef(false);

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

  // Use motion values for a more robust drag implementation
  const x = useMotionValue(app.x ?? 0);
  const y = useMotionValue(app.y ?? 0);
  const hasDraggedRef = React.useRef(false);

  // Sync motion values if the state from context changes (e.g., on initial load or reset)
  // Only sync if we haven't manually dragged the icon
  useEffect(() => {
    if (!hasDraggedRef.current) {
      const currentIcon = desktopIcons.find(icon => icon.id === app.id);
      if (currentIcon) {
        x.set(currentIcon.x ?? 0);
        y.set(currentIcon.y ?? 0);
      }
    }
  }, [app.id, desktopIcons, x, y]);

  return (
    <motion.button
  // Use motion values for position via `style`. Framer Motion will manage this.
      style={{ x, y, position: 'absolute' }}
      className="group flex w-20 select-none flex-col items-center justify-center p-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      aria-label={`Open ${app.title}`}
      onClick={(e) => {
        e.stopPropagation();
        // Prevent opening if the user was dragging the icon
        if (isDraggingRef.current) return;
        openWindow(app);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        // Keep double-click behavior in case users expect it; also open.
        if (isDraggingRef.current) return;
        openWindow(app);
      }}
      onDragStart={() => { 
        isDraggingRef.current = true;
        hasDraggedRef.current = true;
      }}
      onDragEnd={(event, info) => { 
        isDraggingRef.current = false;
        const finalX = x.get();
        const finalY = y.get();
        updateIconPosition(app.id, finalX, finalY);
        // Reset the flag after a short delay to allow for future syncing
        setTimeout(() => {
          hasDraggedRef.current = false;
        }, 100);
      }}
      drag={!isMobile} // Only allow drag on desktop
      dragConstraints={constraintsRef}
      dragMomentum={false}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-md border border-white/25 bg-black/25 shadow-xl backdrop-blur-md transition-colors group-hover:bg-black/35">
        <IconComponent className="h-7 w-7 text-white drop-shadow" />
      </div>
      <span className="mt-1 max-w-full rounded bg-black/30 px-1 py-0.5 text-xs font-medium text-white shadow-sm [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
        {app.title}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
