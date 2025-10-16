// Virtual file system for the portfolio OS
export interface FileSystemEntry {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemEntry[];
  content?: string;
  size?: number;
  modified?: Date;
  icon?: string;
}

export const fileSystem: FileSystemEntry = {
  id: 'root',
  name: 'Rajath Hegde',
  type: 'folder',
  children: [
    {
      id: 'projects',
      name: 'Projects',
      type: 'folder',
      children: [
        {
          id: 'portfolio-os',
          name: 'Portfolio OS',
          type: 'folder',
          children: [
            {
              id: 'readme-md',
              name: 'README.md',
              type: 'file',
              content: '# Portfolio OS\n\nA unique portfolio website designed as an interactive operating system interface.\n\n## Technologies\n- Next.js 14\n- TypeScript\n- Tailwind CSS\n- Framer Motion\n- Shadcn UI\n\n## Features\n- Interactive desktop UI with movable icons and resizable windows\n- Dark and light mode support\n- Responsive design for different screen sizes',
              size: 356,
              modified: new Date('2024-01-15'),
            },
            {
              id: 'screenshot-png',
              name: 'screenshot.png',
              type: 'file',
              size: 1024000,
              modified: new Date('2024-01-15'),
            }
          ],
          modified: new Date('2024-01-15'),
        },
        {
          id: 'ai-assistant',
          name: 'AI Development Assistant',
          type: 'folder',
          children: [
            {
              id: 'readme-md-2',
              name: 'README.md',
              type: 'file',
              content: '# AI Development Assistant\n\nAn intelligent coding assistant that helps developers write better code through real-time suggestions and automated reviews.\n\n## Technologies\n- TypeScript\n- VS Code API\n- OpenAI API\n- Node.js\n- TensorFlow\n\n## Features\n- Real-time code analysis\n- Contextually relevant suggestions\n- Multi-language support',
              size: 312,
              modified: new Date('2023-11-22'),
            }
          ],
          modified: new Date('2023-11-22'),
        }
      ],
      modified: new Date('2024-01-10'),
    },
    {
      id: 'documents',
      name: 'Documents',
      type: 'folder',
      children: [
        {
          id: 'resume-pdf',
          name: 'Resume.pdf',
          type: 'file',
          size: 245760,
          modified: new Date('2024-01-20'),
        },
        {
          id: 'cover-letter',
          name: 'Cover Letter.docx',
          type: 'file',
          size: 49152,
          modified: new Date('2024-01-20'),
        }
      ],
      modified: new Date('2024-01-20'),
    },
    {
      id: 'skills',
      name: 'Skills',
      type: 'folder',
      children: [
        {
          id: 'frontend-md',
          name: 'Frontend.md',
          type: 'file',
          content: '# Frontend Skills\n\n- React & Next.js (Expert)\n- TypeScript (Expert)\n- Tailwind CSS (Expert)\n- Framer Motion (Advanced)\n- UI/UX Design (Advanced)',
          size: 128,
          modified: new Date('2024-01-18'),
        },
        {
          id: 'backend-md',
          name: 'Backend.md',
          type: 'file',
          content: '# Backend Skills\n\n- Node.js (Advanced)\n- Python (Advanced)\n- RESTful APIs (Expert)\n- GraphQL (Intermediate)\n- Databases (Advanced)',
          size: 112,
          modified: new Date('2024-01-18'),
        }
      ],
      modified: new Date('2024-01-18'),
    }
  ],
  modified: new Date(),
};

// Utility functions for file system operations
export const findEntryById = (entry: FileSystemEntry, id: string): FileSystemEntry | null => {
  if (entry.id === id) return entry;
  
  if (entry.children) {
    for (const child of entry.children) {
      const found = findEntryById(child, id);
      if (found) return found;
    }
  }
  
  return null;
};

export const getFolderPath = (entry: FileSystemEntry, targetId: string, path: FileSystemEntry[] = []): FileSystemEntry[] | null => {
  if (entry.id === targetId) {
    return [...path, entry];
  }
  
  if (entry.children) {
    for (const child of entry.children) {
      const result = getFolderPath(child, targetId, [...path, entry]);
      if (result) return result;
    }
  }
  
  return null;
};