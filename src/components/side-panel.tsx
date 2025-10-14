'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronRight, Home, User, Folder, Briefcase, FileText, Mail, Link } from 'lucide-react';
import { useWindows } from '@/contexts/window-context';

const SidePanel = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { openWindow, desktopIcons } = useWindows();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 rounded-l-none rounded-r-full shadow-lg"
          aria-label="Open quick links"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Quick Links</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <nav className="space-y-1">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleLinkClick(link.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {link.title}
                  </Button>
                );
              })}
            </nav>
          </div>
          
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" asChild>
              <a href="https://github.com/rajath-hk" target="_blank" rel="noopener noreferrer">
                <Link className="mr-2 h-4 w-4" />
                Visit GitHub
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidePanel;