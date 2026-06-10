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
    uptime: '0 days, 2 hours',
    os: 'HegdeOS 2.0.0',
    kernel: 'Web 6.1.0',
    resolution: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '1920x1080',
    browser: typeof navigator !== 'undefined' ? navigator.userAgent.split(' ')[0] : 'Chrome',
    location: 'Karnataka, India'
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

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Cpu className="w-4 h-4 mr-2" /> CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(systemStats.cpu)}%</div>
            <Progress value={systemStats.cpu} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <MemoryStick className="w-4 h-4 mr-2" /> Memory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(systemStats.memory)}%</div>
            <Progress value={systemStats.memory} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Monitor className="w-5 h-5 mr-2" /> System Details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">OS Name</div>
            <div className="font-medium">{systemStats.os}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Kernel</div>
            <div className="font-medium">{systemStats.kernel}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Uptime</div>
            <div className="font-medium">{systemStats.uptime}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Location</div>
            <div className="font-medium">{systemStats.location}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Resolution</div>
            <div className="font-medium">{systemStats.resolution}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Browser</div>
            <div className="font-medium">{systemStats.browser}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemInfo;
