'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'update' | 'blog' | 'status' | 'achievement';
}

const DesktopActivity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading activities
    const sampleActivities: ActivityItem[] = [
      {
        id: '1',
        title: 'New Project Added',
        description: 'Check out my latest project: AI Development Assistant',
        timestamp: '2 hours ago',
        type: 'update'
      },
      {
        id: '2',
        title: 'Blog Post Published',
        description: 'Just published a new article about modern web development',
        timestamp: '1 day ago',
        type: 'blog'
      },
      {
        id: '3',
        title: 'Online Status',
        description: 'Currently available for freelance opportunities',
        timestamp: 'Just now',
        type: 'status'
      }
    ];
    
    setActivities(sampleActivities);
  }, []);

  if (!visible || activities.length === 0) return null;

  return (
    <div className="absolute bottom-24 left-4 w-80 z-50">
      <Card className="bg-card/80 backdrop-blur-lg border border-border p-4 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-foreground">Recent Activity</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => setVisible(false)}
            aria-label="Close activity panel"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="border-l-2 border-primary pl-3 py-1 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex justify-between">
                <h4 className="font-medium text-sm text-foreground">{activity.title}</h4>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-3 text-center">
          <Button variant="outline" size="sm" className="w-full">
            View All Activity
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DesktopActivity;