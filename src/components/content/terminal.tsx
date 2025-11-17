'use client';

import React, { useState, useEffect, useRef } from 'react';
import { portfolioConfig } from '@/config/portfolio';
import { Terminal as TerminalIcon } from 'lucide-react';

interface Commands {
  [key: string]: (...args: string[]) => string[];
}

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Commands = {
    help: () => [
      'Available commands:',
      '  help         - Show this help message',
      '  about        - Display information about me',
      '  projects     - List my projects',
      '  skills       - Show my technical skills',
      '  contact      - Display contact information',
      '  resume       - View my resume',
      '  socials      - Show my social media links',
      '  clear        - Clear the terminal screen',
      '  date         - Show current date and time',
      '  neofetch     - Display system information',
      '  ls           - List directory contents',
      '  pwd          - Print working directory',
      '  whoami       - Display current user',
      '  echo         - Display text',
      '  cat          - Display file contents',
    ],
    about: () => [
      `${portfolioConfig.personal?.name || 'Name not set'} - ${portfolioConfig.personal?.title || 'Title not set'}`,
      `Location: ${portfolioConfig.personal?.location || 'Location not set'}`,
      '',
      portfolioConfig.personal?.bio || 'Bio not available',
    ],
    projects: () => {
      const projectLines = ['My Projects:'];
      (portfolioConfig.projects || []).forEach((project, index) => {
        projectLines.push(`  ${index + 1}. ${project.title || 'Untitled'} - ${project.description || 'No description'}`);
      });
      return projectLines;
    },
    skills: () => [
      'Technical Skills:',
      `  Expert:     ${(portfolioConfig.skills?.expert || []).join(', ')}`,
      `  Advanced:   ${(portfolioConfig.skills?.advanced || []).join(', ')}`,
      `  Familiar:   ${(portfolioConfig.skills?.intermediate || []).join(', ')}`,
      `  Learning:   ${(portfolioConfig.skills?.learning || []).join(', ')}`
    ],
    contact: () => [
      'Contact Information:',
      `  Email:    ${portfolioConfig.personal?.email || 'Not provided'}`,
      `  GitHub:   ${portfolioConfig.social?.github || 'Not provided'}`,
      `  LinkedIn: ${portfolioConfig.social?.linkedin || 'Not provided'}`
    ],
    resume: () => [
      'To view my resume, please visit:',
      `  ${typeof window !== 'undefined' ? window.location.origin : ''}${portfolioConfig.personal?.resume || '/resume'}`
    ],
    socials: () => [
      'Connect with me:',
      `  GitHub:   ${portfolioConfig.social?.github || 'Not provided'}`,
      `  LinkedIn: ${portfolioConfig.social?.linkedin || 'Not provided'}`,
      `  Twitter:  ${portfolioConfig.social?.twitter || 'Not provided'}`,
      `  Instagram: ${portfolioConfig.social?.instagram || 'Not provided'}`
    ],
    date: () => [
      new Date().toLocaleString()
    ],
    neofetch: () => [
      '┌────────────────────────────────────────────────────────────┐',
      '│  ██████╗ ███████╗████████╗██████╗  ██████╗ ████████╗      │',
      '│  ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗╚══██╔══╝      │',
      '│  ██████╔╝█████╗     ██║   ██████╔╝██║   ██║   ██║         │',
      '│  ██╔═══╝ ██╔══╝     ██║   ██╔══██╗██║   ██║   ██║         │',
      '│  ██║     ███████╗   ██║   ██║  ██║╚██████╔╝   ██║         │',
      '│  ╚═╝     ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝         │',
      '└────────────────────────────────────────────────────────────┘',
      '',
      `  ${portfolioConfig.personal?.name || 'User'}@PortfolioOS`,
      '  -----------------------',
      '  OS: PortfolioOS 1.0.0',
      '  Shell: Web Terminal',
      '  Theme: Modern Dark',
      `  Location: ${portfolioConfig.personal?.location || 'Unknown'}`,
      `  Uptime: ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
      `  Memory: ${Math.floor(Math.random() * 8) + 8}GB / 16GB`,
      `  CPU: Intel Core i7-9750H @ 2.60GHz`
    ],
    clear: () => {
      setHistory([]);
      return [];
    },
    ls: () => [
      'Desktop/',
      'Documents/',
      'Projects/',
      'Downloads/',
      'Applications/',
      'README.md',
      'package.json'
    ],
    pwd: () => [
      '/home/portfolio'
    ],
    whoami: () => [
      portfolioConfig.personal?.name || 'portfolio-user'
    ],
    echo: (...args: string[]) => [
      args.join(' ')
    ],
    cat: (file: string) => {
      const fileContents: { [key: string]: string[] } = {
        'README.md': [
          '# PortfolioOS',
          '',
          'A modern, interactive portfolio built as a desktop operating system.',
          '',
          '## Features',
          '- Desktop environment with windows',
          '- File explorer',
          '- Terminal emulator',
          '- Project showcase',
          '- Contact form'
        ],
        'package.json': [
          '{',
          '  "name": "portfolio-os",',
          '  "version": "1.0.0",',
          '  "description": "Interactive portfolio as desktop OS",',
          '  "main": "next.config.js",',
          '  "scripts": {',
          '    "dev": "next dev",',
          '    "build": "next build",',
          '    "start": "next start"',
          '  }',
          '}'
        ]
      };
      return fileContents[file] || [`cat: ${file}: No such file or directory`];
    }
  };

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage = [
      'Welcome to PortfolioOS Terminal v1.0.0',
      'Type "help" for available commands.',
      '',
    ];
    setHistory(welcomeMessage);
    
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string, args: string[]): string[] => {
    const command = cmd.toLowerCase();
    if (commands[command]) {
      return commands[command](...args);
    }
    return [`Command not found: ${cmd}. Type 'help' for available commands.`];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const newHistory = [...history, `$ ${input}`];
    const [cmd, ...args] = input.trim().split(' ');
    
    // Add to command history
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    
    // Execute command
    const output = handleCommand(cmd, args);
    
    setHistory([...newHistory, ...output, '']);
    setInput('');
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
      const matchingCommands = Object.keys(commands).filter(cmd => 
        cmd.startsWith(input.toLowerCase()) && cmd !== 'default'
      );
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-black text-green-400 font-mono text-sm">
      <div className="flex items-center px-4 py-2 bg-gray-900 border-b border-gray-700">
        <TerminalIcon className="w-4 h-4 mr-2" />
        <span>Terminal</span>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            spellCheck={false}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;