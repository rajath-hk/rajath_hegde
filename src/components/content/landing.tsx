import React from 'react';

export default function Landing() {
  return (
    <div className="p-6">
      {/* Hero Section */}
      <section className="flex flex-col sm:flex-row items-center gap-8 mb-8">
        <img src="/images/headshot.jpg" alt="Rajath Hegde" className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-primary" />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Rajath Hegde</h1>
          <h2 className="text-xl font-medium text-primary mb-2">Full Stack Developer</h2>
          <p className="text-base text-muted-foreground mb-4">
            I craft modern, accessible, and performant web experiences. Passionate about building delightful products and solving real-world problems with code.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
            <a className="btn" href="#projects">See Projects</a>
            <a className="btn-outline" href="/resume.pdf" target="_blank" rel="noopener">Download Resume</a>
          </div>
        </div>
      </section>
      {/* Welcome/CTA */}
      <div className="mt-2 text-center sm:text-left">
        <p>Welcome to my interactive portfolio. Use the navigation or desktop icons to explore my work, skills, and more!</p>
      </div>
    </div>
  );
}
