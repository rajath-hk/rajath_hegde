import React from 'react';

export default function Landing() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-6">
        <img src="/images/headshot.jpg" alt="Rajath Hegde" className="w-28 h-28 rounded-full object-cover shadow-md" />
        <div>
          <h1 className="text-2xl font-bold">Hi, I'm Rajath</h1>
          <p className="text-sm text-muted-foreground mt-1">Full Stack Developer — building performant, accessible web apps.</p>
          <div className="mt-3 flex gap-2">
            <a className="btn" href="#projects">See Projects</a>
            <a className="btn-outline" href="/resume.pdf" target="_blank" rel="noopener">Download Resume</a>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p>Welcome to my interactive portfolio. Open windows from the dock or desktop icons to explore.</p>
      </div>
    </div>
  );
}
