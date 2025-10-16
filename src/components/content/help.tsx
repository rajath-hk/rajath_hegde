'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Help = () => {
  const shortcuts = [
    { keys: 'Ctrl/Cmd + Alt + T', description: 'Open Terminal' },
    { keys: 'Ctrl/Cmd + Alt + F', description: 'Open File Explorer' },
    { keys: 'Ctrl/Cmd + Alt + B', description: 'Open Web Browser' },
    { keys: 'Ctrl/Cmd + Alt + S', description: 'Open Settings' },
    { keys: 'Alt + Tab', description: 'Switch between windows' },
    { keys: 'Ctrl/Cmd + W', description: 'Close focused window' },
    { keys: 'Escape', description: 'Minimize focused window' },
    { keys: 'Ctrl/Cmd + K', description: 'Open system search' },
  ];

  const features = [
    { name: 'Window Management', description: 'Drag, resize, minimize, maximize and close windows' },
    { name: 'Taskbar', description: 'Shows running applications and system information' },
    { name: 'Start Menu', description: 'Access all applications and search functionality' },
    { name: 'File System', description: 'Browse projects and files in a virtual file system' },
    { name: 'Multiple Applications', description: 'Terminal, Text Editor, Media Player, Calculator, and more' },
    { name: 'System Search', description: 'Search across applications and files with Ctrl/Cmd + K' },
    { name: 'Keyboard Shortcuts', description: 'Efficient navigation with keyboard shortcuts' },
    { name: 'Themes', description: 'Light and dark mode support' },
  ];

  return (
    <div className="h-full overflow-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Portfolio OS Help</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-2 h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">{feature.name}:</span> {feature.description}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Keyboard Shortcuts */}
        <Card>
          <CardHeader>
            <CardTitle>Keyboard Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <span className="font-mono bg-muted px-2 py-1 rounded text-sm">
                    {shortcut.keys}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {shortcut.description}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Getting Started */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>
              Welcome to Portfolio OS! This interactive portfolio simulates a complete operating system experience 
              within a web browser. Here's how to get started:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 mt-3">
              <li>
                <strong>Explore Applications:</strong> Click on desktop icons or use the Start Menu to open applications
              </li>
              <li>
                <strong>Window Management:</strong> Drag windows by their title bar, resize by dragging corners, 
                minimize/maximize/close using the buttons in the top-right corner
              </li>
              <li>
                <strong>Use Keyboard Shortcuts:</strong> Speed up your workflow with keyboard shortcuts (see table above)
              </li>
              <li>
                <strong>Search:</strong> Press Ctrl/Cmd + K to open the system search and quickly find applications or files
              </li>
              <li>
                <strong>Customize:</strong> Use the Settings app to change themes and other preferences
              </li>
            </ol>
            
            <p className="mt-4">
              This portfolio showcases Rajath Hegde's skills and projects in a unique and engaging way. 
              Feel free to explore all the applications and features!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;