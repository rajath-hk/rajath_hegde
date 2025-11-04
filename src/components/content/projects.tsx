import React from 'react';
import { portfolioConfig } from '@/config/portfolio';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const { projects } = portfolioConfig;

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <p className="text-lg text-muted-foreground">
          A collection of projects that showcase my journey, skills, and passion for building impactful solutions.
        </p>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>
              <Badge variant="secondary">{project.category}</Badge>
            </div>
            
            <p className="text-muted-foreground">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  GitHub Repository →
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
