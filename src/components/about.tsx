import React from 'react';

const About = () => (
  <section id="about" className="max-w-4xl mx-auto py-16 px-4 bg-secondary rounded-lg mt-12">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="mb-4">
          I am a passionate Full-Stack Developer with a strong foundation in both frontend and backend technologies. Currently, I work at Tech Solutions Inc., where I lead the development of enterprise web applications. My journey began at Bangalore University, where I graduated with distinction in Computer Science.
        </p>
        <p className="mb-4">
          My technical interests include building scalable web architectures, optimizing performance, and creating accessible, user-friendly interfaces. I thrive on solving complex problems and continuously learning new technologies.
        </p>
        <p className="mb-4">
          <strong>Career Goals:</strong> To architect impactful digital products, mentor future developers, and contribute to open-source communities.
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Lead developer for enterprise apps used by 10,000+ users</li>
          <li>Reduced page load times by 40% at Tech Solutions Inc.</li>
          <li>Graduated top 5% of class at Bangalore University</li>
        </ul>
        <p className="text-muted-foreground">Outside of coding, I enjoy hiking, photography, and exploring new cuisines.</p>
      </div>
      <div className="flex justify-center md:justify-end">
        <img src="/images/headshot.jpg" alt="Rajath Hegde headshot" className="rounded-xl shadow-lg w-64 h-64 object-cover border-4 border-primary" />
      </div>
    </div>
  </section>
);

export default About;
