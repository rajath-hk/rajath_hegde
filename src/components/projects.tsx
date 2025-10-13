"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const PROJECTS = [
  {
    id: 'portfolio-os',
    title: 'Portfolio OS',
    year: '2024',
    platform: 'Web',
    description: 'Interactive desktop-style portfolio demonstrating frontend skills and creative UI.',
    image: '/images/project1.webp',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    demo: 'https://rajath-hk.github.io/portfolio',
    repo: 'https://github.com/rajath-hk/portfolio'
  },
  {
    id: 'ai-assistant',
    title: 'AI Development Assistant',
    year: '2023',
    platform: 'VS Code Extension',
    description: 'AI assistant providing code suggestions and automated reviews.',
    image: '/images/project2.webp',
    tech: ['TypeScript', 'OpenAI API', 'Node.js'],
    demo: '',
    repo: 'https://github.com/rajath-hk/ai-assistant'
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    year: '2022',
    platform: 'Web',
    description: 'Real-time analytics dashboards with charts and alerts.',
    image: '/images/project3.webp',
    tech: ['React', 'Node.js', 'WebSocket'],
    demo: '',
    repo: ''
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Platform',
    year: '2021',
    platform: 'Web',
    description: 'Full-stack e-commerce application with payments and inventory.',
    image: '/images/project4.webp',
    tech: ['React', 'Node.js', 'MySQL'],
    demo: '',
    repo: ''
  }
];

const uniqueTechs = Array.from(new Set(PROJECTS.flatMap(p => p.tech)));

const Projects = () => {
  const [filter, setFilter] = useState<string>('All');

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.tech.includes(filter));

  return (
    <section id="projects" className="max-w-6xl mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="flex items-center gap-3">
          <label className="text-sm text-muted-foreground">Filter:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3 py-2 border border-border rounded">
            <option>All</option>
            {uniqueTechs.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {filtered.map(proj => (
          <article key={proj.id} className="bg-card rounded-lg shadow p-4 border border-border overflow-hidden">
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-muted">
              <picture>
                <source srcSet={proj.image.replace('.webp', '.webp')} type="image/webp" />
                <Image src={proj.image.replace('.webp', '.jpg')} alt={`${proj.title} screenshot`} fill className="object-cover" loading="lazy" />
              </picture>
            </div>
            <h3 className="text-xl font-semibold mb-1">{proj.title} <span className="text-sm text-muted-foreground">({proj.year})</span></h3>
            <p className="mb-3 text-muted-foreground">{proj.description}</p>
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {proj.tech.map(t => <span key={t} className="px-2 py-1 bg-muted rounded text-sm">{t}</span>)}
            </div>
            <div className="flex gap-3">
              {proj.demo && <a href={proj.demo} target="_blank" rel="noopener" className="px-3 py-2 rounded bg-primary text-white">Live Demo</a>}
              {proj.repo && <a href={proj.repo} target="_blank" rel="noopener" className="px-3 py-2 rounded border border-border">Code</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
