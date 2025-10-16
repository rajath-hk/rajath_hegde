'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWindows } from '@/contexts/window-context';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Rajath Hegde\'s Portfolio Terminal!',
    'Type "help" to see available commands.',
    ''
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { windows } = useWindows();
  const currentWindow = windows.find(w => w.id === 'terminal');
  
  // Focus the input when the terminal is focused
  useEffect(() => {
    if (currentWindow?.isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentWindow?.isFocused]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const newHistory = [...history, `visitor@portfolio:~$ ${cmd}`];
    
    switch (command) {
      case '':
        setHistory(newHistory);
        break;
      case 'help':
        setHistory([
          ...newHistory,
          'Available commands:',
          '  help        - Show this help message',
          '  about       - Display information about me',
          '  projects    - List my projects',
          '  skills      - Show my technical skills',
          '  contact     - Display contact information',
          '  resume      - View my resume',
          '  clear       - Clear the terminal screen',
          '  date        - Display current date and time',
          '  echo [text] - Display text',
          ''
        ]);
        break;
      case 'about':
        setHistory([
          ...newHistory,
          'Hi, I\'m Rajath Hegde!',
          'I\'m a Full-Stack Web Developer and MCA student from Karnataka, India.',
          'I specialize in creating interactive web experiences and have a passion for AI integration.',
          'My journey includes AWS certifications, self-hosted solutions, and mobile development.',
          ''
        ]);
        break;
      case 'projects':
        setHistory([
          ...newHistory,
          'My Projects:',
          '  Portfolio OS - Interactive portfolio designed as OS interface',
          '  AI Development Assistant - VS Code extension for code reviews',
          '  RTSP Loop Recorder - Android app for RTSP video recording',
          '  Self-hosted Video Platform - Custom video meeting solution',
          ''
        ]);
        break;
      case 'skills':
        setHistory([
          ...newHistory,
          'Technical Skills:',
          '  Frontend: React, Next.js, TypeScript, Tailwind CSS',
          '  Backend: Node.js, Python, REST APIs',
          '  DevOps: Docker, AWS, CI/CD',
          '  Other: AI/ML, Mobile Development, Self-hosted Solutions',
          ''
        ]);
        break;
      case 'contact':
        setHistory([
          ...newHistory,
          'Contact Information:',
          '  Email: rajath@example.com',
          '  LinkedIn: linkedin.com/in/rajath-hegde',
          '  GitHub: github.com/rajath-hk',
          ''
        ]);
        break;
      case 'resume':
        setHistory([
          ...newHistory,
          'You can view my resume by opening the "My Resume" window from the desktop or start menu.',
          ''
        ]);
        break;
      case 'clear':
        setHistory(['']);
        break;
      case 'date':
        setHistory([
          ...newHistory,
          new Date().toString(),
          ''
        ]);
        break;
      default:
        if (command.startsWith('echo ')) {
          setHistory([
            ...newHistory,
            cmd.substring(5),
            ''
          ]);
        } else {
          setHistory([
            ...newHistory,
            `Command not found: ${cmd}. Type "help" for available commands.`,
            ''
          ]);
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      executeCommand(input);
      setCommandHistory([...commandHistory, input]);
      setHistoryIndex(-1);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for commands
      const commands = ['help', 'about', 'projects', 'skills', 'contact', 'resume', 'clear', 'date', 'echo'];
      const matchingCommand = commands.find(cmd => cmd.startsWith(input.toLowerCase()));
      if (matchingCommand) {
        setInput(matchingCommand);
      }
    }
  };

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-auto">
      <div ref={terminalRef} className="h-[calc(100%-2rem)] overflow-y-auto">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2">visitor@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};

export default Terminal;