'use client';

import React, { useState } from 'react';
import { Plus, Search, Pin, Trash2, Edit3 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome to Notes',
      content: 'This is your first note. You can edit or delete it, or create new notes using the + button.',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: true
    },
    {
      id: '2',
      title: 'Project Ideas',
      content: 'Here are some project ideas:\n\n1. Portfolio OS (in progress)\n2. AI Assistant\n3. Self-hosted video platform\n4. RTSP Loop Recorder',
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
      isPinned: true
    }
  ]);
  
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false
    };
    
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
  };

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const handleEditNote = () => {
    if (selectedNote) {
      setIsEditing(true);
      setEditTitle(selectedNote.title);
      setEditContent(selectedNote.content);
    }
  };

  const handleSaveNote = () => {
    if (selectedNote) {
      setNotes(notes.map(note => 
        note.id === selectedNote.id 
          ? { 
              ...note, 
              title: editTitle, 
              content: editContent,
              updatedAt: new Date()
            } 
          : note
      ));
      
      setSelectedNote({
        ...selectedNote,
        title: editTitle,
        content: editContent,
        updatedAt: new Date()
      });
      
      setIsEditing(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(notes.length > 1 ? notes[0] : null);
    }
  };

  const handlePinNote = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-1/3 border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Notes</h2>
            <button 
              onClick={handleCreateNote}
              className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="New note"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {pinnedNotes.length > 0 && (
            <div className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Pinned
            </div>
          )}
          {pinnedNotes.map(note => (
            <div 
              key={note.id}
              onClick={() => handleSelectNote(note)}
              className={`p-3 border-b cursor-pointer ${
                selectedNote?.id === note.id 
                  ? 'bg-primary/10' 
                  : 'hover:bg-muted'
              }`}
            >
              <div className="flex justify-between">
                <h3 className="font-medium truncate">{note.title}</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePinNote(note.id);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Pin size={14} className={note.isPinned ? 'fill-current' : ''} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground truncate mt-1">
                {note.content.substring(0, 100)}
                {note.content.length > 100 ? '...' : ''}
              </p>
              <div className="text-xs text-muted-foreground mt-2">
                {formatDate(note.updatedAt)}
              </div>
            </div>
          ))}
          
          {unpinnedNotes.length > 0 && (
            <div className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Others
            </div>
          )}
          {unpinnedNotes.map(note => (
            <div 
              key={note.id}
              onClick={() => handleSelectNote(note)}
              className={`p-3 border-b cursor-pointer ${
                selectedNote?.id === note.id 
                  ? 'bg-primary/10' 
                  : 'hover:bg-muted'
              }`}
            >
              <div className="flex justify-between">
                <h3 className="font-medium truncate">{note.title}</h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePinNote(note.id);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Pin size={14} className={note.isPinned ? 'fill-current' : ''} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground truncate mt-1">
                {note.content.substring(0, 100)}
                {note.content.length > 100 ? '...' : ''}
              </p>
              <div className="text-xs text-muted-foreground mt-2">
                {formatDate(note.updatedAt)}
              </div>
            </div>
          ))}
          
          {filteredNotes.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No notes found
            </div>
          )}
        </div>
      </div>
      
      {/* Note Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            {/* Note Header */}
            <div className="p-4 border-b flex justify-between items-start">
              {isEditing ? (
                <input
                  type="text"
                  className="text-xl font-bold w-full bg-transparent focus:outline-none"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              ) : (
                <h2 className="text-xl font-bold">{selectedNote.title}</h2>
              )}
              
              <div className="flex space-x-2">
                {isEditing ? (
                  <button 
                    onClick={handleSaveNote}
                    className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-sm hover:bg-primary/90"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handleEditNote}
                      className="p-2 rounded hover:bg-muted"
                      aria-label="Edit note"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteNote(selectedNote.id)}
                      className="p-2 rounded hover:bg-muted text-red-500"
                      aria-label="Delete note"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Note Content */}
            <div className="flex-1 overflow-auto p-4">
              {isEditing ? (
                <textarea
                  className="w-full h-full bg-transparent focus:outline-none resize-none"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              ) : (
                <div className="whitespace-pre-wrap">
                  {selectedNote.content || (
                    <span className="text-muted-foreground italic">
                      This note is empty
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {/* Note Footer */}
            <div className="p-4 border-t text-xs text-muted-foreground">
              Created {formatDate(selectedNote.createdAt)} · 
              Last updated {formatDate(selectedNote.updatedAt)}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <Edit3 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">No note selected</h3>
            <p className="text-muted-foreground">
              Select a note from the list or create a new one
            </p>
            <button 
              onClick={handleCreateNote}
              className="mt-4 px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Create Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;