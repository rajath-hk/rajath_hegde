'use client';

import { Grid2X2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipWrapper } from './tooltip-wrapper';
import { create } from 'zustand';

interface LayoutState {
  isGrid: boolean;
  toggleLayout: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isGrid: true,
  toggleLayout: () => set((state) => ({ isGrid: !state.isGrid })),
}));

export function LayoutToggle() {
  const { isGrid, toggleLayout } = useLayoutStore();

  return (
    <TooltipWrapper content={`Switch to ${isGrid ? 'list' : 'grid'} view`}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={toggleLayout}
        aria-label="Toggle layout"
      >
        {isGrid ? (
          <List className="h-4 w-4" />
        ) : (
          <Grid2X2 className="h-4 w-4" />
        )}
      </Button>
    </TooltipWrapper>
  );
}