'use client';

import React, { useState } from 'react';
import { Plus, Save, Trash2, Edit3 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome to Notes',
      content: 'This is your first note. You can edit or delete it, or create new notes using the + button.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  
  const [activeNoteId, setActiveNoteId] = useState('1');
  const [isEditing, setIsEditing] = useState(false);
  
  const activeNote = notes.find(note => note.id === activeNoteId) || notes[0];

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setIsEditing(true);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date() } 
        : note
    ));
  };

  const deleteNote = (id: string) => {
    if (notes.length <= 1) {
      alert('You must have at least one note.');
      return;
    }
    
    if (confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      
      if (activeNoteId === id) {
        setActiveNoteId(updatedNotes[0].id);
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (activeNote) {
      updateNote(activeNote.id, { title: e.target.value });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (activeNote) {
      updateNote(activeNote.id, { content: e.target.value });
    }
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-3 border-b flex justify-between items-center">
          <h2 className="font-semibold">Notes</h2>
          <button 
            onClick={createNewNote}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="New note"
          >
            <Plus size={18} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {notes.map(note => (
            <div 
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`p-3 border-b cursor-pointer ${
                activeNoteId === note.id 
                  ? 'bg-blue-500/20 border-l-4 border-l-blue-500' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="font-medium truncate">{note.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                {note.content.substring(0, 50)}{note.content.length > 50 ? '...' : ''}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {note.updatedAt.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Note Editor */}
      <div className="flex-1 flex flex-col">
        {activeNote ? (
          <>
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                {isEditing ? (
                  <input
                    type="text"
                    value={activeNote.title}
                    onChange={handleTitleChange}
                    className="text-xl font-bold w-full p-2 mb-2 border rounded"
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                    autoFocus
                  />
                ) : (
                  <h2 
                    className="text-xl font-bold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded"
                    onClick={() => setIsEditing(true)}
                  >
                    {activeNote.title}
                  </h2>
                )}
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => deleteNote(activeNote.id)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Delete note"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button 
                    onClick={() => updateNote(activeNote.id, { 
                      title: activeNote.title, 
                      content: activeNote.content 
                    })}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Save note"
                  >
                    <Save size={16} />
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {activeNote.updatedAt.toLocaleString()}
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={activeNote.content}
                onChange={handleContentChange}
                className="w-full h-full p-2 resize-none focus:outline-none bg-transparent"
                placeholder="Start writing your note here..."
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <Edit3 size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Note Selected</h3>
            <p className="text-gray-500 mb-4">
              Select a note from the sidebar or create a new one
            </p>
            <button
              onClick={createNewNote}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Create New Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;