'use client';

import React from 'react';
import { portfolioConfig } from '@/config/portfolio';
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
  const { skills } = portfolioConfig;
  
  const skillCategories = [
    {
      name: 'Expert Skills',
      icon: <Globe className="w-5 h-5" />,
      skills: skills.expert.map(skill => ({ name: skill, level: 95 }))
    },
    {
      name: 'Advanced Skills',
      icon: <Code className="w-5 h-5" />,
      skills: skills.advanced.map(skill => ({ name: skill, level: 85 }))
    },
    {
      name: 'Intermediate Skills',
      icon: <Database className="w-5 h-5" />,
      skills: skills.intermediate.map(skill => ({ name: skill, level: 75 }))
    },
    {
      name: 'Currently Learning',
      icon: <Zap className="w-5 h-5" />,
      skills: skills.learning.map(skill => ({ name: skill, level: 60 }))
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Technical Skills</h2>
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