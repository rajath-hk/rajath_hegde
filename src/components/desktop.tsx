'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWindows } from '@/contexts/window-context';
import DesktopIcon from '@/components/desktop-icon';
import Window from '@/components/window';
import DesktopActivity from '@/components/desktop-activity';
import SidePanel from '@/components/side-panel';
import NotificationCenter from '@/components/notification-center';
import ChatbotPlaceholder from '@/components/chatbot-placeholder';
import {
  ArrowDownUp,
  RefreshCw,
  Wallpaper,
  Folder,
  Copy,
  Share2,
  ExternalLink,
} from 'lucide-react';

const Desktop = () => {
  const { windows, desktopIcons, resetIconPositions, openWindow } = useWindows();
  const desktopRef = React.useRef<HTMLDivElement>(null);
  const [contextMenuOpen, setContextMenuOpen] = React.useState(false);
  const [contextMenuPosition, setContextMenuPosition] = React.useState({ x: 0, y: 0 });

  const handleContextMenu = (event: React.MouseEvent) => {
    // Prevent the default browser context menu
    event.preventDefault();
    
    // Set the position for our custom context menu
    setContextMenuPosition({ x: event.clientX, y: event.clientY });

    // Show the context menu
    setContextMenuOpen(true);
  };

  const copyTextToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('Rajath Hegde - Full Stack Developer Portfolio')
        .then(() => {
          // Show a notification
          if (typeof document !== 'undefined') {
            const notification = document.createElement("div");
            notification.className = "fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg z-50";
            notification.textContent = "Copied to clipboard!";
            document.body.appendChild(notification);
            setTimeout(() => {
              if (document.body.contains(notification)) {
                document.body.removeChild(notification);
              }
            }, 2000);
          }
        });
    }
    setContextMenuOpen(false);
  };

  const shareContent = async () => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Rajath Hegde - Portfolio',
            text: 'Check out this amazing portfolio!',
            url: window.location.href,
          });
        } catch (err) {
          console.log('Error sharing:', err);
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href)
            .then(() => {
              if (typeof document !== 'undefined') {
                const notification = document.createElement("div");
                notification.className = "fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg z-50";
                notification.textContent = "Link copied to clipboard!";
                document.body.appendChild(notification);
                setTimeout(() => {
                  if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                  }
                }, 2000);
              }
            });
        }
      }
    }
    setContextMenuOpen(false);
  };

  return (
    <>
      <div
        ref={desktopRef}
        id="desktop-area"
        className="absolute inset-0 pt-8 sm:pt-8"
        onContextMenu={handleContextMenu}
      >
        <DropdownMenu open={contextMenuOpen} onOpenChange={setContextMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div
              style={{
                position: 'fixed',
                left: contextMenuPosition.x,
                top: contextMenuPosition.y,
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={copyTextToClipboard}>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Text</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={shareContent}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open(window.location.href, '_blank');
                }
                setContextMenuOpen(false);
              }}>
                <ExternalLink className="mr-2 h-4 w-4" />
                <span>Open in New Window</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                <span>Sort by</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem disabled>Name</DropdownMenuItem>
                  <DropdownMenuItem disabled>Date Modified</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            
            <DropdownMenuItem onClick={() => { resetIconPositions(); setContextMenuOpen(false); }}>
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Reset Icon Positions</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem disabled>
              <Wallpaper className="mr-2 h-4 w-4" />
              <span>Change Wallpaper</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Folder className="mr-2 h-4 w-4" />
              <span>New Folder</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {desktopIcons.map((app) => (
          <DesktopIcon key={app.id} app={app} constraintsRef={desktopRef} />
        ))}
        
        <DesktopActivity />
        <SidePanel />
        <NotificationCenter />
        <ChatbotPlaceholder />
      </div>

      {windows.map((win) => (
        !win.isMinimized && <Window key={win.id} {...win} />
      ))}
    </>
  );
};

export default Desktop;