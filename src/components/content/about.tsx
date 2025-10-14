import React from 'react';
import Image from 'next/image';

const AboutContent = () => {
  const funFacts = [
    "I'm a big fan of open-source software and contribute to several projects on GitHub",
    "When I'm not coding, you'll find me hiking or exploring new coffee shops",
    "I enjoy learning new programming languages and frameworks in my spare time",
    "I'm passionate about UI/UX design and creating intuitive user experiences",
    "I love solving algorithmic challenges on competitive programming platforms",
  ];

  // Use basePath for images in GitHub Pages
  const basePath = process.env.BASE_PATH || '';
  const imagePath = `${basePath}/images/headshot.jpg`;

  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start gap-6 not-prose">
        <Image
          src={imagePath}
          alt="Rajath Hegde"
          width={200}
          height={200}
          className="rounded-lg shadow-md object-cover"
          data-ai-hint="person portrait"
          loading="lazy"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Rajath Hegde | Full Stack Developer</h1>
          <p className="text-lg text-muted-foreground">
            Building thoughtful, user-centric experiences with code and creativity from Bangalore, India 🌟
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">About Me</h2>
        <p>
          Hello! I'm Rajath Hegde, a passionate Full Stack Developer based in Bangalore, India. With a strong foundation in both frontend and backend technologies, I create seamless digital experiences that bridge design and functionality.
        </p>
        <p>
          My journey in tech began with a curiosity for how things work, which led me to explore various programming languages and frameworks. Today, I specialize in building responsive web applications using modern technologies like React, Next.js, Node.js, and MongoDB.
        </p>
        <p>
          When I'm not coding, you can find me contributing to open-source projects, exploring new coffee shops, or hiking in the nearby hills. I believe in continuous learning and enjoy sharing knowledge with the developer community.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Fun Facts</h2>
        <ul className="space-y-2">
          {funFacts.map((fact, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutContent;