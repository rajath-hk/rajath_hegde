'use client';

import type { AppConfig } from '@/types';
import { useWindows } from '@/contexts/window-context';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface DesktopIconProps {
  app: AppConfig;
  constraintsRef: React.RefObject<HTMLDivElement>;
}

const DesktopIcon = ({ app, constraintsRef }: DesktopIconProps) => {
  const { openWindow, updateIconPosition, desktopIcons } = useWindows();
  const IconComponent = app.icon;
  const [isMobile, setIsMobile] = useState(false);
  const isDraggingRef = React.useRef(false);

  // Check if we're on mobile
  useEffect(() => {
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

  // Sync motion values if the state from context changes (e.g., on initial load or reset)
  useEffect(() => {
    const currentIcon = desktopIcons.find(icon => icon.id === app.id);
    if (currentIcon) {
      x.set(currentIcon.x ?? 0);
      y.set(currentIcon.y ?? 0);
    }
  }, [app.id, desktopIcons, x, y]);

  return (
    <motion.button
  // Use motion values for position via `style`. Framer Motion will manage this.
      style={{ x, y, position: 'absolute' }}
      className="flex flex-col items-center justify-center text-center focus:outline-none p-2 select-none w-20"
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
      onDragStart={() => { isDraggingRef.current = true; }}
      onDragEnd={() => { isDraggingRef.current = false; updateIconPosition(app.id, x.get(), y.get()); }}
      drag={!isMobile} // Only allow drag on desktop
      dragConstraints={constraintsRef}
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }} // Better touch feedback on mobile
    >
      <div className="w-14 h-14 rounded-lg bg-black/10 dark:bg-white/10 backdrop-blur-lg flex items-center justify-center shadow border border-black/10 dark:border-white/10">
        <IconComponent className="w-7 h-7 text-foreground" />
      </div>
      <span className="text-xs mt-1 text-foreground font-medium [text-shadow:0_1px_2px_rgba(255,255,255,0.2)] dark:[text-shadow:0_1px_2px_rgba(0,0,0,0.5)] px-1 py-0.5 rounded">
        {app.title}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;