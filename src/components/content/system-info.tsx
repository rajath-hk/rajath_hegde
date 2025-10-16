'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const SystemInfo = () => {
  // Mock system information
  const systemInfo = {
    os: 'PortfolioOS 1.0',
    kernel: 'Next.js 15.3.3',
    uptime: '1 day, 3 hours, 42 minutes',
    cpu: 'Intel Core i7-11800H (8) @ 2.30GHz',
    memory: {
      total: 16384,
      used: 8192,
      free: 8192
    },
    storage: {
      total: 512000,
      used: 256000,
      free: 256000
    },
    browser: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    resolution: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : 'Unknown',
    theme: 'Dark'
  };

  const memoryUsage = (systemInfo.memory.used / systemInfo.memory.total) * 100;
  const storageUsage = (systemInfo.storage.used / systemInfo.storage.total) * 100;

  return (
    <div className="h-full overflow-auto p-6">
      <h1 className="text-2xl font-bold mb-6">System Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Operating System</span>
              <span>{systemInfo.os}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kernel</span>
              <span>{systemInfo.kernel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Uptime</span>
              <span>{systemInfo.uptime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Resolution</span>
              <span>{systemInfo.resolution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Theme</span>
              <span>{systemInfo.theme}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Hardware Information */}
        <Card>
          <CardHeader>
            <CardTitle>Hardware</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Processor</span>
              <span className="text-right">{systemInfo.cpu}</span>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Memory</span>
                <span>{systemInfo.memory.used} MB / {systemInfo.memory.total} MB</span>
              </div>
              <Progress value={memoryUsage} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Storage</span>
                <span>{systemInfo.storage.used} MB / {systemInfo.storage.total} MB</span>
              </div>
              <Progress value={storageUsage} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        {/* Browser Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Browser Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-mono bg-muted p-4 rounded-lg overflow-x-auto">
              {systemInfo.browser}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* ASCII Art */}
      <div className="mt-6 text-center">
        <pre className="text-xs opacity-70">
{`                    .....
                  .........
                .............
              .................
            .....................
          ......................... 
        .............................
      .................................
    .....................................
  .........................................
.............................................
  .........................................
    .....................................
      .................................
        .............................
          ......................... 
            .....................
              .................
                .............
                  .........
                    .....`}
        </pre>
        <p className="mt-2 text-sm text-muted-foreground">PortfolioOS - Rajath Hegde Edition</p>
      </div>
    </div>
  );
};

export default SystemInfo;