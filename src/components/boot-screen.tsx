'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Initializing system...');
  const [showLogin, setShowLogin] = useState(false);

  const bootMessages = [
    'Initializing system...',
    'Loading kernel...',
    'Mounting filesystems...',
    'Loading services...',
    'Loading user profile...',
    'Preparing desktop environment...',
    'Welcome to PortfolioOS',
    'Starting up...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10) + 5;
        
        // Update message based on progress
        const messageIndex = Math.floor((newProgress / 100) * bootMessages.length);
        if (messageIndex < bootMessages.length && bootMessages[messageIndex]) {
          setCurrentMessage(bootMessages[messageIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowLogin(true), 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    onComplete();
  };

  if (showLogin) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-8">PortfolioOS</h1>
            <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md w-[90%] md:w-full mx-auto shadow-xl">
            <div className="mb-6">
              <div
                className="w-16 h-16 rounded-full bg-blue-500 mx-auto mb-4 flex items-center justify-center"
                role="img"
                aria-label={`User avatar for ${'Rajath Hegde'}`}
                title={`User avatar for ${'Rajath Hegde'}`}
              >
                <User className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h2 className="text-xl text-white">Rajath Hegde</h2>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-400 text-sm mb-2 text-center">Enter any password or click Guest</p>
              <input
                type="password"
                placeholder="Password (any value)"
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow placeholder:text-gray-500"
                defaultValue=""
                  aria-label="Password input"
              />
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-lg transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Login
              </button>
              <button 
                onClick={handleLogin}
                  className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white px-6 py-3 rounded-lg transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Guest
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <div className="w-24 h-24 rounded-full bg-blue-500 mx-auto mb-6 flex items-center justify-center overflow-hidden">
          <img 
            src="/api/placeholder/96/96" 
            alt="PortfolioOS Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-5xl font-bold mb-2">PortfolioOS</h1>
        <p className="text-gray-400">Version 1.0.0</p>
      </motion.div>

      <div className="w-96 max-w-full px-4">
        <div className="h-2 bg-gray-800 rounded-full mb-2 overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-center text-gray-400">{currentMessage}</p>
      </div>

      <div className="absolute bottom-8 w-full text-center">
        <p className="text-gray-600 text-sm">
          Press Ctrl+Alt+Del to restart • RHOS © 2026 Rajath Hegde
        </p>
      </div>
    </div>
  );
};

export default BootScreen;