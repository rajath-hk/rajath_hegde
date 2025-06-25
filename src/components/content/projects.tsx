import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Lofi YouTube Stream",
    description: "A custom player for lofi YouTube streams, offering a clean and focused listening experience without the clutter of YouTube's interface.",
    imageUrl: "src/components/img/ChatGPT Image Jun 25, 2025, 07_11_47 PM.png",
    hint: "music player",
    repoUrl: "https://github.com/rajath-hk/lofi-youtube-stream"
  },
  {
    title: "Virtual Classroom",
    description: "An online platform that simulates a classroom environment, designed to facilitate interactive learning between students and teachers.",
    imageUrl: "src/components/img/screencapture-meet-jit-si-FailedTracksOperateSteadily-2025-06-25-19_03_15.png",
    hint: "online learning",
    repoUrl: "https://github.com/rajath-hk/classroom"
  },
  {
    title: "Token Management System",
    description: "A backend system for generating, validating, and managing authentication tokens to ensure secure access to applications.",
    imageUrl: "src/components/img/screencapture-rajath-hk-github-io-token-2025-06-25-19_06_46.png",
    hint: "security dashboard",
    repoUrl: "https://github.com/rajath-hk/token"
  },
  {
    title: "Demo Homepage",
    description: "A live demonstration of a modern and responsive homepage, showcasing skills in front-end development and user interface design.",
    imageUrl: "src/components/img/image.png",
    hint: "healthcare website",
    demoUrl: "https://rajath-hk.github.io/demo_homepage/"
  }
];

const ProjectsContent = () => {
  return (
    <div className="p-6 space-y-6 text-card-foreground">
      <h2 className="text-lg font-bold">My Projects</h2>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full"
                  data-ai-hint={project.hint}
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="font-bold text-base">{project.title}</h3>
              <p className="text-sm mt-1 text-card-foreground/80">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Github />
                      View Code
                    </Button>
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="default" size="sm">
                      <ExternalLink />
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
