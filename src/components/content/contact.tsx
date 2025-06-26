import React from 'react';
import { ContactForm } from '../contact-form';

const ContactContent = () => {
  return (
    <div className="p-6 text-sm md:text-base space-y-6 text-card-foreground">
      <div className="space-y-2">
        <h2 className="text-lg font-bold">Get In Touch</h2>
        <p>
          I'm always open to discussing new projects, creative ideas, or opportunities. Fill out the form below to send me a message!
        </p>
        <p className="text-xs text-muted-foreground">
          For my social media profiles, please see the "Socials" folder on the desktop.
        </p>
      </div>
      
      <ContactForm />

    </div>
  );
};

export default ContactContent;
