'use client';

import React, { useState, useRef } from 'react';
import { Save, FileText, FolderOpen, Copy, Scissors, Clipboard, Undo, Redo } from 'lucide-react';

const TextEditor = () => {
  const [content, setContent] = useState(`Welcome to Portfolio OS Text Editor!

This is a simple text editor application. You can use it to:
- Write notes and documentation
- Edit code snippets
- Keep track of ideas
- Create todo lists

Features:
- Basic text editing
- Cut, copy, paste functionality
- Undo/redo operations
- Save and open documents

Try typing something here to get started.`);
  const [fileName, setFileName] = useState('untitled.txt');
  const [isModified, setIsModified] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsModified(true);
  };

  const handleSave = () => {
    // In a real app, this would save to the file system
    setIsModified(false);
    alert(`File "${fileName}" saved successfully!`);
  };

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('copy');
    }
  };

  const handleCut = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand('cut');
      setIsModified(true);
    }
  };

  const handlePaste = () => {
    // Paste is handled natively by the textarea
    setIsModified(true);
  };

  const handleUndo = () => {
    // Basic undo simulation
    // In a real app, you'd implement a proper undo stack
    alert('Undo functionality would be implemented in a full version');
  };

  const handleRedo = () => {
    // Basic redo simulation
    alert('Redo functionality would be implemented in a full version');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-gray-100 dark:bg-gray-800">
        <button 
          onClick={handleSave}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <Save size={16} />
          Save
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button 
          onClick={handleCut}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <Scissors size={16} />
          Cut
        </button>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <Copy size={16} />
          Copy
        </button>
        <button 
          onClick={handlePaste}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <Clipboard size={16} />
          Paste
        </button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button 
          onClick={handleUndo}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <Undo size={16} />
          Undo
        </button>
        <button 
          onClick={handleRedo}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <Redo size={16} />
          Redo
        </button>
      </div>
      
      {/* File Info */}
      <div className="px-3 py-2 border-b flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-blue-500" />
          <span className="font-medium">{fileName}</span>
          {isModified && <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          {content.split(/\r\n|\r|\n/).length} lines
        </div>
      </div>
      
      {/* Editor Area */}
      <div className="flex-1 overflow-auto">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          className="w-full h-full p-4 bg-white dark:bg-gray-900 text-foreground resize-none focus:outline-none font-mono text-sm"
          spellCheck={false}
        />
      </div>
      
      {/* Status Bar */}
      <div className="px-3 py-1 text-xs border-t bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex justify-between">
        <div>UTF-8</div>
        <div>Plain Text</div>
      </div>
    </div>
  );
};

export default TextEditor;