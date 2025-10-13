import React from 'react';
import { SiReact, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiPython, SiMongodb, SiMysql, SiGit, SiDocker } from 'react-icons/si';
import { Cloud } from 'lucide-react';

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: <SiReact className="text-sky-500" />, details: 'Hooks, Context, Next.js, SSR' },
      { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" />, details: 'ES6+, TypeScript' },
      { name: 'HTML5', icon: <SiHtml5 className="text-orange-600" />, details: 'Semantic HTML, Accessibility' },
      { name: 'CSS3', icon: <SiCss3 className="text-blue-600" />, details: 'Flexbox, Grid, Tailwind CSS' },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs className="text-green-600" />, details: 'Express, REST APIs' },
      { name: 'Python', icon: <SiPython className="text-blue-400" />, details: 'Flask, FastAPI' },
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb className="text-green-700" />, details: 'Mongoose, Aggregations' },
      { name: 'MySQL', icon: <SiMysql className="text-blue-700" />, details: 'Joins, Indexing' },
    ]
  },
      {
        title: 'Tools & Technologies',
        skills: [
          { name: 'Git', icon: <SiGit className="text-orange-500" />, details: 'Branching, CI/CD' },
          { name: 'Docker', icon: <SiDocker className="text-blue-500" />, details: 'Containers, Compose' },
          { name: 'Cloud (AWS)', icon: <Cloud className="text-orange-400" />, details: 'EC2, S3, Lambda' },
        ]
      }
];

const Skills = () => (
  <section id="skills" className="max-w-6xl mx-auto py-16 px-4" aria-labelledby="skills-heading">
    <h2 id="skills-heading" className="text-3xl font-bold mb-8">Skills</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {SKILL_GROUPS.map((group, idx) => (
        <div key={group.title} className="bg-card rounded-lg shadow p-6 border border-border" role="region" aria-labelledby={`skill-group-${idx}`}>
          <h3 id={`skill-group-${idx}`} className="text-xl font-semibold mb-4">{group.title}</h3>
          <ul className="space-y-4" role="list">
            {group.skills.map((skill, i) => (
              <li key={skill.name} className="flex items-center gap-3 group" role="listitem">
                <span className="text-2xl" aria-hidden="true">{skill.icon}</span>
                <span className="font-medium">{skill.name}</span>
                <span className="ml-auto text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition lg:focus-visible:opacity-100" aria-label={`${skill.name} details: ${skill.details}`}>{skill.details}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
