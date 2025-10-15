import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
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
    links: [
      { name: "GitHub", url: "https://github.com/rajath-hk/portfolio" },
      { name: "Live Demo", url: "#" }
    ]
  },
  {
    id: 2,
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
    links: [
      { name: "GitHub", url: "https://github.com/rajath-hk/ai-assistant" },
      { name: "Marketplace", url: "#" }
    ]
  },
  {
    id: 3,
    title: "Lofi YouTube Stream",
    year: "2023",
    platform: "Web Application",
    overview: "A custom player for lofi YouTube streams with enhanced features and a clean interface",
    story: "As a fan of lofi music, I noticed that existing YouTube players lacked features I wanted for a focused listening experience. I decided to build my own player with a clean interface and additional functionality.",
    challenges: [
      "Integrating with YouTube's API while respecting usage limits",
      "Creating a clean, distraction-free interface",
      "Implementing custom playback controls and features",
    ],
    impact: "The player has become my go-to for focused work sessions and has been shared with friends and colleagues who appreciate its simplicity.",
    techStack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "YouTube API",
    ],
    links: [
      { name: "GitHub", url: "https://github.com/rajath-hk/lofi-stream" },
      { name: "Live Demo", url: "#" }
    ]
  },
  {
    id: 4,
    title: "Virtual Classroom",
    year: "2022",
    platform: "Web Platform",
    overview: "An online platform that simulates a classroom environment for remote learning",
    story: "During the pandemic, I wanted to help educators create more engaging online learning experiences. I developed this platform to bring some of the interactivity of physical classrooms to the virtual environment.",
    challenges: [
      "Implementing real-time communication features",
      "Ensuring smooth video conferencing with minimal latency",
      "Creating interactive tools for both teachers and students",
    ],
    impact: "The platform was adopted by several educational institutions and helped facilitate more engaging remote learning experiences during challenging times.",
    techStack: [
      "React",
      "Node.js",
      "Socket.io",
      "WebRTC",
      "MongoDB",
    ],
    links: [
      { name: "GitHub", url: "https://github.com/rajath-hk/virtual-classroom" },
      { name: "Case Study", url: "#" }
    ]
  }
];

const Projects = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          A selection of my recent work and projects.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold">{project.title}</h2>
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>
                <Badge variant="secondary">{project.platform}</Badge>
              </div>
              
              <p className="text-base sm:text-lg font-medium">{project.overview}</p>
              
              <div className="space-y-4 text-sm sm:text-base">
                <div>
                  <h3 className="font-semibold mb-1">Story</h3>
                  <p className="text-muted-foreground">{project.story}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Challenges</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {project.challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Impact</h3>
                  <p className="text-muted-foreground">{project.impact}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <Badge key={index} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {project.links.map((link, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    className="touch-manipulation"
                    asChild
                  >
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.name === 'GitHub' ? (
                        <Github className="w-4 h-4 mr-2" />
                      ) : (
                        <ExternalLink className="w-4 h-4 mr-2" />
                      )}
                      {link.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;