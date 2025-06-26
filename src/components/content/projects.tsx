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
                  data-ai-hint={project.aiHint}
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
