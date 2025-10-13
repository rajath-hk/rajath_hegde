import React from 'react';
import { Card } from '@/components/ui/card';

const milestones = [
  {
    year: "2015",
    title: "The Beginning",
    description: "Started my programming journey with Python and web development basics."
  },
  {
    year: "2017",
    title: "Computer Science Fundamentals",
    description: "Pursued Computer Science education, diving deep into algorithms, data structures, and software architecture."
  },
  {
    year: "2019",
    title: "Professional Development",
    description: "Started professional development work, focusing on full-stack web applications and cloud technologies."
  },
  {
    year: "2021",
    title: "Specialization & Growth",
    description: "Specialized in modern web technologies, particularly React ecosystem and TypeScript."
  },
  {
    year: "2023",
    title: "Current Focus",
    description: "Working on innovative projects combining web technologies with AI/ML capabilities."
  }
];

const Journey = () => {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Professional Journey</h2>
      
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div key={index} className="relative pl-8 pb-8 last:pb-0">
            {/* Timeline line */}
            <div className="absolute left-2 top-2 bottom-0 w-px bg-border" 
                 style={{ display: index === milestones.length - 1 ? 'none' : 'block' }} />
            
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary" />
            
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">{milestone.year}</span>
                <h3 className="text-lg font-semibold">{milestone.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Journey;