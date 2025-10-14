import React from 'react';
import { Card } from '@/components/ui/card';

const Story = () => {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">My Story</h2>
      
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">The Early Spark ✨</h3>
        <p className="text-muted-foreground leading-relaxed">
          My journey into the world of programming began with a simple curiosity about how things work. 
          As a child, I was always fascinated by computers and technology, spending countless hours 
          exploring and tinkering with software.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Learning & Growth 🌱</h3>
        <p className="text-muted-foreground leading-relaxed">
          Through years of dedicated learning and hands-on experience, I&apos;ve developed a deep 
          understanding of software development principles and best practices. Each project has been 
          a stepping stone, teaching me valuable lessons about code quality, user experience, and 
          problem-solving.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Professional Journey 🚀</h3>
        <p className="text-muted-foreground leading-relaxed">
          My professional path has led me through various exciting challenges and opportunities. 
          I&apos;ve had the privilege of working on diverse projects, from web applications to 
          system architecture, each adding new dimensions to my expertise.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Current Focus 🎯</h3>
        <p className="text-muted-foreground leading-relaxed">
          Today, I&apos;m passionate about creating intuitive, efficient, and scalable solutions 
          that make a real difference. I&apos;m particularly interested in modern web technologies, 
          distributed systems, and building delightful user experiences.
        </p>
      </section>
    </Card>
  );
};

export default Story;