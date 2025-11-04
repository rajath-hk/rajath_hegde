export const portfolioConfig = {
  personal: {
    name: "Rajath Hegde",
    title: "Full-Stack Web Developer & MCA Student",
    location: "Karnataka, India",
    bio: "I'm an MCA student and aspiring full-stack web developer from Karnataka, India, with expertise in web development, Python, AWS cloud services, AI integration, and self-hosted solutions. I'm passionate about creating innovative solutions and sharing knowledge with the developer community.",
    avatar: "/images/avatar.jpg",
    resume: "/files/resume.pdf",
    email: "contact@rajathhegde.com"
  },
  social: {
    github: "https://github.com/rajath-hk",
    linkedin: "https://linkedin.com/in/rajath-hegde",
    twitter: "https://twitter.com/rajath_hk",
    instagram: "https://instagram.com/rajath_hk"
  },
  projects: [
    {
      id: "rtsp-loop-recorder",
      title: "RTSP Loop Recorder",
      description: "An Android application that records RTSP video streams in a continuous loop with live preview functionality.",
      technologies: ["Kotlin", "Android", "RTSP"],
      category: "Mobile",
      year: 2024,
      links: {
        github: "https://github.com/rajath-hk/rtsp-loop-recorder",
        demo: null
      }
    },
    {
      id: "self-hosted-platform",
      title: "Self-Hosted Video Meeting Platform",
      description: "A self-hosted video conferencing solution with direct meeting capabilities and customizable interface.",
      technologies: ["WebRTC", "Node.js", "React", "Docker"],
      category: "Self-Hosted",
      year: 2024,
      links: {
        github: "https://github.com/rajath-hk/self-hosted-meetings",
        demo: null
      }
    },
    {
      id: "getgo-web-app",
      title: "GetGo Web Application",
      description: "A web application designed for efficient task management and productivity enhancement.",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "Web Application",
      year: 2023,
      links: {
        github: "https://github.com/rajath-hk/getgo-web",
        demo: null
      }
    }
  ],
  skills: {
    expert: ["HTML", "CSS", "JavaScript", "Python"],
    advanced: ["React", "Node.js", "AWS", "Docker"],
    intermediate: ["TypeScript", "Next.js", "MongoDB"],
    learning: ["Machine Learning", "Kubernetes"]
  },
  applications: [
    {
      id: "about",
      name: "About Me",
      icon: "User",
      component: "AboutApp"
    },
    {
      id: "projects",
      name: "Projects",
      icon: "Folder",
      component: "ProjectsApp"
    },
    {
      id: "skills",
      name: "Skills",
      icon: "Award",
      component: "SkillsApp"
    },
    {
      id: "contact",
      name: "Contact",
      icon: "Mail",
      component: "ContactApp"
    },
    {
      id: "terminal",
      name: "Terminal",
      icon: "Terminal",
      component: "TerminalApp"
    },
    {
      id: "settings",
      name: "Settings",
      icon: "Settings",
      component: "SettingsApp"
    }
  ],
  theme: {
    primaryColor: "#00E5FF",
    backgroundColor: "#0B0F14",
    darkMode: true
  }
};