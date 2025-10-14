'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

// Dynamically import OsUi with SSR disabled
const OsUi = dynamic(() => import('@/components/retro-os'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background font-body select-none flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <p className="mt-4">Loading portfolio...</p>
    </div>
  </div>
});

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  return (
    <main>
      <OsUi />
    </main>
  );
}