'use client';

import type { AppConfig } from '@/types';
import { useWindows } from '@/contexts/window-context';
import React, { useEffect, useState, useRef } from 'react';

interface DesktopIconProps {
  app: AppConfig;
  constraintsRef: React.RefObject<HTMLDivElement>;
}

const DesktopIcon = ({ app, constraintsRef }: DesktopIconProps) => {
  const { openWindow, updateIconPosition } = useWindows();
  const IconComponent = app.icon;
  const [mounted, setMounted] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: app.x ?? 0, y: app.y ?? 0 });

  // Update position when app position changes
  useEffect(() => {
    setPosition({ x: app.x ?? 0, y: app.y ?? 0 });
  }, [app.x, app.y]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', app.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const containerRect = constraintsRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const x = e.clientX - containerRect.left - 20; // 20 for icon half-width
    const y = e.clientY - containerRect.top - 20; // 20 for icon half-height

    // Constrain to container bounds
    const constrainedX = Math.max(0, Math.min(containerRect.width - 40, x));
    const constrainedY = Math.max(0, Math.min(containerRect.height - 40, y));

    setPosition({ x: constrainedX, y: constrainedY });
    updateIconPosition(app.id, constrainedX, constrainedY);
  };

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={iconRef}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="absolute flex flex-col items-center justify-center w-16 cursor-pointer group p-1 rounded transition-all duration-200 hover:bg-accent"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={() => openWindow(app)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openWindow(app);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={app.title}
    >
      <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg mb-1 group-hover:bg-primary/20 transition-colors">
        <IconComponent className="w-6 h-6 text-primary" />
      </div>
      <span className="text-xs text-center text-foreground bg-background/80 px-1 rounded group-hover:bg-accent transition-colors">
        {app.title}
      </span>
    </div>
  );
};

export default DesktopIcon;