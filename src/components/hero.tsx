import React from 'react';
import Image from 'next/image';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Hero = () => (
  <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-8 px-4 py-16 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background">
    <div className="flex-1 flex flex-col justify-center gap-6 max-w-xl">
      <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2">Hi, I'm Rajath Hegde</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">Full-Stack Developer</h2>
      <p className="text-lg md:text-xl text-muted-foreground mb-4">
        I build robust, scalable, and user-focused web applications. My passion is turning complex problems into elegant solutions with clean code and modern technologies.
      </p>
      <div className="flex gap-4 mb-4">
        <a href="#projects" className="px-6 py-3 rounded bg-primary text-white font-semibold shadow hover:bg-primary/90 transition">View My Work</a>
        <a href="/resume.pdf" download className="px-6 py-3 rounded border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition flex items-center gap-2">
          Download Resume
        </a>
      </div>
      <div className="flex gap-4">
        <a href="https://linkedin.com/in/rajath-hegde" target="_blank" rel="noopener" aria-label="LinkedIn"><Linkedin size={28} /></a>
        <a href="https://github.com/rajath-hk" target="_blank" rel="noopener" aria-label="GitHub"><Github size={28} /></a>
        <a href="https://twitter.com/rajath_hegde" target="_blank" rel="noopener" aria-label="Twitter"><Twitter size={28} /></a>
      </div>
    </div>
    <div className="flex-1 flex justify-center items-center">
      <picture>
        <source srcSet="/images/headshot.webp" type="image/webp" />
        <Image
          src="/images/headshot.jpg"
          alt="Rajath Hegde professional headshot"
          width={400}
          height={400}
          className="rounded-xl shadow-lg object-cover border-4 border-primary"
          priority
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 400px"
        />
      </picture>
    </div>
  </section>
);

export default Hero;
