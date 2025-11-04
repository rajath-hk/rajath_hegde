'use client';

import React, { useState, useEffect, useRef } from 'react';
import { portfolioConfig } from '@/config/portfolio';
import { Terminal as TerminalIcon, User, Folder, FileText, Github, Linkedin, Mail } from 'lucide-react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = {
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
    ],
    about: () => [
      `${portfolioConfig.personal.name} - ${portfolioConfig.personal.title}`,
      `Location: ${portfolioConfig.personal.location}`,
      '',
      portfolioConfig.personal.bio,
    ],
    projects: () => {
      const projectLines = ['My Projects:'];
      portfolioConfig.projects.forEach((project, index) => {
        projectLines.push(`  ${index + 1}. ${project.title} - ${project.description}`);
      });
      projectLines.push('');
      projectLines.push('Use "projects <number>" for more details about a specific project.');
      return projectLines;
    },
    skills: () => [
      'Technical Skills:',
      `  Expert:     ${portfolioConfig.skills.expert.join(', ')}`,
      `  Advanced:   ${portfolioConfig.skills.advanced.join(', ')}`,
      `  Familiar:   ${portfolioConfig.skills.intermediate.join(', ')}`,
      `  Learning:   ${portfolioConfig.skills.learning.join(', ')}`,
    ],
    contact: () => [
      'Contact Information:',
      `  Email:    ${portfolioConfig.personal.email}`,
      `  GitHub:   ${portfolioConfig.social.github}`,
      `  LinkedIn: ${portfolioConfig.social.linkedin}`,
    ],
    resume: () => [
      'To view my resume, please visit:',
      `  ${typeof window !== 'undefined' ? window.location.origin : ''}${portfolioConfig.personal.resume}`,
    ],
    socials: () => [
      'Connect with me:',
      `  GitHub:   ${portfolioConfig.social.github}`,
      `  LinkedIn: ${portfolioConfig.social.linkedin}`,
      `  Twitter:  ${portfolioConfig.social.twitter}`,
      `  Instagram: ${portfolioConfig.social.instagram}`,
    ],
    date: () => [
      new Date().toString(),
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
      `  ${portfolioConfig.personal.name}@PortfolioOS`,
      '  -----------------------',
      '  OS: PortfolioOS 1.0.0',
      '  Kernel: Linux 5.15.0',
      '  Shell: zsh 5.8',
      '  Terminal: Portfolio Terminal',
      '  CPU: Intel i7-1165G7 (8) @ 4.700GHz',
      '  Memory: 16GB',
      `  Location: ${portfolioConfig.personal.location}`,
    ],
    clear: () => {
      setHistory([]);
      return [];
    },
    default: (cmd: string) => [
      `Command not found: ${cmd}. Type 'help' for available commands.`,
    ],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const newHistory = [...history, `$ ${input}`];
    const [cmd, ...args] = input.trim().split(' ');
    const command = cmd.toLowerCase();
    
    // Add to command history
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    
    // Execute command
    let output: string[] = [];
    if (commands[command as keyof typeof commands]) {
      output = commands[command as keyof typeof commands]();
    } else {
      output = commands.default(cmd);
    }
    
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