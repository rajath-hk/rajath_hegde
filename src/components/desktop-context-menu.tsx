'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  RefreshCw, 
  Wallpaper,
  FolderPlus,
  View,
  Layout,
  Settings
} from 'lucide-react';
import { useWindows } from '@/contexts/window-context';

interface DesktopContextMenuProps {
  children: React.ReactNode;
}

const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({ children }) => {
  const { resetIconPositions, desktopIcons, openWindow } = useWindows();

  const handleViewSettings = () => {
    const settingsApp = desktopIcons.find(app => app.id === 'settings');
    if (settingsApp) {
      openWindow(settingsApp);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => resetIconPositions()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          <span>Reset Icon Positions</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <View className="mr-2 h-4 w-4" />
            <span>View</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem disabled>Large icons</DropdownMenuItem>
            <DropdownMenuItem disabled>Medium icons</DropdownMenuItem>
            <DropdownMenuItem disabled>Small icons</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Show desktop icons</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Layout className="mr-2 h-4 w-4" />
            <span>Layout</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem disabled>Auto arrange icons</DropdownMenuItem>
            <DropdownMenuItem disabled>Align icons to grid</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Wallpaper className="mr-2 h-4 w-4" />
          <span>Change Wallpaper</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <FolderPlus className="mr-2 h-4 w-4" />
          <span>New Folder</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleViewSettings}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesktopContextMenu;