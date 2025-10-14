import React, { useEffect, useState } from 'react';
// Helper to extract owner/repo from GitHub URL
function parseRepo(url: string) {
  const match = url.match(/github.com\/(.+?)\/(.+?)(?:$|\/|#|\?)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

// Hook to fetch GitHub repo stats
function useGitHubStats(repoUrl?: string) {
  const [stats, setStats] = useState<{stars: number; forks: number} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!repoUrl) return;
    const repo = parseRepo(repoUrl);
    if (!repo) return;
    setLoading(true);
    fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}`)
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(data => setStats({ stars: data.stargazers_count, forks: data.forks_count }))
      .catch(() => setError('Could not load stats'))
      .finally(() => setLoading(false));
  }, [repoUrl]);
  return { stats, loading, error };
}
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';


const projects = [
  {
    title: "Portfolio OS",
    description: "A unique portfolio website designed as an interactive operating system interface.",
    imageUrl: "https://img.playbook.com/JxSuclTXT38ACmTwF6_Wp67qQyMHBfBAmChFlvQ0Tog/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzBjYTY1NTRk/LWNmNzItNDcwOS1h/OGIwLWUyMzQwZjAw/MTU3Yg",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
    links: [
      { label: "GitHub", url: "https://github.com/rajath-hk/portfolio", icon: <Github size={18} /> },
    ],
  },
  {
    title: "Lofi YouTube Stream",
    description: "A custom player for lofi YouTube streams, offering a clean and focused listening experience without the clutter of YouTube's interface.",
    imageUrl: "https://img.playbook.com/BTnl4TI0V6z7PfLw8FSSXEuViX5X3E-WyxuRMQL4Lmk/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzI2NDQyZGM0/LTZiOTYtNGZmMi1i/YmMyLThmNDk4ZmY2/NTEyZA",
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    links: [
      { label: "GitHub", url: "https://github.com/rajath-hk/lofi-youtube-stream", icon: <Github size={18} /> },
    ],
  },
  {
    title: "Virtual Classroom",
    description: "An online platform that simulates a classroom environment, designed to facilitate interactive learning between students and teachers.",
    imageUrl: "https://img.playbook.com/IATitayq6KEgMGo1QHTGJvoFK4N8MxNf6Po9LFDM2EM/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzZkNjE5MTlk/LWFlOTAtNGQ5My04/MWM5LWRhOTFlN2Mw/MmQ5ZA",
    techStack: ["React", "Node.js", "Socket.io", "MongoDB"],
    links: [
      { label: "GitHub", url: "https://github.com/rajath-hk/classroom", icon: <Github size={18} /> },
    ],
  },
  {
    title: "Token Management System",
    description: "A backend system for generating, validating, and managing authentication tokens to ensure secure access to applications.",
    imageUrl: "https://img.playbook.com/MHi_VJ791_7Dm9-MZhssC17ApNtqu97RzZHCTot9izQ/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzJhOWVhMGU1/LWZlMzgtNGEzNi04/OTRjLTJmZGMxYjMx/YTFjYg",
    techStack: ["Node.js", "Express", "JWT", "MongoDB"],
    links: [
      { label: "GitHub", url: "https://github.com/rajath-hk/token", icon: <Github size={18} /> },
    ],
  },
  {
    title: "Demo Homepage",
    description: "A live demonstration of a modern and responsive homepage, showcasing skills in front-end development and user interface design.",
    imageUrl: "https://img.playbook.com/JxSuclTXT38ACmTwF6_Wp67qQyMHBfBAmChFlvQ0Tog/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzBjYTY1NTRk/LWNmNzItNDcwOS1h/OGIwLWUyMzQwZjAw/MTU3Yg",
    techStack: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    links: [
      { label: "Demo", url: "https://rajath-hk.github.io/demo_homepage/", icon: <ExternalLink size={18} /> },
    ],
  },
];

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

interface Project {
  title: string;
  year: string;
  platform: string;
  overview: string;
  story: string;
  challenges: string[];
  impact: string;
  techStack: string[];
  link?: string;
}

const projectsList: Project[] = [
  {
    title: "Portfolio OS",
    year: "2024",
    platform: "Web Application",
    overview: "A unique portfolio website designed as an interactive operating system interface",
    story: "This project emerged from my desire to create a portfolio that would not only showcase my work but also demonstrate my creativity and technical skills. Inspired by classic operating systems and modern web capabilities, I designed an interactive experience that mimics a desktop OS while serving as a professional portfolio.",
    challenges: [
      "Implementing a realistic window management system with dragging, resizing, and z-index handling",
      "Creating a responsive design that maintains the OS feel across different screen sizes",
      "Optimizing performance while handling multiple interactive elements",
    ],
    impact: "The project has received positive feedback for its unique approach and has served as an effective demonstration of both my technical capabilities and creative problem-solving skills.",
    techStack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Shadcn UI",
    ],
    link: "https://github.com/rajath-hk/portfolio"
  },
  {
    title: "AI Development Assistant",
    year: "2023",
    platform: "VS Code Extension",
    overview: "An intelligent coding assistant that helps developers write better code through real-time suggestions and automated reviews",
    story: "After experiencing the challenges of maintaining code quality across large projects, I developed this tool to automate code reviews and provide instant feedback during development. The project combines my interest in AI with practical development needs.",
    challenges: [
      "Implementing efficient code analysis without impacting editor performance",
      "Training the AI model to provide contextually relevant suggestions",
      "Handling various programming languages and coding styles",
    ],
    impact: "The extension has been downloaded over 5,000 times and maintains a 4.5/5 rating. Users report significant improvements in code quality and development speed.",
    techStack: [
      "TypeScript",
      "VS Code API",
      "OpenAI API",
      "Node.js",
      "TensorFlow",
    ],
    link: "https://github.com/rajath-hk/ai-assistant"
  },
];


const ProjectCard: React.FC<{ project: typeof projects[0] }> = ({ project }) => {
  // Find first GitHub link
  const githubLink = project.links?.find(l => l.url.includes('github.com'));
  const { stats, loading, error } = useGitHubStats(githubLink?.url);
  return (
    <Card className="p-0 overflow-hidden group hover:shadow-2xl transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 w-full h-48 md:h-auto relative">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="object-cover w-full h-full md:rounded-l-lg md:rounded-r-none rounded-t-lg md:rounded-t-none"
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-6 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold mb-1">{project.title}</h3>
            <div className="flex gap-2">
              {project.links?.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.techStack?.map((tech, idx) => (
              <Badge key={idx} variant="outline">{tech}</Badge>
            ))}
          </div>
          {githubLink && (
            <div className="flex gap-4 items-center mt-2 text-xs text-muted-foreground">
              {loading && (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  <span>Loading GitHub stats…</span>
                </div>
              )}
              {error && <span>{error}</span>}
              {stats && (
                <>
                  <span title="Stars" className="flex items-center gap-1"><Github size={14} /> {stats.stars} stars</span>
                  <span title="Forks" className="flex items-center gap-1"><svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M7 7v2a5 5 0 0 0 5 5h0a5 5 0 0 0 5-5V7"/><circle cx="7" cy="5" r="2" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="5" r="2" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="19" r="2" stroke="currentColor" strokeWidth="2"/></svg> {stats.forks} forks</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const Projects = () => {
  // Define pinned projects
  const pinnedProjects = projects.slice(0, 3); // First 3 projects as pinned

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <p className="text-lg text-muted-foreground">
          A collection of projects that showcase my journey, skills, and passion for building impactful solutions.
        </p>
      </div>

      {/* Pinned Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Pinned Projects</h3>
          <span className="text-sm text-muted-foreground">Featured work</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pinnedProjects.map((project, index) => (
            <ProjectCard key={`pinned-${index}`} project={project} />
          ))}
        </div>
      </div>

      {/* All Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">All Projects</h3>
          <span className="text-sm text-muted-foreground">{projects.length} projects</span>
        </div>
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
