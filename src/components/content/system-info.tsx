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
    browser: 'Chrome',
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
    <div>
      <h1>System Information</h1>
    </div>
  );
};

export default SystemInfo;