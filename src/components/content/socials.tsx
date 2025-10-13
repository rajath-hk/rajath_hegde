import React from 'react';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

const DiscordIcon = () => (
    <svg
      role="img"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Discord</title>
      <path d="M20.317 4.488c-1.61-.92-3.383-1.528-5.225-1.832a.763.763 0 00-.67.228.672.672 0 00-.203.628c.187.67.354 1.342.511 2.011a12.51 12.51 0 00-4.819 0c.158-.67.324-1.342.512-2.012a.672.672 0 00-.204-.627.763.763 0 00-.67-.228C7.07 2.96 5.3 3.568 3.687 4.488a.723.723 0 00-.358.62c-.372 3.32-1.076 9.349 1.956 12.339a.7.7 0 00.627.351c1.43.023 2.824-.465 4.125-1.259a.666.666 0 01.597 0c2.97 1.774 6.723 1.774 9.692 0a.666.666 0 01.598 0c1.3 1.01 2.694 1.282 4.124 1.259a.7.7 0 00.628-.35c3.032-2.99 2.328-9.018 1.956-12.339a.723.723 0 00-.36-.62zM8.411 14.204c-.822 0-1.488-.734-1.488-1.64s.666-1.64 1.488-1.64c.823 0 1.488.734 1.488 1.64s-.665 1.64-1.488 1.64zm7.178 0c-.822 0-1.488-.734-1.488-1.64s.666-1.64 1.488-1.64c.822 0 1.488.734 1.488 1.64s-.666 1.64-1.488 1.64z" />
    </svg>
);

const socials = [
    {
      href: 'mailto:mail4rajathhegde@gmail.com',
      icon: Mail,
      text: 'mail4rajathhegde@gmail.com',
    },
    {
      href: 'https://linkedin.com/in/rajath-hegde-1742462ab',
      icon: Linkedin,
      text: 'linkedin.com/in/rajath-hegde',
    },
    {
      href: 'https://github.com/rajath-hk',
      icon: Github,
      text: 'github.com/rajath-hk',
    },
    {
      href: 'https://instagram.com/rajath121',
      icon: Instagram,
      text: '@rajath121',
    },
    {
      href: 'https://discord.gg/RpbqmNP2',
      icon: DiscordIcon,
      text: 'Join my Discord',
    },
];

const SocialsContent = () => {
    return (
        <div className="p-6 text-sm md:text-base space-y-6 text-card-foreground">
            <div className="space-y-2">
                <h2 className="text-lg font-bold">Connect With Me</h2>
                <p>
                    You can find me on these platforms. I'm always happy to connect!
                </p>
            </div>
            <div className="space-y-4">
                {socials.map((social, index) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-primary hover:underline"
                        >
                            <Icon />
                            <span>{social.text}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default SocialsContent;
