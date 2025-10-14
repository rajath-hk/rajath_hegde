import type { ComponentType, ReactNode } from 'react';

// Updated to make content optional
export interface AppConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content?: React.ComponentType; // Make content optional
  defaultSize?: { width: number; height: number };
  x?: number;
  y?: number;
}

export interface WindowInstance extends AppConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  // Store component type instead of React element
  content: React.ComponentType;
}
