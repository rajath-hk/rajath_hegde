'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { 
  Monitor, 
  Palette, 
  Volume2,
  Bell,
  Shield,
  Info,
  Sun,
  Moon,
  Laptop,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('system');
  const [wallpaper, setWallpaper] = useState('/logo.png');
  const [volume, setVolume] = useState(80);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [startupAnimation, setStartupAnimation] = useState(true);

  // Load settings from localStorage
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('portfolio-wallpaper') || '/logo.png';
    const savedVolume = localStorage.getItem('portfolio-volume') || '80';
    const savedNotifications = localStorage.getItem('portfolio-notifications') || 'true';
    const savedSound = localStorage.getItem('portfolio-sound') || 'true';
    const savedAutoSave = localStorage.getItem('portfolio-auto-save') || 'true';
    const savedStartupAnimation = localStorage.getItem('portfolio-startup-animation') || 'true';
    
    setWallpaper(savedWallpaper);
    setVolume(parseInt(savedVolume));
    setNotifications(savedNotifications === 'true');
    setSound(savedSound === 'true');
    setAutoSave(savedAutoSave === 'true');
    setStartupAnimation(savedStartupAnimation === 'true');
  }, []);

  // Save settings to localStorage
  const saveSetting = (key: string, value: string | number | boolean) => {
    localStorage.setItem(`portfolio-${key}`, String(value));
    
    // Special handling for wallpaper
    if (key === 'wallpaper') {
      const event = new CustomEvent('wallpaperChange', { detail: value });
      window.dispatchEvent(event);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    saveSetting('theme', newTheme);
  };

  const handleWallpaperChange = (newWallpaper: string) => {
    setWallpaper(newWallpaper);
    saveSetting('wallpaper', newWallpaper);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    saveSetting('volume', newVolume[0]);
  };

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked);
    saveSetting('notifications', checked);
  };

  const handleSoundChange = (checked: boolean) => {
    setSound(checked);
    saveSetting('sound', checked);
  };

  const handleAutoSaveChange = (checked: boolean) => {
    setAutoSave(checked);
    saveSetting('auto-save', checked);
  };

  const handleStartupAnimationChange = (checked: boolean) => {
    setStartupAnimation(checked);
    saveSetting('startup-animation', checked);
  };

  const wallpaperOptions = [
    { id: 'default', name: 'Default', url: 'https://wallpaperaccess.com/full/317501.jpg' },
    { id: 'abstract', name: 'Abstract', url: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf' },
    { id: 'mountains', name: 'Mountains', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b' },
    { id: 'city', name: 'City', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df' },
    { id: 'space', name: 'Space', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564' },
    { id: 'ocean', name: 'Ocean', url: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6' },
  ];

  const themeOptions = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'system', name: 'System', icon: Laptop },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your PortfolioOS experience</p>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-48 border-r bg-muted/30">
          <nav className="p-2">
            <div className="flex flex-col h-auto bg-transparent space-y-1">
              <Button 
                variant={activeTab === "system" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("system")}
              >
                <Monitor className="w-4 h-4 mr-2" />
                System
              </Button>
              <Button 
                variant={activeTab === "appearance" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("appearance")}
              >
                <Palette className="w-4 h-4 mr-2" />
                Appearance
              </Button>
              <Button 
                variant={activeTab === "personalization" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("personalization")}
              >
                <Laptop className="w-4 h-4 mr-2" />
                Personalization
              </Button>
              <Button 
                variant={activeTab === "sound" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("sound")}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Sound
              </Button>
              <Button 
                variant={activeTab === "notifications" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button 
                variant={activeTab === "privacy" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("privacy")}
              >
                <Shield className="w-4 h-4 mr-2" />
                Privacy
              </Button>
              <Button 
                variant={activeTab === "about" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("about")}
              >
                <Info className="w-4 h-4 mr-2" />
                About
              </Button>
            </div>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className={activeTab === "system" ? "block p-6" : "hidden"}>
            <h2 className="text-xl font-semibold mb-6">System</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Auto-save Layout</Label>
                      <p className="text-sm text-muted-foreground">Save window positions automatically</p>
                    </div>
                    <Switch
                      checked={autoSave}
                      onCheckedChange={handleAutoSaveChange}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Startup Animation</Label>
                      <p className="text-sm text-muted-foreground">Show boot animation on page load</p>
                    </div>
                    <Switch
                      checked={startupAnimation}
                      onCheckedChange={handleStartupAnimationChange}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Power</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Hibernate after inactivity</Label>
                      <p className="text-sm text-muted-foreground">Put system to sleep after 30 minutes</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={activeTab === "appearance" ? "block p-6" : "hidden"}>
            <h2 className="text-xl font-semibold mb-6">Appearance</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {themeOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={theme === option.id ? "default" : "outline"}
                      className="flex flex-col h-24 items-center justify-center"
                      onClick={() => handleThemeChange(option.id)}
                    >
                      <option.icon className="w-6 h-6 mb-2" />
                      <span>{option.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className={activeTab === "personalization" ? "block p-6" : "hidden"}>
            <h2 className="text-xl font-semibold mb-6">Personalization</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Wallpaper</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {wallpaperOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={wallpaper === option.url ? "default" : "outline"}
                      className="flex flex-col h-24 items-center justify-center p-2"
                      onClick={() => handleWallpaperChange(option.url)}
                    >
                      <div className="w-12 h-12 rounded bg-muted mb-2 flex items-center justify-center">
                        <Palette className="w-6 h-6" />
                      </div>
                      <span className="text-xs">{option.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Colors</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <span>Blue</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-500"></div>
                    <span>Green</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                    <span>Purple</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={activeTab === "sound" ? "block p-6" : "hidden"}>
            <h2 className="text-xl font-semibold mb-6">Sound</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Volume</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Volume2 className="w-5 h-5" />
                      <Label className="text-base">System Volume</Label>
                    </div>
                    <Slider 
                      className="w-40" 
                      value={[volume]} 
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                    />
                    <span className="w-12 text-right">{volume}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Sound Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">System Sounds</Label>
                      <p className="text-sm text-muted-foreground">Play sounds for system events</p>
                    </div>
                    <Switch
                      checked={sound}
                      onCheckedChange={handleSoundChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={activeTab === "notifications" ? "block p-6" : "hidden"}>
            <h2 className="text-xl font-semibold mb-6">Notifications</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Show alerts and notifications</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={handleNotificationsChange}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Messages</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-base">System Updates</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-base">App Notifications</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={activeTab === "privacy" ? "block p-6" : "hidden"}>
            <h2 className="text-xl font-semibold mb-6">Privacy</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Data Collection</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Usage Analytics</Label>
                      <p className="text-sm text-muted-foreground">Help improve PortfolioOS by sending usage data</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Location</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Location Services</Label>
                      <p className="text-sm text-muted-foreground">Allow apps to access your location</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={activeTab === "about" ? "block p-6" : "hidden"}>
            <h2 className="text-xl font-semibold mb-6">About</h2>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">PortfolioOS</h3>
                <p className="text-muted-foreground">Version 1.0.0</p>
                <p className="mt-2 text-sm">Your personal portfolio operating system</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">System Information</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>OS Build: PortfolioOS 1.0.0</p>
                    <p>Architecture: Web-based</p>
                    <p>Kernel: React.js</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Support</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Documentation: Available online</p>
                    <p>Support: rajath@example.com</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Check for Updates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;