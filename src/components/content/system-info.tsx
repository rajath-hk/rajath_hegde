'use client';

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Wifi, 
  Battery,
  Monitor,
  Globe,
  Activity,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const SystemInfo = () => {
  const [systemStats, setSystemStats] = useState({
    cpu: 25,
    memory: 65,
    disk: 40,
    network: 75,
    battery: 85,
    uptime: '5 days, 3 hours',
    os: 'PortfolioOS 1.0.0',
    kernel: 'Web 5.15.0',
    resolution: '1920x1080',
    browser: navigator.userAgent.split(' ')[0],
    location: 'Bengaluru, India'
  });

  // Simulate updating stats
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() * 10 - 5))),
        memory: Math.min(100, Math.max(0, prev.memory + (Math.random() * 5 - 2.5))),
        network: Math.min(100, Math.max(0, prev.network + (Math.random() * 10 - 5)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (uptime: string) => {
    return uptime;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <h1 className="text-2xl font-bold">System Information</h1>
        <p className="text-muted-foreground">Detailed information about your system</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="w-5 h-5 mr-2" />
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Operating System</span>
                <span>{systemStats.os}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kernel</span>
                <span>{systemStats.kernel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Uptime</span>
                <span>{systemStats.uptime}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Browser</span>
                <span>{systemStats.browser}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resolution</span>
                <span>{systemStats.resolution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span>{systemStats.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="font-medium">CPU Usage</span>
                </div>
                <span className="text-sm">{Math.round(systemStats.cpu)}%</span>
              </div>
              <Progress value={systemStats.cpu} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <MemoryStick className="w-4 h-4 mr-2 text-green-500" />
                  <span className="font-medium">Memory Usage</span>
                </div>
                <span className="text-sm">{Math.round(systemStats.memory)}%</span>
              </div>
              <Progress value={systemStats.memory} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <div className="flex items-center">
                  <HardDrive className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="font-medium">Disk Usage</span>
                </div>
                <span className="text-sm">{Math.round(systemStats.disk)}%</span>
              </div>
              <Progress value={systemStats.disk} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        {/* Network & Power */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wifi className="w-5 h-5 mr-2" />
                Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Internet</span>
                    <span className="text-sm">Connected</span>
                  </div>
                  <Progress value={systemStats.network} className="h-2" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IP Address</span>
                  <span>192.168.1.100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Download</span>
                  <span>45.2 Mbps</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Upload</span>
                  <span>12.8 Mbps</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Battery className="w-5 h-5 mr-2" />
                Power
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Battery</span>
                    <span className="text-sm">{Math.round(systemStats.battery)}%</span>
                  </div>
                  <Progress value={systemStats.battery} className="h-2" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Power Source</span>
                  <span>AC Power</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Battery Health</span>
                  <span>Good</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span>7h 24m remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Device Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Device Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium mb-2">Display</h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <div>Resolution: {systemStats.resolution}</div>
                  <div>Scale: 100%</div>
                  <div>Refresh Rate: 60Hz</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Browser</h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <div>Name: {systemStats.browser}</div>
                  <div>Version: 120.0</div>
                  <div>Cookies: Enabled</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Security</h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <div>JavaScript: Enabled</div>
                  <div>Pop-ups: Blocked</div>
                  <div>Location: Allowed</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemInfo;