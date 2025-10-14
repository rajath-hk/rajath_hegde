"use client";
import React, { useEffect, useState } from "react";
import Window from "@/components/window";

export function AnimatedWindow({ open, onClose, ...props }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  if (!open) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 opacity-0 transition-opacity duration-250 ease-in-out"
      style={{ opacity: open ? 1 : 0 }}
    >
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-250 ease-in-out" 
        onClick={onClose} 
        style={{ opacity: open ? 0.5 : 0 }}
      />
      <div
        className="absolute top-1/2 left-1/2 z-50 opacity-0 scale-95 translate-y-10 transition-all duration-250 ease-in-out"
        style={{
          opacity: open ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${open ? 1 : 0.95})`,
          translateY: `${open ? 0 : 40}px`
        }}
      >
        <Window {...props} onClose={onClose} />
      </div>
    </div>
  );
}