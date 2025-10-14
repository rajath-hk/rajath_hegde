'use client';

import React from 'react';
import type { AppConfig } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  app: AppConfig;
}

const DesktopIcon = ({ app }: DesktopIconProps) => {
  const { openWindow } = useWindows();
  const [isDoubleClick, setIsDoubleClick] = React.useState(false);

  const handleClick = () => {
    if (!isDoubleClick) {
      // Single click - focus or prepare for double click
      setIsDoubleClick(true);
      setTimeout(() => setIsDoubleClick(false), 300);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDoubleClick(false);
    openWindow(app);
  };

  const IconComponent = app.icon;

  return (
    <motion.div
      className="flex flex-col items-center p-2 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-1">
        <IconComponent className="w-6 h-6 text-primary" />
      </div>
      <span className="text-xs text-center text-foreground max-w-[80px] truncate">
        {app.title}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;