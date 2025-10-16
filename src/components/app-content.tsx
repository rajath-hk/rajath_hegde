import React from 'react';
import AboutContent from '@/components/content/about';
import ProjectsContent from '@/components/content/projects';
import ContactContent from '@/components/content/contact';
import ResumeContent from '@/components/content/resume';
import MyWorkContent from '@/components/content/my-work';
import SocialsContent from '@/components/content/socials';
import SkillsContent from '@/components/content/skills';
import TerminalContent from '@/components/content/terminal';
import BlogContent from '@/components/content/blog';
import FileExplorerContent from '@/components/content/file-explorer';

const LegalContent = () => <div className="p-6 text-card-foreground">This is my portfolio. To access this file, please contact me.</div>;

interface AppContentProps {
  appId: string;
}

const AppContent: React.FC<AppContentProps> = ({ appId }) => {
  switch (appId) {
    case 'about':
      return <AboutContent />;
    case 'my-work':
      return <MyWorkContent />;
    case 'skills':
      return <SkillsContent />;
    case 'contact':
      return <ContactContent />;
    case 'socials':
      return <SocialsContent />;
    case 'terminal':
      return <TerminalContent />;
    case 'blog':
      return <BlogContent />;
    case 'explorer':
      return <FileExplorerContent />;
    case 'legal':
      return <LegalContent />;
    default:
      return <div>Content not found</div>;
  }
};

export default AppContent;
