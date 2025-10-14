import React from 'react';
import { Card } from '@/components/ui/card';

const blogPosts = [
  {
    id: 1,
    title: "Building a Portfolio OS: Lessons Learned",
    date: "2024-03-15",
    excerpt: "How I created an interactive desktop environment as my portfolio website and what I learned along the way.",
    readTime: "5 min read",
    tags: ["React", "Next.js", "Portfolio"]
  },
  {
    id: 2,
    title: "The Evolution of My Development Workflow",
    date: "2024-02-28",
    excerpt: "A deep dive into how my development process has evolved over the years and the tools that have made the biggest impact.",
    readTime: "8 min read",
    tags: ["Tools", "Productivity", "Development"]
  },
  {
    id: 3,
    title: "Why I Chose TypeScript for All My Projects",
    date: "2024-01-10",
    excerpt: "An analysis of the benefits I've experienced since adopting TypeScript across all my frontend and backend projects.",
    readTime: "6 min read",
    tags: ["TypeScript", "JavaScript", "Best Practices"]
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    date: "2023-12-05",
    excerpt: "Practical techniques and tools for creating web applications that are accessible to users of all abilities.",
    readTime: "10 min read",
    tags: ["Accessibility", "UX", "Frontend"]
  }
];

const Blog = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts, tutorials, and insights from my journey as a developer.
        </p>
      </div>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="p-6 hover:bg-accent transition-colors cursor-pointer">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              
              <h2 className="text-xl font-semibold">{post.title}</h2>
              
              <p className="text-muted-foreground">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs bg-secondary rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;