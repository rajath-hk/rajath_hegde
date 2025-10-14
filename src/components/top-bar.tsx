'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TopBar = () => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 h-8 bg-black/20 dark:bg-white/10 backdrop-blur-sm border-b border-border/30 z-40 flex items-center justify-between px-4 text-xs">
      <div className="flex items-center gap-4">
        <span className="font-medium">Rajath Hegde's Portfolio</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default TopBar;
