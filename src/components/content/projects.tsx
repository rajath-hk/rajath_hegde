import React from 'react';
import Image from 'next/image';

const projects = [
  {
    title: "Project Alpha",
    description: "A revolutionary e-commerce platform built with Next.js and serverless functions, focusing on performance and user experience.",
    imageUrl: "https://placehold.co/400x300.png",
    hint: "e-commerce website"
  },
  {
    title: "Project Beta",
    description: "An interactive data visualization tool using D3.js and React to display complex datasets in an intuitive way.",
    imageUrl: "https://placehold.co/400x300.png",
    hint: "data dashboard"
  },
  {
    title: "Project Gamma",
    description: "A mobile-first social networking app designed to connect people with shared hobbies and interests.",
    imageUrl: "https://placehold.co/400x300.png",
    hint: "mobile application"
  }
];

const ProjectsContent = () => {
  return (
    <div className="p-6 space-y-6 text-card-foreground">
      <h2 className="text-lg font-bold">My Work</h2>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden shadow-md">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full"
                  data-ai-hint={project.hint}
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="font-bold text-base">{project.title}</h3>
              <p className="text-sm mt-1 text-card-foreground/80">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
