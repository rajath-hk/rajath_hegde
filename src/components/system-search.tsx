'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWindows } from '@/contexts/window-context';
import { Search, File, Folder, Terminal, Settings } from 'lucide-react';
import { fileSystem, findEntryById } from '@/lib/file-system';

interface SearchResult {
  id: string;
  title: string;
  type: 'app' | 'file' | 'folder';
  icon: React.ReactNode;
  path: string;
  content?: string;
  relevance?: number;
}

interface SystemSearchProps {
  open?: boolean;
  onClose?: () => void;
}

const SystemSearch = ({ open, onClose }: SystemSearchProps) => {
  const { desktopIcons, openWindow } = useWindows();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          setIsOpen(true);
        }
      
        if (e.key === 'Escape' && isOpen) {
          setIsOpen(false);
          setQuery('');
          if (onClose) onClose();
        }
    };

    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Sync with controlled `open` prop when provided
  useEffect(() => {
    if (typeof open === 'boolean') setIsOpen(open);
  }, [open]);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Perform search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search applications with relevance scoring
    desktopIcons.forEach(app => {
      const titleLower = app.title.toLowerCase();
      if (titleLower.includes(searchTerm)) {
        // Calculate relevance score: exact match = highest, starts with = high, contains = lower
        let relevance = 0;
        if (titleLower === searchTerm) {
          relevance = 100; // Exact match
        } else if (titleLower.startsWith(searchTerm)) {
          relevance = 50; // Starts with
        } else {
          relevance = 10; // Contains
        }
        
        searchResults.push({
          id: app.id,
          title: app.title,
          type: 'app',
          icon: <app.icon className="w-4 h-4" />,
          path: 'Applications',
          relevance // Add relevance for sorting
        });
      }
    });

    // Search files and folders in virtual file system
    const searchFileSystem = (entry: typeof fileSystem, path: string = '') => {
      if (entry.name.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: entry.id,
          title: entry.name,
          type: entry.type,
          icon: entry.type === 'file' ? <File className="w-4 h-4" /> : <Folder className="w-4 h-4" />,
          path: path || 'Home'
        });
      }

      if (entry.children) {
        entry.children.forEach(child => {
          searchFileSystem(child, path ? `${path} > ${entry.name}` : entry.name);
        });
      }
    };

    searchFileSystem(fileSystem);

    // Sort by relevance (highest first), then by title
    searchResults.sort((a, b) => {
      const aRelevance = a.relevance || 0;
      const bRelevance = b.relevance || 0;
      if (aRelevance !== bRelevance) {
        return bRelevance - aRelevance; // Higher relevance first
      }
      return a.title.localeCompare(b.title); // Alphabetical if same relevance
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
  }, [query, desktopIcons]);

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'app') {
      const app = desktopIcons.find(a => a.id === result.id);
      if (app) {
        openWindow(app);
      }
    } else {
      // For files/folders, we would typically open the file explorer
      const explorerApp = desktopIcons.find(a => a.id === 'explorer');
      if (explorerApp) {
        openWindow(explorerApp);
      }
    }
    
    setIsOpen(false);
    setQuery('');
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl bg-background/90 backdrop-blur-xl rounded-lg shadow-xl overflow-hidden">
        {/* Search Input */}
        <div className="relative p-4 border-b">
          <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps, files, and more..."
            className="w-full bg-muted pl-12 pr-4 py-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button 
            onClick={() => { setIsOpen(false); if (onClose) onClose(); }}
            className="absolute right-7 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent transition-colors"
              >
                <div className="flex-shrink-0">
                  {result.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{result.title}</div>
                  <div className="text-sm text-muted-foreground truncate">{result.path}</div>
                </div>
                <div className="text-xs text-muted-foreground capitalize">{result.type}</div>
              </button>
            ))
          ) : query ? (
            <div className="p-8 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-8">
              <div className="text-center mb-4">
                <Search className="h-12 w-12 mx-auto text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-center mb-2">Search Portfolio OS</h3>
              <p className="text-muted-foreground text-center">
                Find apps, files, folders, and more
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <Folder className="h-6 w-6 mb-2" />
                  <span className="text-sm">Files</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <Terminal className="h-6 w-6 mb-2" />
                  <span className="text-sm">Terminal</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                  <Settings className="h-6 w-6 mb-2" />
                  <span className="text-sm">Settings</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {query && (
          <div className="p-3 border-t text-xs text-muted-foreground flex justify-between">
            <div>Press Enter to open</div>
            <div>Press ESC to close</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemSearch;