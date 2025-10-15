import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Github, Mail, Twitter } from 'lucide-react';
import ContactForm from '../contact-form';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/rajath-hegde',
    description: 'Connect with me professionally'
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/rajath-hk',
    description: 'Explore my code and contributions'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/rajath_hegde',
    description: 'Follow me for tech insights and updates'
  }
];

const ContactContent = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Let's Connect</h2>
        <p className="text-lg text-muted-foreground">
          I'm always interested in hearing about new opportunities, collaborations, or just having a 
          great conversation about technology and development.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Contact Form</h3>
            <p className="text-muted-foreground">
              Have a project in mind or want to discuss opportunities? Fill out the form below and 
              I'll get back to you as soon as possible.
            </p>
          </div>
          
          <ContactForm />
        </Card>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Other Ways to Connect</h3>
            <p className="text-muted-foreground">
              You can also reach me through these platforms:
            </p>
          </div>

          <div className="grid gap-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => window.location.href = 'mailto:contact@rajathhegde.com'}
            >
              <Mail className="h-4 w-4" />
              <span>contact@rajathhegde.com</span>
            </Button>

            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>{link.name}</span>
                      <span className="text-xs text-muted-foreground">{link.description}</span>
                    </div>
                  </Button>
                </a>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-2xl font-semibold">Looking for Opportunities</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              I'm currently open to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Full-stack development roles</li>
              <li>Frontend-focused positions</li>
              <li>Technical consulting opportunities</li>
              <li>Interesting freelance projects</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactContent;