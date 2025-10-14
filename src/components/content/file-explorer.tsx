import React, { useState } from 'react';
import { Folder, FileText, Code, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';

const projects = [
  {
    id: 'jokedial',
    name: 'JokeDial',
    year: 2024,
    type: 'Web',
    description: 'AI-powered prank calls with realistic voice synthesis',
    technologies: ['React', 'Next.js', 'OpenAI API', 'Twilio'],
    category: 'web'
  },
  {
    id: 'refery',
    name: 'Refery',
    year: 2023,
    type: 'Mobile',
    description: 'Ad-sharing platform connecting local businesses with sports clubs',
    technologies: ['Flutter', 'Firebase', 'Node.js'],
    category: 'mobile'
  },
  {
    id: 'keytap',
    name: 'KeyTap',
    year: 2022,
    type: 'Web',
    description: 'Interactive platform for learning keyboard shortcuts',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'web'
  },
  {
    id: 'remark',
    name: 'Remark',
    year: 2021,
    type: 'Browser Extension',
    description: 'Uncensored comments platform for websites',
    technologies: ['JavaScript', 'Chrome Extension API', 'MongoDB'],
    category: 'tools'
  },
  {
    id: 'portfolioos',
    name: 'PortfolioOS',
    year: 2024,
    type: 'Website Template',
    description: 'Interactive operating system-themed portfolio website template',
    technologies: ['React', 'TypeScript', 'Framer Motion'],
    category: 'web'
  },
  {
    id: 'frags',
    name: 'Frags',
    year: 2023,
    type: 'Mobile',
    description: 'Gaming community app with 15,000+ downloads',
    technologies: ['Flutter', 'Firebase', 'Unity'],
    category: 'mobile'
  },
  {
    id: 'codecraft',
    name: 'CodeCraft',
    year: 2022,
    type: 'Web',
    description: 'Interactive coding tutorial platform',
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: 'web'
  },
  {
    id: 'pixelart',
    name: 'PixelArt Studio',
    year: 2021,
    type: 'Desktop',
    description: 'Cross-platform pixel art editor',
    technologies: ['Electron', 'React', 'Canvas API'],
    category: 'tools'
  }
];

const categories = [
  { id: 'all', name: 'All Projects', icon: Folder },
  { id: 'web', name: 'Web Development', icon: Globe },
  { id: 'mobile', name: 'Mobile Apps', icon: Code },
  { id: 'tools', name: 'Tools & Extensions', icon: FileText }
];

const FileExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold mb-2">Projects Explorer</h1>
        <p className="text-muted-foreground">
          Browse through my collection of projects organized by category
        </p>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar - Categories */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r p-4">
          <h2 className="font-semibold mb-3">Categories</h2>
          <nav className="space-y-1">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  className={`flex items-center w-full p-2 rounded-lg text-left ${
                    selectedCategory === category.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Main Content - Projects */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="p-4 hover:bg-accent transition-colors">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{project.name}</h3>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">
                      {project.year}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{project.type}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-secondary px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No projects found in this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;