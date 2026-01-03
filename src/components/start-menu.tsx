'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWindows } from '@/contexts/window-context';
import { portfolioConfig } from '@/config/portfolio';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Folder, 
  Mail, 
  Briefcase,
  Award,
  Terminal,
  Settings,
  HardDrive,
  Globe,
  Play,
  Calculator,
  Cloud,
  Notebook,
  Activity,
  Image,
  Home,
  Search,
  Power,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const StartMenu = () => {
  const { openWindow, desktopIcons, openAppById } = useWindows();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState('all');
  const startMenuRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close start menu with Escape key
      if (e.key === 'Escape' && typeof window !== 'undefined') {
        const event = new CustomEvent('closeStartMenu');
        window.dispatchEvent(event);
      }
    };

    if (typeof document === 'undefined') return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Group apps by category for better organization - use desktopIcons to ensure correct mapping
  const getCategorizedApps = () => {
    const coreIds = ['about', 'resume', 'skills', 'projects'];
    const workIds = ['my-work', 'gallery', 'media'];
    const toolsIds = ['terminal', 'explorer', 'browser', 'notes', 'calculator', 'weather'];
    const systemIds = ['settings', 'system'];
    const communicationIds = ['contact', 'socials'];

    return {
      core: desktopIcons.filter(app => coreIds.includes(app.id)),
      work: desktopIcons.filter(app => workIds.includes(app.id)),
      tools: desktopIcons.filter(app => toolsIds.includes(app.id)),
      system: desktopIcons.filter(app => systemIds.includes(app.id)),
      communication: desktopIcons.filter(app => communicationIds.includes(app.id)),
    };
  };

  const categorizedApps = getCategorizedApps();

  // Get apps based on active category
  const getAppsByCategory = () => {
    if (activeCategory === 'all') {
      return [
        ...categorizedApps.core,
        ...categorizedApps.work,
        ...categorizedApps.tools,
        ...categorizedApps.system,
        ...categorizedApps.communication,
      ];
    }
    return categorizedApps[activeCategory as keyof typeof categorizedApps] || [];
  };

  // On mobile, we want a simplified start menu
  if (isMobile) {
    return (
      <motion.div
        ref={startMenuRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-background/90 backdrop-blur-xl rounded-t-xl border-t border-x shadow-2xl w-full max-w-md mx-auto"
        role="dialog"
        aria-label="Start Menu"
        aria-modal="true"
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">PortfolioOS</h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="User profile">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Settings">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 p-4">
          {getAppsByCategory().slice(0, 8).map((app) => {
            const IconComponent = app.icon;
            return (
              <Button
                key={app.id}
                variant="ghost"
                className="flex flex-col h-16 items-center justify-center p-1"
                onClick={() => {
                  // Use openAppById to ensure correct app mapping from desktopIcons
                  if (app.id) {
                    openAppById(app.id);
                  }
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center mb-1">
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-xs text-center truncate w-full">{app.title}</span>
              </Button>
            );
          })}
        </div>
        
        <div className="p-4 border-t flex justify-between">
          <Button variant="ghost" size="sm">
            <Power className="h-4 w-4 mr-2" />
            Power
          </Button>
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-background/90 backdrop-blur-xl rounded-lg border shadow-2xl w-[600px] h-[500px] flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-bold">PortfolioOS</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="flex border-b">
        {[
          { id: 'all', label: 'All Apps' },
          { id: 'core', label: 'Core' },
          { id: 'work', label: 'Work' },
          { id: 'tools', label: 'Tools' },
          { id: 'system', label: 'System' },
        ].map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            size="sm"
            className={`rounded-none border-b-2 ${activeCategory === category.id ? 'border-blue-500 text-blue-500' : 'border-transparent'}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>
      
      {/* Apps Grid */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-4 gap-4">
          {getAppsByCategory().map((app) => {
            const IconComponent = app.icon;
            return (
              <Button
                key={app.id}
                variant="ghost"
                className="flex flex-col h-20 items-center justify-center p-2 hover:bg-accent"
                onClick={() => {
                  // Use openAppById to ensure correct app mapping from desktopIcons
                  if (app.id) {
                    openAppById(app.id);
                  }
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center mb-2">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-sm text-center truncate w-full">{app.title}</span>
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* User Section */}
      <div className="p-4 border-t flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
              role="img"
              aria-label={`User avatar for ${portfolioConfig.personal.name}`}
              title={`User avatar for ${portfolioConfig.personal.name}`}
            >
              {/* Include an icon for non-color dependent affordance; icon hidden from AT since we provide aria-label on container */}
              <User className="w-4 h-4 text-white mr-1" aria-hidden="true" />
              <span className="text-white font-bold">{portfolioConfig.personal.name.charAt(0)}</span>
            </div>
          <div>
            <p className="font-medium">{portfolioConfig.personal.name}</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Power className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StartMenu;