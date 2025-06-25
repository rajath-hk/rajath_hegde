import React from 'react';
import Image from 'next/image';
import resumeImg from '@/assets/images/resume.png';

const ResumeContent = () => {
  return (
    <div className="flex justify-center p-4 bg-muted/20">
        <Image
          src={resumeImg}
          alt="Rajath Hegde's Resume"
          width={850}
          height={1100}
          className="max-w-full h-auto shadow-lg"
        />
    </div>
  );
};

export default ResumeContent;
