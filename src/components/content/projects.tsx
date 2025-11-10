import React, { useEffect, useState } from 'react';
import { portfolioConfig } from '@/config/portfolio';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
};

const Projects = () => {
  const { projects } = portfolioConfig;
  const [ghRepos, setGhRepos] = useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Attempt to fetch public repos from GitHub for the configured user (client-side)
    const githubUrl = portfolioConfig.social?.github || '';
    const match = githubUrl.match(/github.com\/(.+?)(?:\/|$)/i);
    if (!match) return;
    const username = match[1];

    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}/repos?per_page=10&sort=updated`)
      .then(async (r) => {
        // Detect GitHub API rate limiting
        const remaining = r.headers.get('x-ratelimit-remaining');
        const reset = r.headers.get('x-ratelimit-reset');

        if (r.status === 403 && (remaining === '0' || (remaining !== null && reset !== null))) {
          const resetTs = reset ? parseInt(reset, 10) * 1000 : null;
          const resetTime = resetTs ? new Date(resetTs).toLocaleString() : 'later';
          setError(`GitHub API rate limit exceeded, resets at ${resetTime}`);
          setLoading(false);
          return null; // return early to avoid parsing JSON
        }

        if (!r.ok) {
          const text = await r.text();
          setError(`Failed to fetch GitHub repos: ${r.status} ${r.statusText} ${text}`);
          setLoading(false);
          return null;
        }

        const data = await r.json();
        setGhRepos(data as GitHubRepo[]);
        setLoading(false);
      })
      .catch((err) => {
        setError('Unable to fetch GitHub repositories.');
        console.error('Error fetching GitHub repos', err);
        setLoading(false);
      });
  }, []);

  const displayProjects = ghRepos && ghRepos.length > 0 ? ghRepos.map(r => ({
    id: String(r.id),
    title: r.name,
    description: r.description || '',
    technologies: [r.language || ''],
    category: 'GitHub',
    year: new Date(r.updated_at).getFullYear(),
    links: { github: r.html_url, demo: null }
  })) : projects;

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <p className="text-lg text-muted-foreground">
          A collection of projects that showcase my journey, skills, and passion for building impactful solutions.
        </p>
      </div>

      {loading && <div className="p-4">Loading projects...</div>}
      {error && <div className="p-4 text-red-500">{error}</div>}

      <div className="grid gap-6">
        {displayProjects.map((project) => (
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
