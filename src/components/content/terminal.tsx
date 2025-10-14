'use client';

import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    // Initial welcome message
    setHistory([
      {
        command: '',
        output: `Welcome to PortfolioOS Terminal v1.0.0\nType 'help' to see available commands.\n`,
      },
    ]);
  }, []);

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    let output = '';

    switch (cmd) {
      case '':
        break;
      case 'help':
        output = `
Available commands:
  whoami     - Display user information
  skills     - Show technical skills
  projects   - List featured projects
  experience - Show work experience
  contact    - Display contact information
  clear      - Clear the terminal
  help       - Show this help message
        `.trim();
        break;
      case 'whoami':
        output = `
┌─────────────────────────────────────────────────────────────┐
│  Rajath Hegde                                               │
│  Full Stack Developer                                       │
│  Location: Bangalore, India                                 │
│  Passionate about creating thoughtful, user-centric         │
│  experiences with code and creativity                       │
└─────────────────────────────────────────────────────────────┘
        `.trim();
        break;
      case 'skills':
        output = `
Frontend Development:
  • React & Next.js     ██████████░ 90%
  • TypeScript          ██████████░ 90%
  • Tailwind CSS        ██████████░ 95%
  • Framer Motion       █████████░░ 85%

Backend Development:
  • Node.js             █████████░░ 85%
  • Python              ████████░░░ 75%
  • RESTful APIs        ██████████░ 90%

DevOps & Tools:
  • Git & CI/CD         █████████░░ 85%
  • Docker              ███████░░░░ 70%
  • Cloud Platforms     ████████░░░ 75%
        `.trim();
        break;
      case 'projects':
        output = `
Featured Projects:
  • Portfolio OS (2024)
    Web Application | Next.js 14, TypeScript, Tailwind CSS
    An interactive operating system-themed portfolio website
    
  • AI Development Assistant (2023)
    VS Code Extension | TypeScript, OpenAI API
    Intelligent coding assistant with real-time suggestions
    
  • Lofi YouTube Stream (2023)
    Web Application | React, Next.js, Tailwind CSS
    Custom player for lofi YouTube streams
    
  • Virtual Classroom (2022)
    Web Platform | React, Node.js, Socket.io
    Online platform simulating a classroom environment
        `.trim();
        break;
      case 'experience':
        output = `
Professional Experience:
  • Senior Full Stack Developer
    Tech Innovations Pvt. Ltd. (2021 - Present)
    - Led development of 5+ web applications using React and Node.js
    - Improved application performance by 40% through optimization
    
  • Frontend Developer
    Digital Solutions Inc. (2019 - 2021)
    - Developed responsive UI components for enterprise clients
    - Collaborated with UX designers to implement pixel-perfect designs
    
  • Junior Developer
    WebCraft Studios (2017 - 2019)
    - Built and maintained client websites using modern web technologies
    - Participated in code reviews and mentored junior developers
        `.trim();
        break;
      case 'contact':
        output = `
Contact Information:
  • Email: rajath@example.com
  • GitHub: github.com/rajath-hk
  • LinkedIn: linkedin.com/in/rajath-hegde
  • Twitter: @rajath_dev
        
You can also reach out through the Contact Me window in PortfolioOS!
        `.trim();
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        output = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { command, output }]);
    setCommandHistory(prev => [...prev, command]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== '') {
      executeCommand(input);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
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
      const commands = ['whoami', 'skills', 'projects', 'experience', 'contact', 'clear', 'help'];
      const matchingCommand = commands.find(cmd => cmd.startsWith(input.toLowerCase()));
      if (matchingCommand) {
        setInput(matchingCommand);
      }
    }
  };

  return (
    <div 
      ref={terminalRef}
      className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-y-auto"
    >
      {history.map((entry, index) => (
        <div key={index} className="mb-2">
          {entry.command && (
            <div>
              <span className="text-blue-400">visitor@portfolioos:~$ </span>
              <span>{entry.command}</span>
            </div>
          )}
          <div className="whitespace-pre-wrap mt-1">{entry.output}</div>
        </div>
      ))}
      
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-blue-400">visitor@portfolioos:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none ml-2 text-green-400"
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default Terminal;