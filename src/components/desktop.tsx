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
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
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
    // Check for browser environment and clipboard API support
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && 
        navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText('Rajath Hegde - Full Stack Developer Portfolio')
        .then(() => {
          toast({
            title: "Copied to clipboard!",
          });
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          toast({
            title: "Failed to copy text",
            variant: "destructive",
          });
        });
    }
    setContextMenuOpen(false);
  };

  const shareContent = async () => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      setContextMenuOpen(false);
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Rajath Hegde - Portfolio',
          text: 'Check out this amazing portfolio!',
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Link copied to clipboard!",
          });
        } else {
          // If neither API is available, just close the menu
          console.warn('Sharing not supported in this browser');
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Error sharing content:', err);
        toast({
          title: "Failed to share content",
          variant: "destructive",
        });
      }
    } finally {
      setContextMenuOpen(false);
    }
  };

  const handleOpenWindow = (app: AppConfig) => {
    try {
      openWindow(app);
    } catch (error) {
      console.error('Error opening window:', error);
      toast({
        title: "Error",
        description: "Failed to open window. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleIconClick = (app: AppConfig) => {
    try {
      openWindow(app);
    } catch (error) {
      console.error('Error opening window:', error);
      toast({
        title: "Error",
        description: "Failed to open application. Please try again.",
        variant: "destructive",
      });
    }
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