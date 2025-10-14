'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <Window title={title} onClose={onClose}>
          {children}
        </Window>
      </motion.div>
    </motion.div>
  );
}