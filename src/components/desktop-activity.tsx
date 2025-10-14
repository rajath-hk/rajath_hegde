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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        title: 'Blog Update',
        description: 'Published a new article on modern web development practices',
        timestamp: '1 day ago',
        type: 'blog'
      },
      {
        id: '3',
        title: 'Online',
        description: 'Currently available for new opportunities',
        timestamp: 'Just now',
        type: 'status'
      },
      {
        id: '4',
        title: 'Achievement Unlocked',
        description: 'Completed 100+ open source contributions this year',
        timestamp: '3 days ago',
        type: 'achievement'
      }
    ];
    
    setActivities(sampleActivities);
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  if (!visible) return null;

  return (
    <div className="absolute top-20 left-4 w-80 z-30">
      <Card className="p-4 bg-card/80 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Recent Activity</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setVisible(false)}
            aria-label="Close activity panel"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 p-2 rounded-lg hover:bg-accent">
              <div className="flex-shrink-0">
                {activity.type === 'update' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">U</span>
                  </div>
                )}
                {activity.type === 'blog' && (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">B</span>
                  </div>
                )}
                {activity.type === 'status' && (
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">S</span>
                  </div>
                )}
                {activity.type === 'achievement' && (
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">A</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{activity.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-3 text-xs">
          View All Activity
        </Button>
      </Card>
    </div>
  );
};

export default DesktopActivity;