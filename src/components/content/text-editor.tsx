'use client';

import React, { useState, useRef } from 'react';
import { Save, FileText, FolderOpen, Plus, Trash2, Download } from 'lucide-react';

const TextEditor = () => {
  const [content, setContent] = useState('# Welcome to Text Editor\n\nThis is a simple text editor application.\n\n## Features:\n- Create new documents\n- Edit text\n- Save documents\n- Open existing files\n\nTry editing this text!');
  const [fileName, setFileName] = useState('document.md');
  const [isEditingFileName, setIsEditingFileName] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    // In a real implementation, this would save to the file system
    alert(`Document "${fileName}" saved successfully!\n\nContent:\n${content}`);
  };

  const handleNewDocument = () => {
    if (confirm('Are you sure you want to create a new document? Unsaved changes will be lost.')) {
      setContent('# New Document\n\nStart writing here...');
      setFileName('new-document.md');
    }
  };

  const handleOpen = () => {
    // In a real implementation, this would open a file dialog
    alert('In a full implementation, this would open a file dialog to select a document.');
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleFileNameBlur = () => {
    setIsEditingFileName(false);
    if (!fileName.trim()) {
      setFileName('untitled.md');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b bg-gray-100 dark:bg-gray-800">
        <button 
          onClick={handleNewDocument}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <Plus size={16} />
          New
        </button>
        <button 
          onClick={handleOpen}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <FolderOpen size={16} />
          Open
        </button>
        <button 
          onClick={handleSave}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <Save size={16} />
          Save
        </button>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
        >
          <Download size={16} />
          Download
        </button>
      </div>
      
      {/* File Name Bar */}
      <div className="flex items-center gap-2 p-2 border-b">
        {isEditingFileName ? (
          <input
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            onBlur={handleFileNameBlur}
            onKeyDown={(e) => e.key === 'Enter' && handleFileNameBlur()}
            className="px-2 py-1 border rounded w-full"
            autoFocus
          />
        ) : (
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded w-full"
            onClick={() => setIsEditingFileName(true)}
          >
            <FileText size={16} className="text-blue-500" />
            <span className="truncate">{fileName}</span>
          </div>
        )}
      </div>
      
      {/* Editor Area */}
      <div className="flex-1 overflow-auto">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-gray-900 resize-none focus:outline-none"
          spellCheck={false}
        />
      </div>
      
      {/* Status Bar */}
      <div className="px-3 py-1 text-xs border-t bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex justify-between">
        <div>Text Editor</div>
        <div>
          {textareaRef.current ? `${textareaRef.current.value.length} characters` : '0 characters'}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;