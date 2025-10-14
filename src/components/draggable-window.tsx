'use client';

import React, { useRef, useState, useEffect } from 'react';
import Window from '@/components/window';

interface Position {
  x: number;
  y: number;
}

interface DraggableWindowProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  defaultPosition?: Position;
}

export function DraggableWindow({
  children,
  title,
  isOpen,
  onClose,
  defaultPosition = { x: 0, y: 0 },
}: DraggableWindowProps) {
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [mounted, setMounted] = useState(false);
  const constraintsRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-200"
        style={{
          transform: 'translate(-50%, -50%) scale(1)',
        }}
      >
        <Window title={title} onClose={onClose}>
          {children}
        </Window>
      </div>
    </div>
  );
}