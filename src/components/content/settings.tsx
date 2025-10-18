'use client';

import React, { useState, useEffect } from 'react';
import { 
  Monitor, 
  Palette, 
  Volume2,
  Bell,
  Shield,
  Info,
  Sun,
  Moon,
  Desktop,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('system');
  const [theme, setTheme] = useState('dark');
  const [wallpaper, setWallpaper] = useState('/wallpapers/default.jpg');
  const [volume, setVolume] = useState(80);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [startupAnimation, setStartupAnimation] = useState(true);

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    const savedWallpaper = localStorage.getItem('portfolio-wallpaper') || '/wallpapers/default.jpg';
    const savedVolume = localStorage.getItem('portfolio-volume') || '80';
    const savedNotifications = localStorage.getItem('portfolio-notifications') || 'true';
    const savedSound = localStorage.getItem('portfolio-sound') || 'true';
    const savedAutoSave = localStorage.getItem('portfolio-auto-save') || 'true';
    const savedStartupAnimation = localStorage.getItem('portfolio-startup-animation') || 'true';
    
    setTheme(savedTheme);
    setWallpaper(savedWallpaper);
    setVolume(parseInt(savedVolume));
    setNotifications(savedNotifications === 'true');
    setSound(savedSound === 'true');
    setAutoSave(savedAutoSave === 'true');
    setStartupAnimation(savedStartupAnimation === 'true');
    
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(savedTheme);
  }, []);

  // Save settings to localStorage
  const saveSetting = (key: string, value: string | number | boolean) => {
    localStorage.setItem(`portfolio-${key}`, String(value));
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    saveSetting('theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
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
    { id: 'default', name: 'Default', url: '/wallpapers/default.jpg' },
    { id: 'space', name: 'Space', url: '/wallpapers/space.jpg' },
    { id: 'mountains', name: 'Mountains', url: '/wallpapers/mountains.jpg' },
    { id: 'city', name: 'City', url: '/wallpapers/city.jpg' },
  ];

  const themeOptions = [
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'system', name: 'System', icon: Desktop },
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
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
              <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                <TabsTrigger 
                  value="system" 
                  className="w-full justify-start data-[state=active]:bg-accent"
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  System
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="w-full justify-start data-[state=active]:bg-accent"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger 
                  value="personalization" 
                  className="w-full justify-start data-[state=active]:bg-accent"
                >
                  <Desktop className="w-4 h-4 mr-2" />
                  Personalization
                </TabsTrigger>
                <TabsTrigger 
                  value="sound" 
                  className="w-full justify-start data-[state=active]:bg-accent"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Sound
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="w-full justify-start data-[state=active]:bg-accent"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="w-full justify-start data-[state=active]:bg-accent"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger 
                  value="about" 
                  className="w-full justify-start data-[state=active]:bg-accent"
                >
                  <Info className="w-4 h-4 mr-2" />
                  About
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* System Settings */}
            <TabsContent value="system" className="p-6">
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
                  <h3 className="text-lg font-medium mb-3">Preferences</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Default Language</Label>
                      <p className="text-sm text-muted-foreground">Select your preferred language</p>
                    </div>
                    <Button variant="outline">
                      English
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Appearance Settings */}
            <TabsContent value="appearance" className="p-6">
              <h2 className="text-xl font-semibold mb-6">Appearance</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Theme</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Color scheme</Label>
                      <p className="text-sm text-muted-foreground">Select your preferred color scheme</p>
                    </div>
                    <div className="flex space-x-2">
                      {themeOptions.map((option) => (
                        <Button
                          key={option.id}
                          variant={theme === option.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleThemeChange(option.id)}
                          className="gap-1"
                        >
                          <option.icon className="w-3 h-3" />
                          {option.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Animations</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Enable Animations</Label>
                      <p className="text-sm text-muted-foreground">Smooth transitions between views</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Personalization Settings */}
            <TabsContent value="personalization" className="p-6">
              <h2 className="text-xl font-semibold mb-6">Personalization</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Wallpaper</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {wallpaperOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`relative rounded-lg overflow-hidden cursor-pointer border-2 ${
                          wallpaper === option.url ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => handleWallpaperChange(option.url)}
                      >
                        <div 
                          className="h-24 bg-cover bg-center"
                          style={{ backgroundImage: `url(${option.url})` }}
                        />
                        <div className="p-2 text-sm text-center bg-muted">
                          {option.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Taskbar</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Position</Label>
                      <p className="text-sm text-muted-foreground">Where to show the taskbar</p>
                    </div>
                    <div className="flex space-x-1">
                      {['bottom', 'top', 'left', 'right'].map((position) => (
                        <Button
                          key={position}
                          variant="outline"
                          size="sm"
                          className={position === 'bottom' ? 'bg-accent' : ''}
                        >
                          {position.charAt(0).toUpperCase() + position.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Sound Settings */}
            <TabsContent value="sound" className="p-6">
              <h2 className="text-xl font-semibold mb-6">Sound</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Sound effects</Label>
                    <p className="text-sm text-muted-foreground">Play sound effects for system events</p>
                  </div>
                  <Switch
                    checked={sound}
                    onCheckedChange={handleSoundChange}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base">Volume</Label>
                    <span className="text-sm font-medium">{volume}%</span>
                  </div>
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Sound scheme</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline">Default</Button>
                    <Button variant="outline">Classic</Button>
                    <Button variant="outline">Quiet</Button>
                    <Button variant="outline">Disabled</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications" className="p-6">
              <h2 className="text-xl font-semibold mb-6">Notifications</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications from applications</p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={handleNotificationsChange}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Notification preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>System notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Application notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Email notifications</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Social media notifications</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Privacy Settings */}
            <TabsContent value="privacy" className="p-6">
              <h2 className="text-xl font-semibold mb-6">Privacy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Data collection</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Usage analytics</Label>
                        <p className="text-sm text-muted-foreground">Help improve PortfolioOS by sending usage data</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Diagnostic data</Label>
                        <p className="text-sm text-muted-foreground">Send diagnostic data to help fix issues</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Location</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Location services</Label>
                      <p className="text-sm text-muted-foreground">Allow applications to access your location</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* About Section */}
            <TabsContent value="about" className="p-6">
              <h2 className="text-xl font-semibold mb-6">About PortfolioOS</h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">PortfolioOS</h3>
                    <p className="text-muted-foreground">Version 1.0.0</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">System information</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>Kernel: PortfolioOS 1.0.0</li>
                      <li>Architecture: Web-based</li>
                      <li>Browser: {typeof navigator !== 'undefined' ? navigator.userAgent.split(' ')[0] : 'Unknown'}</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Developer</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>Rajath Hegde</li>
                      <li>MCA Student</li>
                      <li>Karnataka, India</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Links</h4>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      Documentation
                    </Button>
                    <Button variant="outline" size="sm">
                      GitHub Repository
                    </Button>
                    <Button variant="outline" size="sm">
                      Report Issue
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;