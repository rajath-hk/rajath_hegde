'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';
import { cn } from '@/lib/utils';
import { Search, User, Folder, FileText, Mail, Briefcase, Terminal, Settings, Power } from 'lucide-react';

const StartMenu = () => {
  const { desktopIcons, openWindow } = useWindows();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter applications based on search query
  const filteredApps = desktopIcons.filter(app => 
    app.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const appCategories = [
    {
      name: 'Applications',
      icon: <Folder className="w-4 h-4" />,
      apps: desktopIcons.filter(app => 
        ['about', 'projects', 'my-work', 'resume', 'contact', 'socials'].includes(app.id)
      )
    },
    {
      name: 'Utilities',
      icon: <Settings className="w-4 h-4" />,
      apps: desktopIcons.filter(app => 
        ['terminal', 'explorer'].includes(app.id)
      )
    }
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Start Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
          isOpen 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Open Start Menu"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded bg-primary text-primary-foreground">
          <span className="text-xs font-bold">R</span>
        </div>
        <span>Start</span>
      </button>

      {/* Start Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-80 bg-background/90 backdrop-blur-xl border rounded-lg shadow-xl overflow-hidden z-[100]">
          {/* Search Bar */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search apps..."
                className="w-full rounded-md bg-muted pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Applications */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery ? (
              // Show search results
              <div className="p-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Search Results
                </div>
                {filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        openWindow(app);
                        setIsOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-accent"
                    >
                      <app.icon className="h-5 w-5" />
                      <span>{app.title}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    No applications found
                  </div>
                )}
              </div>
            ) : (
              // Show categorized apps
              <div className="space-y-1">
                {appCategories.map((category) => (
                  <div key={category.name}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground flex items-center gap-2">
                      {category.icon}
                      <span>{category.name}</span>
                    </div>
                    {category.apps.map((app) => (
                      <button
                        key={app.id}
                        onClick={() => {
                          openWindow(app);
                          setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-accent"
                      >
                        <app.icon className="h-5 w-5" />
                        <span>{app.title}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Profile and Power Options */}
          <div className="p-2 border-t">
            <button className="flex w-full items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-accent">
              <User className="h-5 w-5" />
              <span>Rajath Hegde</span>
            </button>
            <button className="flex w-full items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-accent text-red-500">
              <Power className="h-5 w-5" />
              <span>Shut Down</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartMenu;