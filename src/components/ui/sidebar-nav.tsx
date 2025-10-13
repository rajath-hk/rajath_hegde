import React from 'react';
import Link from 'next/link';

const sections = [
  { id: 'story', label: 'My Story' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const SidebarNav = () => {
  return (
    <nav className="hidden md:flex flex-col gap-4 fixed top-20 left-6 z-40">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="text-muted-foreground hover:text-primary font-medium transition-colors px-2 py-1 rounded"
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
};

export default SidebarNav;
