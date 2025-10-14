'use client';

import React from 'react';
import Link from 'next/link';
import { useWindows } from '@/contexts/window-context';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Folder, 
  Mail, 
  Briefcase,
  User,
  Award,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PersistentNav = () => {
  const { openWindow } = useWindows();

  const navItems = [
    { id: 'about', title: 'About', icon: User },
    { id: 'projects', title: 'Projects', icon: Folder },
    { id: 'my-work', title: 'Experience', icon: Briefcase },
    { id: 'skills', title: 'Skills', icon: Award },
    { id: 'resume', title: 'Resume', icon: FileText },
    { id: 'contact', title: 'Contact', icon: Mail },
  ];

  const handleOpenWindow = (appId: string) => {
    const appConfigMap: Record<string, any> = {
      'about': { id: 'about', title: 'My Story', icon: FileText, defaultSize: { width: 550, height: 400 }, x: 20, y: 50 },
      'projects': { id: 'projects', title: 'Projects', icon: Folder, defaultSize: { width: 650, height: 500 }, x: 20, y: 150 },
      'my-work': { id: 'my-work', title: 'My Work', icon: Briefcase, defaultSize: { width: 500, height: 350 }, x: 20, y: 250 },
      'skills': { id: 'skills', title: 'Skills', icon: Award, defaultSize: { width: 600, height: 500 }, x: 130, y: 150 },
      'resume': { id: 'resume', title: 'My Resume', icon: FileText, defaultSize: { width: 700, height: 800 }, x: 130, y: 50 },
      'contact': { id: 'contact', title: 'Contact Me', icon: Mail, defaultSize: { width: 450, height: 580 }, x: 130, y: 150 },
    };
    
    const appConfig = appConfigMap[appId];
    if (appConfig) {
      openWindow(appConfig);
    }
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Rajath Hegde
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => handleOpenWindow(item.id)}
                className="flex items-center gap-2"
                aria-label={`Open ${item.title} window`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Button>
            ))}
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleOpenWindow('about')}
              className="flex items-center gap-2"
              aria-label="Open menu"
            >
              <User className="h-4 w-4" />
              <span>Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PersistentNav;