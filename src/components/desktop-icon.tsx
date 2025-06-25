'use client';

import type { AppConfig } from '@/types';
import { useWindows } from '@/contexts/window-context';
import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  app: AppConfig;
}

const DesktopIcon = ({ app }: DesktopIconProps) => {
  const { openWindow, updateIconPosition } = useWindows();
  const IconComponent = app.icon;

  return (
    <motion.button
      style={{ top: app.y, left: app.x, position: 'absolute' }}
      className="flex flex-col items-center justify-center text-center focus:outline-none p-2 select-none w-24"
      aria-label={`Open ${app.title}`}
      onTap={() => openWindow(app)}
      drag
      dragMomentum={false}
      onDragEnd={(e, info) => {
        updateIconPosition(app.id, app.x + info.offset.x, app.y + info.offset.y);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="w-16 h-16 rounded-lg bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-md border border-white/10">
        <IconComponent className="w-9 h-9 text-foreground" />
      </div>
      <span className="text-xs mt-2 text-black/80 dark:text-white/90 font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.1)] dark:[text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
        {app.title}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
