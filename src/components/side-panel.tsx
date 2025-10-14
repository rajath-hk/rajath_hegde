'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronRight, Home, User, Folder, Briefcase, FileText, Mail, Link } from 'lucide-react';
import { useWindows } from '@/contexts/window-context';

const SidePanel = () => {
  const [open, setOpen] = useState(false);
  const { openWindow, desktopIcons } = useWindows();

  // Define quick links - these could be the most frequently accessed windows
  const quickLinks = [
    { id: 'landing', title: 'Home', icon: Home },
    { id: 'about', title: 'About Me', icon: User },
    { id: 'projects', title: 'Projects', icon: Folder },
    { id: 'my-work', title: 'My Work', icon: Briefcase },
    { id: 'resume', title: 'Resume', icon: FileText },
    { id: 'contact', title: 'Contact', icon: Mail },
  ];

  const handleLinkClick = (linkId: string) => {
    const app = desktopIcons.find(icon => icon.id === linkId);
    if (app) {
      openWindow(app);
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed top-20 right-4 z-50 rounded-full shadow-lg"
          aria-label="Open quick links panel"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64 sm:w-80">
        <div className="flex flex-col h-full">
          <div className="py-4 border-b">
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <p className="text-sm text-muted-foreground">Access your favorite sections</p>
          </div>
          
          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {quickLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <IconComponent className="mr-3 h-5 w-5" />
                    <span>{link.title}</span>
                  </button>
                );
              })}
            </nav>
            
            <div className="mt-8">
              <h3 className="px-3 text-sm font-semibold mb-2">External Links</h3>
              <nav className="space-y-1">
                <a 
                  href="https://github.com/rajath-hk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Link className="mr-3 h-5 w-5" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com/in/rajath-hegde" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Link className="mr-3 h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              </nav>
            </div>
          </div>
          
          <div className="py-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Portfolio OS v1.0
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidePanel;