'use client';

import React from 'react';
import type { WindowInstance } from '@/types';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion';


const DockIcon = ({ win, mouseX }: { win: WindowInstance; mouseX: MotionValue<number> }) => {
    const { focusWindow } = useWindows();
    const ref = React.useRef<HTMLButtonElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const scale = useTransform(distance, [-100, 0, 100], [1, 1.5, 1], {
      clamp: false,
    });

    const isFocused = win.isFocused && !win.isMinimized;
    const IconComponent = win.icon;

    return (
        <Tooltip key={win.id} delayDuration={100}>
            <TooltipTrigger asChild>
                <motion.button
                    ref={ref}
                    onClick={() => focusWindow(win.id)}
                    style={{ scale }}
                    className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-ring backdrop-blur-md",
                        isFocused ? 'bg-primary/20' : 'bg-black/10 dark:bg-white/10'
                    )}
                    aria-label={`Focus ${win.title}`}
                >
                    <IconComponent className="w-7 h-7" />
                    <div
                        className={cn(
                            "absolute bottom-1 w-1.5 h-1.5 rounded-full bg-foreground transition-all duration-200",
                            isFocused ? "opacity-100" : "opacity-0"
                        )}
                    />
                </motion.button>
            </TooltipTrigger>
            <TooltipContent side="top" className="mb-2">
                <p>{win.title}</p>
            </TooltipContent>
        </Tooltip>
    );
};


const Dock = () => {
  const { windows } = useWindows();
  const mouseX = useMotionValue(Infinity);

  return (
    <TooltipProvider>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto bg-card/40 backdrop-blur-lg border border-black/10 dark:border-white/10 shadow-xl rounded-full p-2 z-[1000] flex flex-row items-end gap-3 h-16 sm:bottom-4"
        style={{
          maxWidth: '90vw',
          overflowX: 'auto',
        }}
      >
        {windows.map(win => (
            <DockIcon key={win.id} win={win} mouseX={mouseX} />
        ))}
      </motion.div>
    </TooltipProvider>
  );
};

export default Dock;
