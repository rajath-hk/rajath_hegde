'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindows } from '@/contexts/window-context';
import { X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const NotificationCenter = () => {
  const { windows } = useWindows();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Add some default notifications
  useEffect(() => {
    const defaultNotifications: Notification[] = [
      {
        id: '1',
        title: 'Welcome',
        message: 'Thanks for visiting my portfolio!',
        timestamp: new Date(),
        read: false,
        type: 'info'
      },
      {
        id: '2',
        title: 'New Feature',
        message: 'You can now drag and resize windows',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        type: 'info'
      }
    ];
    
    setNotifications(defaultNotifications);
  }, []);

  // Add a notification when a new window is opened
  useEffect(() => {
    if (windows.length > 0) {
      const latestWindow = windows[windows.length - 1];
      const existingNotification = notifications.find(
        n => n.title === 'Window Opened' && n.message.includes(latestWindow.title)
      );
      
      if (!existingNotification) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: 'Window Opened',
          message: `Opened "${latestWindow.title}" window`,
          timestamp: new Date(),
          read: false,
          type: 'info'
        };
        
        setNotifications(prev => [newNotification, ...prev]);
      }
    }
  }, [windows, notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md hover:bg-accent"
        aria-label="Open Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        )}
      </button>

      {/* Notification Center */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 bottom-full mb-2 w-80 bg-background/90 backdrop-blur-xl border rounded-lg shadow-xl z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="h-6 px-2 text-xs"
                  >
                    Mark all as read
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAll}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`border-b last:border-b-0 ${
                      !notification.read ? 'bg-accent/50' : ''
                    }`}
                  >
                    <div className="p-4 relative">
                      <button
                        onClick={() => clearNotification(notification.id)}
                        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${getTypeColor(notification.type)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between">
                            <h4 className="font-medium text-sm truncate">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                              {notification.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-6 px-2 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;