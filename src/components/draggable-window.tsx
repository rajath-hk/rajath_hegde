'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Window as WindowComponent } from '@/components/window';

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
  const constraintsRef = useRef(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={constraintsRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            zIndex: 50,
          }}
          drag
          dragMomentum={false}
          dragConstraints={{
            left: -position.x,
            right: window.innerWidth - position.x - 100,
            top: -position.y,
            bottom: window.innerHeight - position.y - 100,
          }}
          onDragEnd={(_, info) => {
            setPosition(prev => ({
              x: prev.x + info.offset.x,
              y: prev.y + info.offset.y,
            }));
          }}
        >
          <WindowComponent title={title} onClose={onClose}>
            {children}
          </WindowComponent>
        </motion.div>
      )}
    </AnimatePresence>
  );
}