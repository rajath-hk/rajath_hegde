'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Initialize with some sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        title: 'Welcome!',
        message: 'Thanks for checking out my portfolio. Feel free to explore!',
        type: 'info',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: false
      },
      {
        id: '2',
        title: 'New Feature',
        message: 'You can now drag icons and windows around the screen.',
        type: 'success',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        read: true
      },
      {
        id: '3',
        title: 'Tip',
        message: 'Right-click the desktop for more options.',
        type: 'info',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        read: true
      }
    ];
    
    setNotifications(sampleNotifications);
    setUnreadCount(sampleNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    setUnreadCount(notifications.filter(n => n.id !== id && !n.read).length);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    const removedNotification = notifications.find(n => n.id === id);
    if (removedNotification && !removedNotification.read) {
      setUnreadCount(unreadCount - 1);
    }
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 dark:bg-green-900/30';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/30';
      case 'error': return 'bg-red-50 dark:bg-red-900/30';
      default: return 'bg-blue-50 dark:bg-blue-900/30';
    }
  };

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-40">
      {/* Notification Bell */}
      <Button
        variant="outline"
        size="icon"
        className="rounded-full shadow-lg relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-80 bg-card border rounded-lg shadow-xl z-50"
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark all as read
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                aria-label="Close notifications"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b ${getBackgroundColor(notification.type)} ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-start gap-2">
                      {getIcon(notification.type)}
                      <div>
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.timestamp.toLocaleDateString()} {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeNotification(notification.id)}
                      aria-label="Dismiss notification"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {!notification.read && (
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="mt-2 p-0 h-auto"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationCenter;