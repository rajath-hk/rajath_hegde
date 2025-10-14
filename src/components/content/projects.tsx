import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Lofi YouTube Stream",
    description: "A custom player for lofi YouTube streams, offering a clean and focused listening experience without the clutter of YouTube's interface.",
    imageUrl: "https://img.playbook.com/BTnl4TI0V6z7PfLw8FSSXEuViX5X3E-WyxuRMQL4Lmk/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzI2NDQyZGM0/LTZiOTYtNGZmMi1i/YmMyLThmNDk4ZmY2/NTEyZA",
    repoUrl: "https://github.com/rajath-hk/lofi-youtube-stream",
    aiHint: "music player"
  },
  {
    title: "Virtual Classroom",
    description: "An online platform that simulates a classroom environment, designed to facilitate interactive learning between students and teachers.",
    imageUrl: "https://img.playbook.com/IATitayq6KEgMGo1QHTGJvoFK4N8MxNf6Po9LFDM2EM/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzZkNjE5MTlk/LWFlOTAtNGQ5My04/MWM5LWRhOTFlN2Mw/MmQ5ZA",
    repoUrl: "https://github.com/rajath-hk/classroom",
    aiHint: "online learning"
  },
  {
    title: "Token Management System",
    description: "A backend system for generating, validating, and managing authentication tokens to ensure secure access to applications.",
    imageUrl: "https://img.playbook.com/MHi_VJ791_7Dm9-MZhssC17ApNtqu97RzZHCTot9izQ/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzJhOWVhMGU1/LWZlMzgtNGEzNi04/OTRjLTJmZGMxYjMx/YTFjYg",
    repoUrl: "https://github.com/rajath-hk/token",
    aiHint: "security system"
  },
  {
    title: "Demo Homepage",
    description: "A live demonstration of a modern and responsive homepage, showcasing skills in front-end development and user interface design.",
    imageUrl: "https://img.playbook.com/JxSuclTXT38ACmTwF6_Wp67qQyMHBfBAmChFlvQ0Tog/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzBjYTY1NTRk/LWNmNzItNDcwOS1h/OGIwLWUyMzQwZjAw/MTU3Yg",
    demoUrl: "https://rajath-hk.github.io/demo_homepage/",
    aiHint: "web design"
  }
];

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
          <Badge variant="secondary">{project.platform}</Badge>
        </div>
        
        <p className="text-lg font-medium">{project.overview}</p>
      </div>

      <div className="space-y-6">
        <section>
          <h4 className="text-lg font-semibold mb-3">The Story</h4>
          <p className="text-muted-foreground leading-relaxed">{project.story}</p>
        </section>

        <section>
          <h4 className="text-lg font-semibold mb-3">Challenges & Solutions</h4>
          <ul className="space-y-2 text-muted-foreground">
            {project.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-lg font-semibold mb-3">Impact & Results</h4>
          <p className="text-muted-foreground leading-relaxed">{project.impact}</p>
        </section>

        <section>
          <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            View Project →
          </a>
        )}
      </div>
    </Card>
  );
};

const Projects = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <p className="text-lg text-muted-foreground">
          A collection of projects that showcase my journey, skills, and passion for building impactful solutions.
        </p>
      </div>

      <div className="grid gap-8">
        {projectsList.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
