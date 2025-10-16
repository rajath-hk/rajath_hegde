'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [bootStep, setBootStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const bootSteps = [
    'Initializing system...',
    'Loading kernel...',
    'Mounting filesystems...',
    'Starting services...',
    'Loading user interface...',
    'Welcome to Portfolio OS'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Add a small delay before completing to show the final message
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + Math.random() * 10;
      });
      
      if (progress >= 20 * (bootStep + 1) && bootStep < bootSteps.length - 1) {
        setBootStep(prev => prev + 1);
      }
    }, 200);

    return () => clearInterval(timer);
  }, [bootStep, progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
      {/* Loading Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Branding */}
      <div className="text-center mb-8">
        <motion.h1 
          className="text-4xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          PORTFOLIO OS
        </motion.h1>
        <motion.p 
          className="text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Rajath Hegde Edition
        </motion.p>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
        <motion.div 
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Status Text */}
      <motion.div
        key={bootStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-gray-300 text-sm min-h-[20px]"
      >
        {bootSteps[bootStep]}
      </motion.div>
      
      {/* Loading Dots */}
      <div className="flex space-x-1 mt-8">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-gray-500 rounded-full"
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BootScreen;