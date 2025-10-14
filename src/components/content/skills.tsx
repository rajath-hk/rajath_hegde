import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description: string;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Building responsive, accessible, and performant user interfaces",
    skills: [
      {
        name: "React & Next.js",
        level: "Expert",
        description: "Deep expertise in building scalable applications with modern React patterns and Next.js features"
      },
      {
        name: "TypeScript",
        level: "Expert",
        description: "Strong typing and modern JavaScript features for robust applications"
      },
      {
        name: "UI/UX Design",
        level: "Advanced",
        description: "Creating intuitive interfaces with focus on user experience and accessibility"
      },
      {
        name: "Tailwind CSS",
        level: "Expert",
        description: "Utility-first CSS framework for rapid UI development"
      },
      {
        name: "Framer Motion",
        level: "Advanced",
        description: "Animations and micro-interactions for enhanced user experiences"
      }
    ]
  },
  {
    title: "Backend Development",
    description: "Designing and implementing scalable server-side solutions",
    skills: [
      {
        name: "Node.js",
        level: "Advanced",
        description: "Building efficient APIs and server-side applications"
      },
      {
        name: "Python",
        level: "Advanced",
        description: "Data processing, API development, and automation"
      },
      {
        name: "Databases",
        level: "Advanced",
        description: "Experience with SQL and NoSQL databases, focusing on performance and security"
      },
      {
        name: "RESTful APIs",
        level: "Expert",
        description: "Designing and building scalable, well-documented APIs"
      },
      {
        name: "GraphQL",
        level: "Intermediate",
        description: "Flexible query language for APIs with precise data fetching"
      }
    ]
  },
  {
    title: "DevOps & Tools",
    description: "Streamlining development and deployment processes",
    skills: [
      {
        name: "Git & CI/CD",
        level: "Advanced",
        description: "Version control and automated deployment pipelines"
      },
      {
        name: "Docker",
        level: "Intermediate",
        description: "Containerization and microservices architecture"
      },
      {
        name: "Cloud Platforms",
        level: "Advanced",
        description: "AWS and Azure services for scalable applications"
      },
      {
        name: "Testing",
        level: "Advanced",
        description: "Unit, integration, and end-to-end testing practices"
      },
      {
        name: "Performance Optimization",
        level: "Advanced",
        description: "Web vitals, load times, and resource optimization"
      }
    ]
  }
];

const Skills = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-green-500";
      case "Advanced": return "bg-blue-500";
      case "Intermediate": return "bg-yellow-500";
      case "Beginner": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Skills & Expertise</h2>
        <p className="text-lg text-muted-foreground">
          My technical toolkit has been shaped by years of practical experience and continuous learning.
          Here's an overview of my key competencies:
        </p>
      </div>

      <div className="grid gap-6">
        {skillCategories.map((category, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="secondary">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getLevelColor(skill.level)}`}></span>
                        {skill.level}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Skills;