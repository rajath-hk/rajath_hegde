'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Code, 
  Database, 
  Cloud, 
  Smartphone,
  Globe,
  Zap,
  Cpu
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      name: 'Frontend Development',
      icon: <Globe className="w-5 h-5" />,
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'React', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
      ]
    },
    {
      name: 'Backend Development',
      icon: <Code className="w-5 h-5" />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 90 },
        { name: 'Express', level: 80 },
        { name: 'REST APIs', level: 85 },
      ]
    },
    {
      name: 'Database',
      icon: <Database className="w-5 h-5" />,
      skills: [
        { name: 'MongoDB', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MySQL', level: 70 },
      ]
    },
    {
      name: 'Cloud & DevOps',
      icon: <Cloud className="w-5 h-5" />,
      skills: [
        { name: 'AWS', level: 80 },
        { name: 'Docker', level: 75 },
        { name: 'Firebase', level: 85 },
        { name: 'CI/CD', level: 70 },
      ]
    },
    {
      name: 'Mobile Development',
      icon: <Smartphone className="w-5 h-5" />,
      skills: [
        { name: 'Android (Kotlin)', level: 80 },
        { name: 'React Native', level: 70 },
      ]
    },
    {
      name: 'Emerging Technologies',
      icon: <Zap className="w-5 h-5" />,
      skills: [
        { name: 'Machine Learning', level: 65 },
        { name: 'AI Integration', level: 70 },
        { name: 'Kubernetes', level: 60 },
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Technical Skills</h1>
        <p className="text-muted-foreground">
          My expertise across various technologies and domains
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.icon}
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Certifications</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            AWS Certified Developer
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            Google Cloud Fundamentals
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            MongoDB Developer Associate
          </Badge>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-blue-500" />
                <h3 className="font-semibold">Advanced Kubernetes</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Mastering container orchestration and cloud-native deployments
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <h3 className="font-semibold">Machine Learning</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Deep learning and neural networks with Python
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-green-500" />
                <h3 className="font-semibold">WebAssembly</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                High-performance web applications with WASM
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Skills;