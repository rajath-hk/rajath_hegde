import React from 'react';

const experience = [
  {
    company: 'Tech Solutions Inc.',
    role: 'Full-Stack Developer',
    period: '2022 – Present',
    description: 'Lead developer for enterprise web applications. Architected scalable solutions and mentored junior engineers.',
    highlights: [
      'Built a real-time analytics dashboard used by 10,000+ users',
      'Reduced page load times by 40% through performance optimization',
      'Introduced automated testing and CI/CD pipelines'
    ]
  },
  {
    company: 'Web Innovators',
    role: 'Frontend Developer',
    period: '2020 – 2022',
    description: 'Developed modern, responsive UIs for SaaS products. Collaborated with designers and backend teams.',
    highlights: [
      'Launched 3 major product features with 99% user satisfaction',
      'Implemented accessibility best practices across all products'
    ]
  },
  {
    company: 'Bangalore University',
    role: 'B.E. Computer Science',
    period: '2016 – 2020',
    description: 'Graduated with distinction. Specialized in web technologies and software engineering.',
    highlights: [
      'Top 5% of class',
      'Capstone project selected for university showcase'
    ]
  }
];

const Experience = () => (
  <section id="experience" className="max-w-4xl mx-auto py-16 px-4">
    <h2 className="text-3xl font-bold mb-8">Experience & Education</h2>
    <div className="space-y-8">
      {experience.map((item, idx) => (
        <div key={idx} className="bg-card rounded-lg shadow p-6 border border-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <span className="font-semibold text-xl text-primary">{item.role}</span>
            <span className="text-muted-foreground text-sm">{item.period}</span>
          </div>
          <div className="font-medium text-lg mb-1">{item.company}</div>
          <div className="mb-2 text-muted-foreground">{item.description}</div>
          <ul className="list-disc pl-5 space-y-1 text-base">
            {item.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;
