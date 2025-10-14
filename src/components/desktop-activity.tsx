'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-20 left-4 w-80 z-30"
    >
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
              <div className="flex-shrink-0 mt-1">
                {activity.type === 'update' && (
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                )}
                {activity.type === 'blog' && (
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                )}
                {activity.type === 'status' && (
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                )}
                {activity.type === 'achievement' && (
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                )}
              </div>
              <div>
                <h4 className="font-medium text-sm">{activity.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4 text-xs">
          View All Activity
        </Button>
      </Card>
    </motion.div>
  );
};

export default DesktopActivity;