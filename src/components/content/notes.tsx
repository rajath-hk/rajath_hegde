'use client';

import React, { useState } from 'react';
import { Search, Plus, Edit3, Tag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Project Ideas',
    content: '1. Portfolio website redesign\n2. Mobile app for task management\n3. AI-powered note taking app',
    tags: ['ideas', 'projects'],
    createdAt: new Date(2024, 5, 15),
    updatedAt: new Date(2024, 5, 20)
  },
  {
    id: '2',
    title: 'Learning Goals',
    content: '- Master React and Next.js\n- Learn TypeScript in depth\n- Understand system design principles',
    tags: ['learning', 'goals'],
    createdAt: new Date(2024, 5, 10),
    updatedAt: new Date(2024, 5, 18)
  }
];

const NotesContent = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');

  const filteredNotes = notes.filter(note => {
    // Ensure note properties exist before accessing them
    const title = note.title || '';
    const content = note.content || '';
    const tags = Array.isArray(note.tags) ? note.tags : [];
    
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tags.some((tag: string) => (tag || '').toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const formatDate = (date?: Date) => {
    if (!date) return 'Unknown date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: newTitle || 'Untitled Note',
      content: newContent || '',
      tags: newTags ? newTags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
  };

  const updateNote = () => {
    if (!currentNote) return;
    
    const updatedNotes = notes.map(note => {
      if (note.id === currentNote.id) {
        return {
          ...note,
          title: newTitle || note.title,
          content: newContent || note.content,
          tags: newTags ? newTags.split(',').map(tag => tag.trim()).filter(tag => tag) : note.tags,
          updatedAt: new Date()
        };
      }
      return note;
    });
    
    setNotes(updatedNotes);
    setCurrentNote({
      ...currentNote,
      title: newTitle || currentNote.title,
      content: newContent || currentNote.content,
      tags: newTags ? newTags.split(',').map(tag => tag.trim()).filter(tag => tag) : currentNote.tags,
      updatedAt: new Date()
    });
    setNewTitle('');
    setNewContent('');
    setNewTags('');
  };

  const selectNote = (note: Note) => {
    setCurrentNote(note);
    setNewTitle(note.title || '');
    setNewContent(note.content || '');
    setNewTags(Array.isArray(note.tags) ? note.tags.join(', ') : '');
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    
    if (currentNote && currentNote.id === id) {
      setCurrentNote(null);
      setNewTitle('');
      setNewContent('');
      setNewTags('');
    }
  };

  return (
    <div className="flex h-full bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search notes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className={`p-4 border-b cursor-pointer hover:bg-accent ${
                currentNote?.id === note.id ? 'bg-accent' : ''
              }`}
              onClick={() => selectNote(note)}
            >
              <h3 className="font-semibold truncate">{note.title || 'Untitled Note'}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {note.content ? note.content.substring(0, 60) + (note.content.length > 60 ? '...' : '') : 'No content'}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(note.updatedAt)}
                </div>
                {Array.isArray(note.tags) && note.tags.length > 0 && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Tag className="w-3 h-3 mr-1" />
                    {note.tags.length}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t">
          <Button 
            className="w-full" 
            onClick={createNote}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>
      
      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {currentNote ? (
          <>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <Input
                  type="text"
                  placeholder="Note title"
                  className="text-xl font-bold border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <Button onClick={updateNote}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
              
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Created {formatDate(currentNote.createdAt)}</span>
                <span className="mx-2">•</span>
                <span>Updated {formatDate(currentNote.updatedAt)}</span>
              </div>
              
              <div className="mt-2">
                <Input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </div>
              
              {Array.isArray(currentNote.tags) && currentNote.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {currentNote.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                className="w-full h-full resize-none border-none focus:outline-none focus:ring-0 p-0"
                placeholder="Start writing your note here..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Edit3 className="w-12 h-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No note selected</h3>
              <p className="mt-2 text-muted-foreground">
                Select a note from the sidebar or create a new one
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesContent;