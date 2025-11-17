'use client';

import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  Code, 
  Image, 
  Video, 
  Music, 
  Archive,
  ChevronRight,
  ChevronDown,
  HardDrive,
  User,
  Briefcase,
  Award,
  Mail,
  Settings,
  Terminal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const FileExplorer = () => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'desktop': true,
    'documents': true,
    'projects': true,
  });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; item: any } | null>(null);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleContextMenu = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  };

  const handleCreateFolder = () => {
    // Implementation for creating new folder
    console.log('Create new folder');
    setContextMenu(null);
  };

  const handleRename = () => {
    // Implementation for renaming
    console.log('Rename item');
    setContextMenu(null);
  };

  const handleDelete = () => {
    // Implementation for deleting
    console.log('Delete item');
    setContextMenu(null);
  };

  const handleOpen = () => {
    // Implementation for opening file/folder
    console.log('Open item:', contextMenu?.item);
    setContextMenu(null);
  };

  const handleProperties = () => {
    // Implementation for showing properties
    console.log('Show properties for:', contextMenu?.item);
    setContextMenu(null);
  };

  // File structure
  const fileStructure = [
    {
      id: 'desktop',
      name: 'Desktop',
      icon: <HardDrive className="w-4 h-4" />,
      type: 'folder',
      children: [
        { id: 'about-shortcut', name: 'About Me.lnk', icon: <User className="w-4 h-4" />, type: 'shortcut' },
        { id: 'projects-shortcut', name: 'Projects.lnk', icon: <Briefcase className="w-4 h-4" />, type: 'shortcut' },
      ]
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: <Folder className="w-4 h-4" />,
      type: 'folder',
      children: [
        { id: 'resume', name: 'Resume.pdf', icon: <FileText className="w-4 h-4" />, type: 'file' },
        { id: 'cover-letter', name: 'Cover Letter.docx', icon: <FileText className="w-4 h-4" />, type: 'file' },
        { id: 'certificates', name: 'Certificates', icon: <Award className="w-4 h-4" />, type: 'folder', children: [
          { id: 'aws-cert', name: 'AWS_Certification.pdf', icon: <FileText className="w-4 h-4" />, type: 'file' },
          { id: 'ml-cert', name: 'ML_Course.pdf', icon: <FileText className="w-4 h-4" />, type: 'file' },
        ]},
      ]
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <Briefcase className="w-4 h-4" />,
      type: 'folder',
      children: [
        { 
          id: 'rtsp-recorder', 
          name: 'RTSP Loop Recorder', 
          icon: <Folder className="w-4 h-4" />, 
          type: 'folder',
          children: [
            { id: 'rtsp-readme', name: 'README.md', icon: <FileText className="w-4 h-4" />, type: 'file' },
            { id: 'rtsp-src', name: 'src', icon: <Code className="w-4 h-4" />, type: 'folder' },
            { id: 'rtsp-demo', name: 'demo.mp4', icon: <Video className="w-4 h-4" />, type: 'file' },
          ]
        },
        { 
          id: 'self-hosted', 
          name: 'Self-Hosted Platform', 
          icon: <Folder className="w-4 h-4" />, 
          type: 'folder',
          children: [
            { id: 'self-readme', name: 'README.md', icon: <FileText className="w-4 h-4" />, type: 'file' },
            { id: 'self-docker', name: 'docker-compose.yml', icon: <FileText className="w-4 h-4" />, type: 'file' },
            { id: 'self-config', name: 'config.json', icon: <FileText className="w-4 h-4" />, type: 'file' },
          ]
        },
        { 
          id: 'getgo-app', 
          name: 'GetGo Web App', 
          icon: <Folder className="w-4 h-4" />, 
          type: 'folder',
          children: [
            { id: 'getgo-readme', name: 'README.md', icon: <FileText className="w-4 h-4" />, type: 'file' },
            { id: 'getgo-src', name: 'src', icon: <Code className="w-4 h-4" />, type: 'folder' },
          ]
        },
      ]
    },
    {
      id: 'downloads',
      name: 'Downloads',
      icon: <Folder className="w-4 h-4" />,
      type: 'folder',
      children: [
        { id: 'portfolio-zip', name: 'portfolio.zip', icon: <Archive className="w-4 h-4" />, type: 'file' },
      ]
    },
    {
      id: 'applications',
      name: 'Applications',
      icon: <Folder className="w-4 h-4" />,
      type: 'folder',
      children: [
        { id: 'terminal-app', name: 'Terminal.exe', icon: <Terminal className="w-4 h-4" />, type: 'file' },
        { id: 'settings-app', name: 'Settings.exe', icon: <Settings className="w-4 h-4" />, type: 'file' },
        { id: 'contact-app', name: 'Contact.exe', icon: <Mail className="w-4 h-4" />, type: 'file' },
      ]
    },
  ];

  const getFileIcon = (file: any) => {
    if (file.type === 'folder') {
      return expandedFolders[file.id] ? 
        <ChevronDown className="w-4 h-4" /> : 
        <ChevronRight className="w-4 h-4" />;
    }
    return file.icon;
  };

  const renderFileTree = (items: any[], level = 0) => {
    return (
      <div className={`ml-${level * 4}`}>
        {items.map((item) => (
          <div key={item.id}>
            <div
              className={`flex items-center py-1 px-2 hover:bg-accent rounded cursor-pointer ${
                selectedItem === item.id ? 'bg-accent' : ''
              }`}
              onClick={() => {
                setSelectedItem(item.id);
                if (item.type === 'folder') {
                  toggleFolder(item.id);
                }
              }}
              onContextMenu={(e) => handleContextMenu(e, item)}
            >
              <span className="mr-2">
                {getFileIcon(item)}
              </span>
              <span className="mr-2">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </div>
            
            {item.type === 'folder' && expandedFolders[item.id] && item.children && (
              <div className="ml-4">
                {renderFileTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="border-b p-2 flex items-center">
        <h2 className="text-lg font-semibold">File Explorer</h2>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-background border rounded shadow-lg py-1 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={() => setContextMenu(null)}
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-3"
            onClick={handleOpen}
          >
            Open
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-3"
            onClick={handleCreateFolder}
          >
            New Folder
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-3"
            onClick={handleRename}
          >
            Rename
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-3"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <div className="border-t my-1"></div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start px-3"
            onClick={handleProperties}
          >
            Properties
          </Button>
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Quick Access */}
        <div className="w-48 border-r bg-muted/30">
          <div className="p-2">
            <h3 className="text-sm font-medium mb-2 px-2">Quick Access</h3>
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                About Me
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Briefcase className="w-4 h-4 mr-2" />
                Projects
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Award className="w-4 h-4 mr-2" />
                Skills
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex">
          {/* File Tree */}
          <div className="w-64 border-r">
            <ScrollArea className="h-full">
              <div className="p-2">
                {renderFileTree(fileStructure)}
              </div>
            </ScrollArea>
          </div>
          
          {/* File Preview */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-medium">Portfolio Files</h3>
              <p className="text-sm text-muted-foreground">Browse through my projects and documents</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Folder className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a file or folder</h3>
                <p className="text-muted-foreground">
                  Choose an item from the file tree to view its contents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;