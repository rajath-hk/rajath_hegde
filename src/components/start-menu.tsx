'use client';

import React, { useState } from 'react';
import { useWindows } from '@/contexts/window-context';
import { 
  Search, 
  User, 
  Folder, 
  Mail, 
  Award, 
  Terminal, 
  Settings, 
  HardDrive, 
  Globe,
  Play,
  Calculator,
  Cloud,
  Notebook,
  Power,
  LogOut
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const StartMenu = () => {
  const { openWindow, desktopIcons } = useWindows();
  const [searchTerm, setSearchTerm] = useState('');

  const allApps = desktopIcons.filter(app => app.id !== 'legal');

  const filteredApps = allApps.filter(app =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const appCategories = [
    {
      name: 'Productivity',
      icon: <Folder className="w-4 h-4" />,
      apps: ['about', 'projects', 'my-work', 'resume', 'contact', 'socials']
    },
    {
      name: 'Utilities',
      icon: <Settings className="w-4 h-4" />,
      apps: ['settings', 'explorer', 'browser', 'terminal']
    },
    {
      name: 'Media',
      icon: <Play className="w-4 h-4" />,
      apps: ['media', 'calculator', 'weather', 'notes']
    }
  ];

  const powerOptions = [
    { name: 'Sleep', icon: <Power className="w-4 h-4" />, action: () => console.log('Sleep') },
    { name: 'Restart', icon: <Power className="w-4 h-4" />, action: () => window.location.reload() },
    { name: 'Shut Down', icon: <Power className="w-4 h-4" />, action: () => console.log('Shut Down') },
    { name: 'Log Out', icon: <LogOut className="w-4 h-4" />, action: () => console.log('Log Out') }
  ];

  return (
    <div className="absolute bottom-10 left-2 w-96 bg-background/80 backdrop-blur-xl border rounded-lg shadow-xl z-50">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search apps, settings, and documents"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {searchTerm ? (
          <div className="p-2">
            <div className="text-xs font-semibold px-2 py-1 text-muted-foreground uppercase">
              Search Results
            </div>
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <Button
                  key={app.id}
                  variant="ghost"
                  className="w-full justify-start h-12 px-3"
                  onClick={() => {
                    openWindow(app);
                  }}
                >
                  <app.icon className="w-5 h-5 mr-3" />
                  <span>{app.title}</span>
                </Button>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No apps found matching "{searchTerm}"
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="p-2">
              <div className="text-xs font-semibold px-2 py-1 text-muted-foreground uppercase">
                Pinned
              </div>
              <div className="grid grid-cols-3 gap-2 p-2">
                {allApps.slice(0, 6).map((app) => (
                  <TooltipProvider key={app.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex flex-col h-16 items-center justify-center p-1"
                          onClick={() => openWindow(app)}
                        >
                          <app.icon className="w-6 h-6 mb-1" />
                          <span className="text-xs text-center truncate w-full">
                            {app.title}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{app.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            
            <div className="border-t">
              {appCategories.map((category) => (
                <div key={category.name} className="p-2">
                  <div className="flex items-center px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    {category.apps.map((appId) => {
                      const app = allApps.find(a => a.id === appId);
                      if (!app) return null;
                      
                      return (
                        <Button
                          key={app.id}
                          variant="ghost"
                          className="w-full justify-start h-10 px-3"
                          onClick={() => openWindow(app)}
                        >
                          <app.icon className="w-5 h-5 mr-3" />
                          <span>{app.title}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="border-t p-2">
        <div className="grid grid-cols-4 gap-1">
          {powerOptions.map((option) => (
            <TooltipProvider key={option.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex flex-col h-12 items-center justify-center p-1"
                    onClick={option.action}
                  >
                    {option.icon}
                    <span className="text-xs mt-1">{option.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{option.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartMenu;