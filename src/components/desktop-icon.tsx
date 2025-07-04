'use client';

import type { AppConfig } from '@/types';
import { useWindows } from '@/contexts/window-context';
import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface DesktopIconProps {
  app: AppConfig;
  constraintsRef: React.RefObject<HTMLDivElement>;
}

const DesktopIcon = ({ app, constraintsRef }: DesktopIconProps) => {
  const { openWindow, updateIconPosition } = useWindows();
  const IconComponent = app.icon;

  // Use motion values for a more robust drag implementation
  const x = useMotionValue(app.x ?? 0);
  const y = useMotionValue(app.y ?? 0);

  // Sync motion values if the state from context changes (e.g., on initial load)
  useEffect(() => {
    x.set(app.x ?? 0);
    y.set(app.y ?? 0);
  }, [app.x, app.y, x, y]);

  return (
    <motion.button
      // Use motion values for position via `style`. Framer Motion will manage this.
      style={{ x, y, position: 'absolute' }}
      className="flex flex-col items-center justify-center text-center focus:outline-none p-2 select-none w-24"
      aria-label={`Open ${app.title}`}
      onDoubleClick={(e) => {
        e.stopPropagation();
        openWindow(app);
      }}
      drag
      dragConstraints={constraintsRef}
      dragMomentum={false}
      onDragEnd={() => {
        // On drag end, update the main state in the context with the final position.
        updateIconPosition(app.id, x.get(), y.get());
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="w-16 h-16 rounded-xl bg-black/10 dark:bg-white/10 backdrop-blur-lg flex items-center justify-center shadow-lg border border-black/10 dark:border-white/10">
        <IconComponent className="w-9 h-9 text-foreground" />
      </div>
      <span className="text-xs mt-2 text-foreground font-semibold [text-shadow:0_1px_2px_rgba(255,255,255,0.2)] dark:[text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
        {app.title}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
