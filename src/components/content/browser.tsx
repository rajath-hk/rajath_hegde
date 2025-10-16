'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, ExternalLink } from 'lucide-react';

const Browser = () => {
  const [url, setUrl] = useState('https://github.com/rajath-hk');
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (newUrl: string) => {
    setUrl(newUrl);
  };

  const handleBack = () => {
    if (iframeRef.current && canGoBack) {
      iframeRef.current.contentWindow?.history.back();
    }
  };

  const handleForward = () => {
    if (iframeRef.current && canGoForward) {
      iframeRef.current.contentWindow?.history.forward();
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.location.reload();
    }
  };

  const handleHome = () => {
    handleNavigate('https://github.com/rajath-hk');
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let newUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        newUrl = 'https://' + url;
      }
      handleNavigate(newUrl);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b bg-gray-100 dark:bg-gray-800">
        <div className="flex gap-1">
          <button 
            onClick={handleBack}
            disabled={!canGoBack}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go back"
          >
            <ArrowLeft size={16} />
          </button>
          <button 
            onClick={handleForward}
            disabled={!canGoForward}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go forward"
          >
            <ArrowRight size={16} />
          </button>
          <button 
            onClick={handleRefresh}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Refresh"
          >
            <RotateCw size={16} />
          </button>
          <button 
            onClick={handleHome}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Home"
          >
            <Home size={16} />
          </button>
        </div>
        
        <div className="flex-1 flex">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-1 text-sm rounded-l border bg-white dark:bg-gray-900"
            placeholder="Enter URL"
          />
          <button 
            onClick={() => window.open(url, '_blank')}
            className="px-3 py-1 text-sm bg-white dark:bg-gray-900 border-y border-r rounded-r hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open in new tab"
          >
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
      
      {/* Browser Content */}
      <div className="flex-1 bg-white dark:bg-gray-900">
        <div className="w-full h-full flex items-center justify-center">
          {/* Placeholder for iframe */}
          <div className="text-center p-8">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ExternalLink className="text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-1">Browser</h3>
            <p className="text-gray-500 text-sm">
              Web content would be displayed here in an iframe
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Current URL: {url}
            </p>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="px-3 py-1 text-xs border-t bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        <div className="flex justify-between">
          <span>Ready</span>
          <span>Portfolio Browser</span>
        </div>
      </div>
    </div>
  );
};

export default Browser;