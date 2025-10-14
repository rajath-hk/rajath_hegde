'use client';

import React, { useState, useEffect } from 'react';
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        focusWindow(win.id);
      }
    };

    return (
        <Tooltip key={win.id} delayDuration={100}>
            <TooltipTrigger asChild>
                <motion.button
                    ref={ref}
                    onClick={() => focusWindow(win.id)}
                    onKeyDown={handleKeyDown}
                    style={{ scale }}
                    className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-md",
                        isFocused ? 'bg-primary/20' : 'bg-black/10 dark:bg-white/10'
                    )}
                    aria-label={`Focus ${win.title}`}
                    tabIndex={0}
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything on the server
    if (!mounted) {
        return null;
    }

    return (
        <TooltipProvider>
            <motion.div
                className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/10 dark:bg-white/10 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-2 flex items-center justify-center gap-2 shadow-xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {windows.map((win) => (
                    <DockIcon key={win.id} win={win} mouseX={mouseX} />
                ))}
            </motion.div>
        </TooltipProvider>
    );
};

export default Dock;