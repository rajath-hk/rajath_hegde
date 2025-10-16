'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWindows } from '@/contexts/window-context';
import { WindowInstance } from '@/types';
import { 
  Minimize, 
  Maximize, 
  RotateCw,
  X
} from 'lucide-react';

interface TaskbarItemContextMenuProps {
  windowInstance: WindowInstance;
  children: React.ReactNode;
}

const TaskbarItemContextMenu: React.FC<TaskbarItemContextMenuProps> = ({ windowInstance, children }) => {
  const { closeWindow, toggleMinimize, toggleMaximize, focusWindow } = useWindows();

  const handleClose = () => {
    closeWindow(windowInstance.id);
  };

  const handleMinimize = () => {
    toggleMinimize(windowInstance.id);
  };

  const handleMaximize = () => {
    focusWindow(windowInstance.id);
    toggleMaximize(windowInstance.id);
  };

  const handleRestore = () => {
    focusWindow(windowInstance.id);
    if (windowInstance.isMinimized) {
      toggleMinimize(windowInstance.id);
    }
    if (windowInstance.isMaximized) {
      toggleMaximize(windowInstance.id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {!windowInstance.isMinimized ? (
          <DropdownMenuItem onClick={handleMinimize}>
            <Minimize className="mr-2 h-4 w-4" />
            <span>Minimize</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleRestore}>
            <RotateCw className="mr-2 h-4 w-4" />
            <span>Restore</span>
          </DropdownMenuItem>
        )}
        {!windowInstance.isMaximized && (
          <DropdownMenuItem onClick={handleMaximize}>
            <Maximize className="mr-2 h-4 w-4" />
            <span>Maximize</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClose}>
          <X className="mr-2 h-4 w-4" />
          <span>Close</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskbarItemContextMenu;