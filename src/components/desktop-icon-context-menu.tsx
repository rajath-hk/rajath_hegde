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
import { AppConfig } from '@/types';
import { 
  ExternalLink, 
  Info, 
  Trash2,
  Pin,
  Edit3
} from 'lucide-react';

interface DesktopIconContextMenuProps {
  app: AppConfig;
  children: React.ReactNode;
}

const DesktopIconContextMenu: React.FC<DesktopIconContextMenuProps> = ({ app, children }) => {
  const { openWindow } = useWindows();

  const handleOpen = () => {
    openWindow(app);
  };

  const handleOpenNewWindow = () => {
    openWindow(app);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={handleOpen}>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>Open</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenNewWindow}>
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>Open in New Window</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Edit3 className="mr-2 h-4 w-4" />
          <span>Rename</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Pin className="mr-2 h-4 w-4" />
          <span>Pin to Start</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Info className="mr-2 h-4 w-4" />
          <span>Properties</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesktopIconContextMenu;