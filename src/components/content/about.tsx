import React from 'react';
import Image from 'next/image';
import { portfolioConfig } from '@/config/portfolio';

const AboutContent = () => {
  const { personal } = portfolioConfig;
  
  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start gap-6 not-prose">
        <div className="relative h-48 w-48 rounded-lg overflow-hidden shadow-md">
          <Image
            src="https://via.placeholder.com/400x400/00E5FF/000000?text=Rajath+Hegde"
            alt={personal.name}
            fill
            className="object-cover"
            data-ai-hint="person portrait"
            onError={(e) => { e.currentTarget.src = '/logo.png'; }}
          />
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{personal.name} | {personal.title}</h1>
          <p className="text-lg text-muted-foreground">
            {personal.bio}
          </p>
          <p className="text-muted-foreground">
            Based in {personal.location} 🌟
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Welcome to My Digital Space 👋</h2>
          <p>
            I'm a passionate developer who believes in the power of technology to solve real-world problems. 
            This portfolio is more than just a showcase—it's a reflection of my journey in tech, designed as 
            an interactive operating system to demonstrate both my technical skills and creative approach to 
            problem-solving.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What Drives Me 🎯</h2>
          <p>
            My journey in development is driven by three core principles: thoughtful design, clean code, and 
            continuous learning. I specialize in creating intuitive, efficient applications that make a real 
            difference in how people interact with technology.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">My Expertise 💻</h2>
          <p>
            With a strong foundation in full-stack development, I've developed expertise in:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Modern frontend development with React, Next.js, and TypeScript</li>
            <li>Building scalable backend systems using Node.js and Python</li>
            <li>Creating engaging user experiences with thoughtful UI/UX design</li>
            <li>Implementing efficient CI/CD pipelines and DevOps practices</li>
            <li>Cloud services with AWS and other platforms</li>
            <li>Self-hosted solutions and system administration</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutContent;