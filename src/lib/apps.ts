import type { AppConfig } from '@/types';
import { FileText, Folder, Mail, Briefcase, Award, Terminal, FileSearch } from 'lucide-react';

export const initialAppsData: Omit<AppConfig, 'content'>[] = [
  { id: 'about', title: 'My Story', icon: FileText, defaultSize: { width: 550, height: 400 }, x: 20, y: 50 },
  { id: 'my-work', title: 'My Work', icon: Briefcase, defaultSize: { width: 700, height: 500 }, x: 20, y: 150 },
  { id: 'skills', title: 'Skills', icon: Award, defaultSize: { width: 600, height: 500 }, x: 130, y: 150 },
  { id: 'contact', title: 'Contact Me', icon: Mail, defaultSize: { width: 450, height: 580 }, x: 130, y: 150 },
  { id: 'socials', title: 'Socials', icon: Folder, defaultSize: { width: 450, height: 350 }, x: 130, y: 250 },
  { id: 'terminal', title: 'Terminal', icon: Terminal, defaultSize: { width: 650, height: 450 }, x: 100, y: 100 },
  { id: 'blog', title: 'Blog', icon: FileSearch, defaultSize: { width: 650, height: 500 }, x: 150, y: 150 },
  { id: 'explorer', title: 'File Explorer', icon: Folder, defaultSize: { width: 700, height: 500 }, x: 200, y: 200 },
  { id: 'legal', title: 'Legal', icon: Folder, defaultSize: { width: 500, height: 300 }, x: 20, y: 450 },
];
