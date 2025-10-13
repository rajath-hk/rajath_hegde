"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, X, Download, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const MainHeader = () => {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <a href="#main-content" className="sr-only focus:not-sr-only absolute left-2 top-2 bg-primary text-white px-3 py-1 rounded z-50">Skip to main content</a>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-2">
        <div className="flex items-center gap-3">
          <span className="font-bold text-xl tracking-tight text-primary">Rajath Hegde</span>
        </div>
        <nav className="hidden md:flex gap-6 items-center" aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Go to ${link.label}`}>
              {link.label}
            </a>
          ))}
          <a href="/resume.pdf" download className="flex items-center gap-1 px-3 py-1 rounded bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
            <Download size={16} /> Resume
          </a>
          <button
            aria-label="Toggle dark mode"
            className="ml-2 p-2 rounded hover:bg-muted transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
        <button
          className="md:hidden p-2 rounded hover:bg-muted transition-colors"
          aria-label="Open menu"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {/* Mobile menu */}
        {open && (
        <nav className="md:hidden bg-background border-t border-border px-4 pb-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4" aria-label="Mobile navigation">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-2 rounded focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Go to ${link.label}`}>
              {link.label}
            </a>
          ))}
          <a href="/resume.pdf" download className="flex items-center gap-1 px-3 py-2 rounded bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
            <Download size={16} /> Resume
          </a>
          <button
            aria-label="Toggle dark mode"
            className="mt-2 p-2 rounded hover:bg-muted transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      )}
    </header>
  );
};

export default MainHeader;
