import React from 'react';

export default function Landing() {
  // Use basePath for images in GitHub Pages
 const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
 const headshotPath = `${basePath}/images/headshot.jpg`;
 const resumePath = `${basePath}/resume.pdf`;
  return (
    <div className="p-6 flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="flex flex-col sm:flex-row items-center gap-8 mb-8">
        <img src={headshotPath} alt="Rajath Hegde" className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-primary" loading="lazy" />
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Rajath Hegde</h1>
          <h2 className="text-xl font-medium text-primary mb-2">Full Stack Developer</h2>
          <p className="text-base text-muted-foreground mb-4">
            I craft modern, accessible, and performant web experiences. Passionate about building delightful products and solving real-world problems with code.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
            <a className="btn" href="#projects">See Projects</a>
            <a className="btn-outline" href={resumePath} target="_blank" rel="noopener">Download Resume</a>
          </div>
        </div>
      </section>
      {/* Welcome/CTA */}
      <div className="mt-2 text-center sm:text-left flex-1">
        <p>Welcome to my interactive portfolio. Use the navigation or desktop icons to explore my work, skills, and more!</p>
      </div>
      
      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
        <div className="space-y-2">
          <p>© {new Date().getFullYear()} Rajath Hegde. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
          <p className="text-xs">
            This portfolio is built with Next.js, TypeScript, and Tailwind CSS. 
            View the source code on <a href="https://github.com/rajath-hk/portfolio" target="_blank" rel="noopener" className="text-primary hover:underline">GitHub</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}