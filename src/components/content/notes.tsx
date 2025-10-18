'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Save, 
  Trash2,
  Edit3,
  Search,
  Calendar,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Notes = () => {
  const [notes, setNotes] = useState<any[]>([
    {
      id: 1,
      title: 'Welcome to Portfolio Notes',
      content: 'This is your personal note-taking application. You can create, edit, and organize your notes here.\n\nFeatures:\n- Create new notes\n- Edit existing notes\n- Delete notes\n- Search through your notes',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      tags: ['welcome', 'portfolio']
    },
    {
      id: 2,
      title: 'Project Ideas',
      content: '1. AI-powered task manager\n2. Real-time collaboration tool\n3. Personal finance tracker\n4. Health and fitness dashboard\n5. Learning progress tracker',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
      tags: ['projects', 'ideas']
    }
  ]);
  
  const [currentNote, setCurrentNote] = useState(notes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTitle, setNewTitle] = useState(currentNote?.title || '');
  const [newContent, setNewContent] = useState(currentNote?.content || '');

  useEffect(() => {
    if (currentNote) {
      setNewTitle(currentNote.title);
      setNewContent(currentNote.content);
    }
  }, [currentNote]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    };
    
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setIsEditing(true);
  };

  const saveNote = () => {
    if (currentNote) {
      const updatedNotes = notes.map(note => 
        note.id === currentNote.id 
          ? { ...note, title: newTitle, content: newContent, updatedAt: new Date() } 
          : note
      );
      
      setNotes(updatedNotes);
      setCurrentNote({ ...currentNote, title: newTitle, content: newContent, updatedAt: new Date() });
      setIsEditing(false);
    }
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    
    if (currentNote?.id === id) {
      setCurrentNote(updatedNotes[0] || null);
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Notes</h2>
        <Button onClick={createNewNote} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`p-3 border-b cursor-pointer hover:bg-accent ${
                  currentNote?.id === note.id ? 'bg-accent' : ''
                }`}
                onClick={() => {
                  setCurrentNote(note);
                  setIsEditing(false);
                }}
              >
                <div className="font-medium truncate">{note.title}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {note.content.substring(0, 60)}{note.content.length > 60 ? '...' : ''}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-muted-foreground">
                    {formatDate(note.updatedAt)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Note Editor */}
        <div className="flex-1 flex flex-col">
          {currentNote ? (
            <>
              <div className="border-b p-4 flex items-center justify-between">
                {isEditing ? (
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="text-xl font-bold"
                  />
                ) : (
                  <h3 className="text-xl font-bold">{currentNote.title}</h3>
                )}
                
                <div className="flex space-x-2">
                  {isEditing ? (
                    <Button onClick={saveNote} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setIsEditing(true)} 
                      size="sm"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="p-4 border-b flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Last updated: {formatDate(currentNote.updatedAt)}</span>
                {currentNote.tags.length > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <Tag className="w-4 h-4 mr-1" />
                    <span>{currentNote.tags.join(', ')}</span>
                  </>
                )}
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                {isEditing ? (
                  <Textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="min-h-full resize-none"
                  />
                ) : (
                  <div className="whitespace-pre-wrap">
                    {currentNote.content || (
                      <div className="text-muted-foreground italic">
                        This note is empty. Click "Edit" to add content.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <FileText className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No notes selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a note from the sidebar or create a new one
              </p>
              <Button onClick={createNewNote}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Note
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;