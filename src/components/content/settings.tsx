'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [wallpaper, setWallpaper] = useState('default');
  const [animationSpeed, setAnimationSpeed] = useState(300);

  const wallpapers = [
    { id: 'default', name: 'Default' },
    { id: 'space', name: 'Space' },
    { id: 'mountains', name: 'Mountains' },
    { id: 'city', name: 'City' },
  ];

  return (
    <div className="h-full overflow-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="personalization">Personalization</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of your portfolio OS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Theme</h3>
                    <p className="text-sm text-muted-foreground">
                      Select light or dark theme
                    </p>
                  </div>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Animations</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable animations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Animation Speed</h3>
                    <span className="text-sm text-muted-foreground">{animationSpeed}ms</span>
                  </div>
                  <Slider 
                    value={[animationSpeed]} 
                    onValueChange={([value]) => setAnimationSpeed(value)}
                    min={100} 
                    max={1000} 
                    step={50} 
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System</CardTitle>
                <CardDescription>
                  Configure system-level settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-save Layout</h3>
                    <p className="text-sm text-muted-foreground">
                      Save window positions automatically
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Startup Animation</h3>
                    <p className="text-sm text-muted-foreground">
                      Show boot animation on page load
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable system notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="personalization">
            <Card>
              <CardHeader>
                <CardTitle>Personalization</CardTitle>
                <CardDescription>
                  Customize your desktop experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Wallpaper</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose your desktop background
                    </p>
                  </div>
                  <Select value={wallpaper} onValueChange={setWallpaper}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select wallpaper" />
                    </SelectTrigger>
                    <SelectContent>
                      {wallpapers.map((wp) => (
                        <SelectItem key={wp.id} value={wp.id}>
                          {wp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Desktop Icons</h3>
                    <p className="text-sm text-muted-foreground">
                      Show/hide desktop icons
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Taskbar Position</h3>
                    <p className="text-sm text-muted-foreground">
                      Where to show the taskbar
                    </p>
                  </div>
                  <Select defaultValue="bottom">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Portfolio OS</CardTitle>
                <CardDescription>
                  Information about this interactive portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Version</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Developer</span>
                  <span>Rajath Hegde</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Framework</span>
                  <span>Next.js 15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Last Updated</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    This interactive portfolio simulates a complete operating system experience 
                    within a web browser. Built with modern web technologies to showcase skills 
                    and projects in an engaging way.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;