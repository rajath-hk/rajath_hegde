'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Laptop, Server, Cloud, Cog } from 'lucide-react';

interface TechGroup {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const techGroups: TechGroup[] = [
  {
    title: 'Frontend',
    icon: <Laptop className="h-5 w-5" />,
    skills: [
      'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'HTML5',
      'CSS3', 'JavaScript', 'Vue.js', 'Angular'
    ]
  },
  {
    title: 'Backend',
    icon: <Server className="h-5 w-5" />,
    skills: [
      'Node.js', 'Python', 'Java', 'Spring Boot', 'Express.js', 'MongoDB',
      'PostgreSQL', 'REST APIs', 'GraphQL'
    ]
  },
  {
    title: 'DevOps',
    icon: <Cog className="h-5 w-5" />,
    skills: [
      'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Git', 'GitHub Actions',
      'Linux', 'Bash Scripting'
    ]
  },
  {
    title: 'Cloud',
    icon: <Cloud className="h-5 w-5" />,
    skills: [
      'AWS', 'Azure', 'Google Cloud', 'Serverless', 'Lambda', 'S3',
      'EC2', 'Cloud Functions'
    ]
  }
];

export function GroupedTechStack() {
  return (
    <ScrollArea className="h-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {techGroups.map((group, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {group.icon}
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}