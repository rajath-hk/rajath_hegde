import React from 'react';
import Image from 'next/image';

const AboutContent = () => {
  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start gap-6 not-prose">
        <Image
          src="https://img.playbook.com/mj3J7by3sHCDWk50s2eAK_qN5_wOe2va96cBxM6anIM/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2YxZGU5NWZk/LTIxOGUtNDY5Zi1i/M2ZjLTg1MWI1NDNi/Y2Y1Zg"
          alt="Rajath Hegde"
          width={200}
          height={200}
          className="rounded-lg shadow-md object-cover"
          data-ai-hint="person portrait"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Rajath Hegde | Full Stack Developer</h1>
          <p className="text-lg text-muted-foreground">
            Building thoughtful, user-centric experiences with code and creativity from Bangalore, India 🌟
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
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutContent;
