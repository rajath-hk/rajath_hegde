import type { ComponentType, ReactNode } from 'react';

export interface AppConfig {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  content: ReactNode;
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
}
