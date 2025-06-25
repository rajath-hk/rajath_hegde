import React from 'react';
import Image from 'next/image';

const AboutContent = () => {
  return (
    <div className="p-6 text-sm md:text-base space-y-4 text-card-foreground">
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <Image
          src="/profile.png"
          alt="Rajath Hegde"
          width={150}
          height={150}
          className="rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">Hello, I'm Rajath Hegde!</h2>
          <p>
            Welcome to my digital desktop. I'm a passionate developer with a love for creating intuitive, dynamic, and fun user experiences. This portfolio itself is a testament to my passion for blending retro aesthetics with modern web technologies.
          </p>
        </div>
      </div>
      <p>
        With a background in computer science and several years of professional experience, I have a strong foundation in full-stack development, though my heart truly lies in the front-end. I enjoy the challenge of solving complex problems and the satisfaction of seeing my code come to life in the browser.
      </p>
      <p>
        My technical skills include React, Next.js, TypeScript, Node.js, and a variety of other tools and frameworks. I am always eager to learn new things and stay up-to-date with the ever-evolving world of web development. Feel free to explore my projects and get in touch!
      </p>
    </div>
  );
};

export default AboutContent;
