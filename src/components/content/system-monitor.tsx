'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Network, 
  Activity,
  Clock,
  Zap,
  Database
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SystemMonitor = () => {
  const [time, setTime] = useState(new Date());
  const [cpuData, setCpuData] = useState<{time: string; value: number}[]>([]);
  const [memoryData, setMemoryData] = useState<{time: string; value: number}[]>([]);
  const [networkData, setNetworkData] = useState<{time: string; upload: number; download: number}[]>([]);

  // Mock system data
  const systemInfo = {
    cpu: {
      usage: 24,
      cores: 8,
      frequency: '2.30 GHz'
    },
    memory: {
      total: 16384,
      used: 8192,
      available: 8192,
      percentage: 50
    },
    storage: {
      total: 512000,
      used: 256000,
      available: 256000,
      percentage: 50
    },
    network: {
      upload: 1.2,
      download: 5.7,
      totalUpload: 128000,
      totalDownload: 512000
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      
      // Update charts data
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      // Generate mock data points
      const newCpuPoint = {
        time: timeString,
        value: Math.floor(Math.random() * 30) + 15 // 15-45% CPU usage
      };
      
      const newMemoryPoint = {
        time: timeString,
        value: Math.floor(Math.random() * 20) + 40 // 40-60% memory usage
      };
      
      const newNetworkPoint = {
        time: timeString,
        upload: Math.random() * 2,
        download: Math.random() * 10
      };
      
      // Keep only last 10 data points
      setCpuData(prev => [...prev.slice(-9), newCpuPoint]);
      setMemoryData(prev => [...prev.slice(-9), newMemoryPoint]);
      setNetworkData(prev => [...prev.slice(-9), newNetworkPoint]);
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full overflow-auto p-6">
      <h1 className="text-2xl font-bold mb-6">System Monitor</h1>
      
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemInfo.cpu.usage}%</div>
            <p className="text-xs text-muted-foreground">
              {systemInfo.cpu.cores} cores @ {systemInfo.cpu.frequency}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemInfo.memory.used} MB</div>
            <p className="text-xs text-muted-foreground">
              of {systemInfo.memory.total} MB
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemInfo.storage.used} MB</div>
            <p className="text-xs text-muted-foreground">
              of {systemInfo.storage.total} MB
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemInfo.network.download} MB/s</div>
            <p className="text-xs text-muted-foreground">
              Down / {systemInfo.network.upload} MB/s Up
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Resource Usage Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Current Usage</span>
              <span className="text-sm font-medium">{systemInfo.cpu.usage}%</span>
            </div>
            <Progress value={systemInfo.cpu.usage} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MemoryStick className="h-5 w-5" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Used: {systemInfo.memory.used} MB</span>
              <span className="text-sm font-medium">{systemInfo.memory.percentage}%</span>
            </div>
            <Progress value={systemInfo.memory.percentage} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Used: {systemInfo.storage.used} MB</span>
              <span className="text-sm font-medium">{systemInfo.storage.percentage}%</span>
            </div>
            <Progress value={systemInfo.storage.percentage} className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              CPU Usage History
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Memory Usage History
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Network Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Network Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={networkData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="download" 
                name="Download"
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="upload" 
                name="Upload"
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* System Information Footer */}
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{time.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>PortfolioOS 1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;