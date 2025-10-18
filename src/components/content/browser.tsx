'use client';

import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home,
  Star,
  Bookmark,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Browser = () => {
  const [url, setUrl] = useState('https://github.com/rajath-hk');
  const [bookmarks, setBookmarks] = useState([
    { id: 1, name: 'GitHub', url: 'https://github.com/rajath-hk' },
    { id: 2, name: 'LinkedIn', url: 'https://linkedin.com/in/rajath-hegde' },
    { id: 3, name: 'Portfolio', url: 'https://rajath.github.io/rajath_hegde' },
  ]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (newUrl: string) => {
    if (!newUrl.startsWith('http')) {
      newUrl = 'https://' + newUrl;
    }
    setUrl(newUrl);
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleHome = () => {
    setUrl('https://github.com/rajath-hk');
  };

  const addBookmark = () => {
    const newBookmark = {
      id: bookmarks.length + 1,
      name: url.replace('https://', '').replace('http://', '').split('/')[0],
      url: url
    };
    setBookmarks([...bookmarks, newBookmark]);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Browser Toolbar */}
      <div className="border-b bg-muted/30 p-2 flex items-center gap-2">
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => iframeRef.current?.contentWindow?.history.back()}
            disabled={!url}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => iframeRef.current?.contentWindow?.history.forward()}
            disabled={!url}
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
          >
            <RotateCw className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleHome}
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 flex items-center">
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigate(url)}
            className="w-full"
            placeholder="Enter URL"
          />
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={addBookmark}
          >
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowBookmarks(!showBookmarks)}
          >
            {showBookmarks ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      
      {/* Bookmarks Bar */}
      {showBookmarks && (
        <div className="border-b p-2 flex items-center gap-2 bg-muted/20">
          <Star className="w-4 h-4 text-yellow-500" />
          <div className="flex gap-2 overflow-x-auto">
            {bookmarks.map((bookmark) => (
              <Button
                key={bookmark.id}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigate(bookmark.url)}
                className="whitespace-nowrap"
              >
                {bookmark.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Browser Content */}
      <div className="flex-1 relative">
        {url ? (
          <iframe
            ref={iframeRef}
            src={url}
            className="w-full h-full"
            title="Browser"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Welcome to Portfolio Browser</h3>
              <p className="text-muted-foreground">
                Enter a URL in the address bar to start browsing
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browser;