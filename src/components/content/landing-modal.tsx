import React from 'react';
import { basePath } from '@/lib/constants';

const LandingModal = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <img src={`${basePath}/images/headshot.jpg`} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
        <div>
          <h3 className="text-xl font-semibold">Rajath Hegde</h3>
          <p className="text-sm text-muted-foreground">Full Stack Developer — Building delightful web experiences.</p>
        </div>
      </div>
      <div className="mt-4">
        <p>Welcome to my portfolio. Use the navigation to explore projects, experience, and contact me.</p>
      </div>
    </div>
  );
}

export default LandingModal;
