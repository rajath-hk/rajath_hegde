'use client';

import React, { useState } from 'react';
import { Folder, File, FileText, Image, Film } from 'lucide-react';
import { fileSystem, type FileSystemEntry } from '@/lib/file-system';

const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState<FileSystemEntry[]>([fileSystem]);
  const [selectedItem, setSelectedItem] = useState<FileSystemEntry | null>(null);
  
  const currentFolder = currentPath[currentPath.length - 1];
  
  const handleFolderClick = (folder: FileSystemEntry) => {
    if (folder.type === 'folder') {
      setCurrentPath([...currentPath, folder]);
      setSelectedItem(null);
    }
  };
  
  const handleBackClick = () => {
    if (currentPath.length > 1) {
      const newPath = [...currentPath];
      newPath.pop();
      setCurrentPath(newPath);
      setSelectedItem(null);
    }
  };
  
  const handleItemClick = (item: FileSystemEntry) => {
    setSelectedItem(item);
  };
  
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString();
  };
  
  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const getFileIcon = (item: FileSystemEntry) => {
    if (item.type === 'folder') {
      return <Folder className="w-5 h-5 text-blue-500" />;
    }
    
    if (item.name.endsWith('.md') || item.name.endsWith('.txt')) {
      return <FileText className="w-5 h-5 text-gray-500" />;
    }
    
    if (item.name.endsWith('.png') || item.name.endsWith('.jpg') || item.name.endsWith('.jpeg')) {
      return <Image className="w-5 h-5 text-purple-500" />;
    }
    
    if (item.name.endsWith('.mp4') || item.name.endsWith('.mov')) {
      return <Film className="w-5 h-5 text-red-500" />;
    }
    
    return <File className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Breadcrumb Navigation */}
      <div className="p-3 border-b flex items-center gap-2 text-sm">
        <button 
          onClick={handleBackClick}
          disabled={currentPath.length <= 1}
          className="px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ← Back
        </button>
        <div className="flex items-center gap-1">
          {currentPath.map((folder, index) => (
            <div key={folder.id} className="flex items-center gap-1">
              {index > 0 && <span>/</span>}
              <button
                onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                className="hover:underline"
              >
                {folder.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Folder Tree */}
        <div className="w-1/4 border-r p-2 overflow-y-auto">
          <div className="font-semibold mb-2">Folders</div>
          <div className="space-y-1">
            {fileSystem.children?.filter(item => item.type === 'folder').map(folder => (
              <button
                key={folder.id}
                onClick={() => handleFolderClick(folder)}
                className={`flex items-center gap-2 w-full text-left p-2 rounded ${
                  currentFolder.id === folder.id 
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Folder className="w-4 h-4 text-blue-500" />
                <span>{folder.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* File List */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-[auto,1fr,120px,100px] gap-2 p-2 text-sm font-medium border-b">
              <div className="w-8"></div>
              <div>Name</div>
              <div className="text-right">Modified</div>
              <div className="text-right">Size</div>
            </div>
            
            <div className="divide-y">
              {currentFolder.children?.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  onDoubleClick={() => item.type === 'folder' && handleFolderClick(item)}
                  className={`grid grid-cols-[auto,1fr,120px,100px] gap-2 p-2 text-sm cursor-pointer ${
                    selectedItem?.id === item.id 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {getFileIcon(item)}
                  </div>
                  <div className="flex items-center">
                    {item.name}
                  </div>
                  <div className="flex items-center justify-end text-gray-500 dark:text-gray-400">
                    {formatDate(item.modified)}
                  </div>
                  <div className="flex items-center justify-end text-gray-500 dark:text-gray-400">
                    {item.type === 'file' ? formatSize(item.size) : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Preview Panel */}
          {selectedItem && (
            <div className="h-1/3 border-t p-4 overflow-auto">
              <div className="font-semibold mb-2">{selectedItem.name}</div>
              {selectedItem.type === 'file' && selectedItem.content ? (
                <div className="whitespace-pre-wrap">
                  {selectedItem.content}
                </div>
              ) : selectedItem.type === 'file' ? (
                <div className="text-gray-500 italic">
                  This file cannot be previewed. {selectedItem.name.endsWith('.pdf') && 'Open with PDF viewer.'}
                </div>
              ) : (
                <div className="text-gray-500 italic">
                  Double-click to open folder
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;