'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the OsUi component with SSR disabled
const OsUi = dynamic(() => import('@/components/retro-os'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background font-body select-none"></div>
});

export default function ClientHome() {
  return (
    <main>
      <Suspense fallback={<div className="fixed inset-0 bg-background font-body select-none"></div>}>
        <OsUi />
      </Suspense>
    </main>
  );
}