'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Initializing system...');

  const bootMessages = [
    'Initializing system...',
    'Loading kernel...',
    'Mounting filesystems...',
    'Starting services...',
    'Loading user interface...',
    'Welcome to PortfolioOS'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 1;
        
        // Update message based on progress
        const messageIndex = Math.min(
          Math.floor((newProgress / 100) * bootMessages.length),
          bootMessages.length - 1
        );
        setCurrentMessage(bootMessages[messageIndex]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          // Complete the boot process after a short delay
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-600 to-gray-800 flex flex-col items-center justify-center z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white">RH</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">PortfolioOS</h1>
          <p className="text-gray-200">Professional Portfolio Operating System</p>
        </div>

        <div className="w-80 max-w-full mx-auto">
          <div className="flex justify-between text-sm text-gray-200 mb-2">
            <span>{currentMessage}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gray-500 to-gray-700"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="mt-8 text-xs text-gray-300">
          <p>© {new Date().getFullYear()} Rajath Hegde. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BootScreen;